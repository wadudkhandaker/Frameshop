import { ReactElement } from 'react';

export interface Service {
  icon: ReactElement;
  title: string;
  description: string;
}

export interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

export interface ProductCategory {
  title: string;
  description: string;
  image: string;
} 