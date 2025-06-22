import { Frame, Palette, Shield } from 'lucide-react';
import { Service, GalleryItem, ProductCategory } from '@/types/home';

export const getServices = (): Service[] => [
  {
    icon: <Frame className="w-12 h-12 text-blue-600" />,
    title: "Custom Picture Framing",
    description: "Upload, print and frame your pictures with precision and care using our online frame builder."
  },
  {
    icon: <Palette className="w-12 h-12 text-blue-600" />,
    title: "Acrylic Photo Prints",
    description: "Encase your images in a stunning acrylic display that brings colors to life."
  },
  {
    icon: <Shield className="w-12 h-12 text-blue-600" />,
    title: "Photo Printing Online",
    description: "Fine art lab quality printing delivered to your door with professional results."
  }
];

export const benefits = [
  "Premium quality materials and craftsmanship",
  "Hundreds of frame styles and mat options",
  "Expert advice from certified framers",
  "Competitive pricing with transparent quotes",
  "Local family-owned business since 1995",
  "Satisfaction guarantee on all work"
];

export const galleryItems: GalleryItem[] = [
  {
    image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg",
    title: "Fine Art Framing",
    category: "Paintings & Prints"
  },
  {
    image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg",
    title: "Photography Display",
    category: "Photo Frames"
  },
  {
    image: "https://images.pexels.com/photos/6271020/pexels-photo-6271020.jpeg",
    title: "Certificate Framing",
    category: "Documents"
  },
  {
    image: "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg",
    title: "Shadow Box Display",
    category: "Memorabilia"
  },
  {
    image: "https://images.pexels.com/photos/1194025/pexels-photo-1194025.jpeg",
    title: "Multi-Photo Collage",
    category: "Collections"
  },
  {
    image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg",
    title: "Canvas Stretching",
    category: "Canvas Art"
  }
];

export const productCategories: ProductCategory[] = [
  {
    title: "Custom Mat Boards",
    description: "Cut to any size",
    image: "https://images.pexels.com/photos/5708082/pexels-photo-5708082.jpeg"
  },
  {
    title: "Canvas Prints",
    description: "Transform your images into a work of art",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
  },
  {
    title: "Collage Frames",
    description: "Frame your memories in a collage",
    image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg"
  },
  {
    title: "Art Prints",
    description: "Browse a huge collection of art prints",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
  },
  {
    title: "Cork Boards",
    description: "Cork Boards, Sheets and Rolls",
    image: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg"
  },
  {
    title: "Foam Core Boards",
    description: "Acid-free backing boards",
    image: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg"
  },
  {
    title: "Shadow Box Frames",
    description: "Frame your 3D objects in a shadow box frame",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
  },
  {
    title: "Sporting Goods",
    description: "Jerseys, cricket bats and more",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg"
  },
  {
    title: "Clip Frames",
    description: "Light, frameless and cost-effective",
    image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
  },
  {
    title: "Mirrors",
    description: "Custom mirrors designed by you",
    image: "https://images.pexels.com/photos/1528975/pexels-photo-1528975.jpeg"
  }
]; 