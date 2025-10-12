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
    return cm / 10;
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
    camera.position.set(1.5, 0.6, 4.2); // pull back for wider frame
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

    // Ground (wall)
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 6), // make wall wider
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Sizes (make canvas wide and less tall)
    const canvasWidth = toSceneUnits(width || 240, units); // much wider
    const canvasHeight = toSceneUnits(height || 90, units); // shorter
    const canvasDepth = toSceneUnits(frame.depth || 3, "cm");
    const taperFactor = 0.9; // minor taper

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

    // RIGHT edge (wrapped texture)
    let rightMat: THREE.MeshStandardMaterial;
    if (image) {
      const tex = loader.load(image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set(0.98, 0);
      tex.repeat.set(0.02, 1);
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

    // LEFT edge
    const left = new THREE.Mesh(
      new THREE.PlaneGeometry(canvasDepth * taperFactor, canvasHeight),
      new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) })
    );
    left.position.x = -canvasWidth / 2;
    left.rotation.y = -Math.PI / 2;
    group.add(left);

    // TOP edge
    const top = new THREE.Mesh(
      new THREE.PlaneGeometry(canvasWidth, canvasDepth * taperFactor),
      new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) })
    );
    top.position.y = canvasHeight / 2;
    top.rotation.x = Math.PI / 2;
    group.add(top);

    // BOTTOM edge
    const bottom = new THREE.Mesh(
      new THREE.PlaneGeometry(canvasWidth, canvasDepth),
      new THREE.MeshStandardMaterial({ color: getFrameColor(frame.color) })
    );
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
    </div>
  );
};