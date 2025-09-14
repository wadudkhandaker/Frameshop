import { useState, useEffect } from 'react';

export interface StrapiFrame {
  id: number;
  documentId: string;
  name?: string; // Added name field
  code: string;
  width: number;
  depth: number;
  rebate: number;
  material: string;
  color: string;
  priceRate: number;
  isPopular: boolean;
  isOnSale: boolean;
  category: string;
  maxLength?: number | null; // Can be null
  description?: string;
  frameType?: string; // Added frameType field
  image?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }> | null; // Can be null
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const useFrames = () => {
  const [frames, setFrames] = useState<StrapiFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }
        
        const response = await fetch(`${STRAPI_URL}/api/frames?populate=image&sort=code:asc`, {
          headers
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch frames: ${response.statusText}`);
        }
        
        const data: StrapiResponse<StrapiFrame> = await response.json();
        setFrames(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch frames');
        console.error('Error fetching frames:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  return { frames, loading, error };
};

export const useFrameCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }
        
        const response = await fetch(`${STRAPI_URL}/api/frames?fields[0]=category&sort=category:asc`, {
          headers
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        
        const data: StrapiResponse<{ attributes: { category: string } }> = await response.json();
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.data.map(item => item.attributes.category))
        );
        
        // Add "All" at the beginning
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook to fetch a single frame by ID
export const useFrame = (id: string) => {
  const [frame, setFrame] = useState<StrapiFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFrame = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(`${STRAPI_URL}/api/frames/${id}?populate=image`, {
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiResponse<StrapiFrame> = await response.json();
        
        if (data.data && data.data.length > 0) {
          setFrame(data.data[0]);
        } else {
          setFrame(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch frame');
        setFrame(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFrame();
    }
  }, [id]);

  return { frame, loading, error };
};

// Helper function to get image URL
export const getStrapiImageUrl = (image: any): string | null => {
  // Handle array of images (new structure)
  if (Array.isArray(image) && image.length > 0) {
    const firstImage = image[0];
    if (firstImage?.url) {
      const url = firstImage.url;
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    }
  }
  // Handle nested object structure (old structure)
  if (image?.data?.attributes?.url) {
    const url = image.data.attributes.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  return null;
};

// Helper function to transform Strapi frame to local Frame type
export const transformStrapiFrame = (strapiFrame: StrapiFrame) => {
  return {
    id: strapiFrame.id.toString(),
    code: strapiFrame.code,
    width: strapiFrame.width,
    depth: strapiFrame.depth,
    rebate: strapiFrame.rebate,
    material: strapiFrame.material,
    color: strapiFrame.color,
    priceRate: strapiFrame.priceRate,
    isPopular: strapiFrame.isPopular,
    isOnSale: strapiFrame.isOnSale,
    category: [strapiFrame.category], // Convert to array for compatibility
    maxLength: strapiFrame.maxLength || 200,
    description: strapiFrame.description,
    image: getStrapiImageUrl(strapiFrame.image) || '/images/placeholder.jpg'
  };
};
