"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Frame } from "./types";

interface FrameCanvas3DProps {
  width: number;
  height: number;
  units: "cm" | "inch";
  frame: Frame | null;
  image: string | null;
  className?: string;
}

type SceneBundle = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  canvasGroup: THREE.Group | null;
  animationId: number | null;
  textures: THREE.Texture[];
};

export const FrameCanvas3D: React.FC<FrameCanvas3DProps> = ({
  width,
  height,
  units,
  frame,
  image,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneBundle | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.1, y: 0.15 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [canvasInfo, setCanvasInfo] = useState({
    actualWidth: 0,
    actualHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    canvasDepth: 0,
    maxDimension: 0
  });

  const getFrameColor = (color: string): number => {
    const map: Record<string, number> = {
      Black: 0x1a1a1a,
      White: 0xf5f5f5,
      Oak: 0x8b5a2b,
      Silver: 0xc0c0c0,
      Gold: 0xffd700,
    };
    return map[color] ?? 0xcccccc;
  };

  const toSceneUnits = (val: number, u: "cm" | "inch"): number => {
    const cm = u === "inch" ? val * 2.54 : val;
    return cm / 3; // Further increased scale factor to make size differences more obvious
  };

  useEffect(() => {
    if (!containerRef.current || !frame) return;

    // Scene + renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Camera (wider view, slightly offset)
    const camera = new THREE.PerspectiveCamera(
      40, // slightly narrower FOV for cinematic look
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(1.5, 0.6, 4.2); // Initial position, will be updated after canvas size calculation
    camera.lookAt(0, 0, 0);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(3, 3, 4);
    dir.target.position.set(0, 0, 0);
    scene.add(dir.target);
    dir.castShadow = true;
    scene.add(dir);

    // Ground (wall) - will be created after canvas dimensions are calculated

    // Sizes - scale proportionally with input dimensions
    const actualWidth = width > 0 ? width : 40; // Only use default if width is 0 or undefined
    const actualHeight = height > 0 ? height : 60; // Only use default if height is 0 or undefined
    const canvasWidth = toSceneUnits(actualWidth, units);
    const canvasHeight = toSceneUnits(actualHeight, units);
    const canvasDepth = toSceneUnits(frame.depth || 8, "cm"); // Increase depth significantly for better edge visibility
    const taperFactor = 0.98; // Minimal taper to maintain rectangular shape
    
    // Calculate camera positioning
    const maxCanvasDimension = Math.max(canvasWidth, canvasHeight);
    const minCanvasDimension = Math.min(canvasWidth, canvasHeight);
    const cameraDistance = maxCanvasDimension * 2.0; // Further back for better perspective
    const cameraHeight = maxCanvasDimension * 0.4;
    const cameraX = maxCanvasDimension * 0.4; // More to the side to see right edge
    
    // Debug: Log the dimensions being used
    console.log('3D Frame dimensions:', {
      inputWidth: width,
      inputHeight: height,
      actualWidth,
      actualHeight,
      units,
      canvasWidth,
      canvasHeight,
      canvasDepth,
      frameDepth: frame.depth,
      maxDimension: maxCanvasDimension,
      cameraDistance: cameraDistance,
      aspectRatio: canvasWidth / canvasHeight
    });
    
    // Size comparison for debugging
    if (actualWidth === 27.9 && actualHeight === 35.6) {
      console.log('🔍 11x14 detected - should be smaller than 18x24');
    }
    if (actualWidth === 45.6 && actualHeight === 61.0) {
      console.log('🔍 18x24 detected - should be bigger than 11x14');
    }
    
    // Update canvas info for overlay
    setCanvasInfo({
      actualWidth,
      actualHeight,
      canvasWidth,
      canvasHeight,
      canvasDepth,
      maxDimension: maxCanvasDimension
    });
    
    camera.position.set(cameraX, cameraHeight, cameraDistance);
    
    // Create ground (wall) - scale with canvas size
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(maxCanvasDimension * 2, maxCanvasDimension * 1.5), // Scale with canvas
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -maxCanvasDimension * 0.3; // Position relative to canvas size
    plane.receiveShadow = true;
    scene.add(plane);

    // Group
    const group = new THREE.Group();

    // FRONT
    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    let frontMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.colorSpace = THREE.SRGBColorSpace;
      frontMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.7,
        metalness: 0.1,
      });
      textures.push(tex);
    } else {
      frontMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    }
    const front = new THREE.Mesh(new THREE.PlaneGeometry(canvasWidth, canvasHeight), frontMat);
    front.position.z = canvasDepth / 2;
    group.add(front);

    // BACK (solid color)
    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(canvasWidth, canvasHeight),
      new THREE.MeshStandardMaterial({
        color: getFrameColor(frame.color),
        side: THREE.BackSide,
      })
    );
    back.position.z = -canvasDepth / 2;
    group.add(back);

    // RIGHT edge (wrapped texture) - make it more visible
    let rightMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set(0.95, 0); // Show more of the right edge
      tex.repeat.set(0.05, 1); // Wider strip for better visibility
      tex.colorSpace = THREE.SRGBColorSpace;
      rightMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 });
      textures.push(tex);
    } else {
      rightMat = new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) });
    }
    const right = new THREE.Mesh(new THREE.PlaneGeometry(canvasDepth, canvasHeight), rightMat);
    right.position.x = canvasWidth / 2;
    right.rotation.y = Math.PI / 2;
    group.add(right);

    // LEFT edge (wrapped texture)
    let leftMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set(0, 0); // Show left edge of image
      tex.repeat.set(0.05, 1); // Wider strip for better visibility
      tex.colorSpace = THREE.SRGBColorSpace;
      leftMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 });
      textures.push(tex);
    } else {
      leftMat = new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) });
    }
    const left = new THREE.Mesh(new THREE.PlaneGeometry(canvasDepth * taperFactor, canvasHeight), leftMat);
    left.position.x = -canvasWidth / 2;
    left.rotation.y = -Math.PI / 2;
    group.add(left);

    // TOP edge (wrapped texture)
    let topMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set(0, 0.95); // Show top edge of image
      tex.repeat.set(1, 0.05); // Wider strip for better visibility
      tex.colorSpace = THREE.SRGBColorSpace;
      topMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 });
      textures.push(tex);
    } else {
      topMat = new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) });
    }
    const top = new THREE.Mesh(new THREE.PlaneGeometry(canvasWidth, canvasDepth * taperFactor), topMat);
    top.position.y = canvasHeight / 2;
    top.rotation.x = Math.PI / 2;
    group.add(top);

    // BOTTOM edge (wrapped texture)
    let bottomMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set(0, 0); // Show bottom edge of image
      tex.repeat.set(1, 0.05); // Wider strip for better visibility
      tex.colorSpace = THREE.SRGBColorSpace;
      bottomMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 });
      textures.push(tex);
    } else {
      bottomMat = new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) });
    }
    const bottom = new THREE.Mesh(new THREE.PlaneGeometry(canvasWidth, canvasDepth), bottomMat);
    bottom.position.y = -canvasHeight / 2;
    bottom.rotation.x = -Math.PI / 2;
    group.add(bottom);

    group.rotation.set(rotation.x, rotation.y, 0);
    scene.add(group);

    // Animation
    let anim = 0;
    const animate = () => {
      anim = requestAnimationFrame(animate);
      group.rotation.x = rotation.x;
      group.rotation.y = rotation.y;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Store + cleanup
    sceneRef.current = { scene, camera, renderer, canvasGroup: group, animationId: anim, textures };
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(anim);
      renderer.dispose();
      textures.forEach((t) => t.dispose());
      if (containerRef.current?.contains(renderer.domElement))
        containerRef.current.removeChild(renderer.domElement);
    };
  }, [width, height, units, frame, image, rotation]);

  // Rotation drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setRotation((p) => ({ x: p.x - dy * 0.01, y: p.y + dx * 0.01 }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  if (!frame)
    return (
      <div className={`relative ${className}`} style={{ minHeight: "600px", padding: "40px" }}>
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Select a 3D frame to see the preview</p>
        </div>
      </div>
    );

  return (
    <div className={`relative ${className}`} style={{ minHeight: "600px", padding: "20px" }}>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      />
      
      {/* Info overlay */}
      {canvasInfo.maxDimension > 0 && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm">
          <div className="font-semibold">{frame.name}</div>
          <div>Size: {canvasInfo.actualWidth} × {canvasInfo.actualHeight} {units}</div>
          <div>Canvas: {canvasInfo.canvasWidth.toFixed(2)} × {canvasInfo.canvasHeight.toFixed(2)} × {canvasInfo.canvasDepth.toFixed(2)} units</div>
          <div>Max Dim: {canvasInfo.maxDimension.toFixed(2)} | Aspect: {(canvasInfo.canvasWidth/canvasInfo.canvasHeight).toFixed(2)}</div>
          {isDragging ? (
            <div className="text-blue-300">↻ Rotating...</div>
          ) : (
            <div className="text-gray-300">Drag to rotate</div>
          )}
        </div>
      )}
    </div>
  );
};