import { useState, useEffect } from 'react';

// Frame interface for physical specifications
export interface StrapiFrame {
  id: number;
  documentId: string;
  name: string;
  code: string;
  width: number;
  depth: number;
  rebate: number;
  material: string;
  color: string;
  priceRate: number;
  maxLength?: number;
  category: string;
  isPopular: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// Product interface for marketing and sales info
export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  productStatus: string;
  description?: string;
  shortDescription?: string;
  deliveryInfo?: string;
  specifications?: string;
  financingInfo?: string; // Financing/payment information text
  badges?: Array<{
    id: number;
    documentId: string;
    name: string;
    color?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  categories?: string; // Enumeration field for product categories (trending, featured, popular, etc.)
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  images?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  }>;
  frame?: StrapiFrame; // Relationship to Frame content type
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

// Environment variables
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Hook to fetch all products with their associated frames
export const useProducts = () => {
  const [products, setProducts] = useState<StrapiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(`${STRAPI_URL}/api/products?populate[images]=true&populate[frame]=true&populate[badges]=true&sort=name:asc`, {
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiResponse<StrapiProduct> = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Hook to fetch a single product by slug with its associated frame
export const useProduct = (slug: string) => {
  const [product, setProduct] = useState<StrapiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate[images]=true&populate[frame]=true&populate[badges]=true`, {
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiResponse<StrapiProduct> = await response.json();
        
        if (data.data && data.data.length > 0) {
          setProduct(data.data[0]);
        } else {
          setProduct(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug && slug.trim() !== '') {
      fetchProduct();
    } else {
      setLoading(false);
      setProduct(null);
    }
  }, [slug]);

  return { product, loading, error };
};

// Hook to fetch trending products only
export const useTrendingProducts = () => {
  const [products, setProducts] = useState<StrapiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        // Filter products where categories contains "trending"
        const response = await fetch(`${STRAPI_URL}/api/products?filters[categories][$eq]=trending&populate[images]=true&populate[frame]=true&sort=createdAt:desc`, {
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiResponse<StrapiProduct> = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return { products, loading, error };
};

// Hook to fetch all frames
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

        const response = await fetch(`${STRAPI_URL}/api/frames?sort=code:asc`, {
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiResponse<StrapiFrame> = await response.json();
        setFrames(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch frames');
        setFrames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  return { frames, loading, error };
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
  // Handle single image object
  if (image?.url) {
    const url = image.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  // Handle nested object structure (old structure) - kept for backward compatibility
  if (image?.data?.attributes?.url) {
    const url = image.data.attributes.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  return null;
};

// Transform function to convert Strapi product to local product type
export const transformStrapiProduct = (strapiProduct: StrapiProduct) => {
  return {
    id: strapiProduct.id.toString(),
    name: strapiProduct.name,
    slug: strapiProduct.slug,
    sku: strapiProduct.sku,
    price: strapiProduct.price,
    status: strapiProduct.productStatus,
    description: strapiProduct.description,
    shortDescription: strapiProduct.shortDescription,
    deliveryInfo: strapiProduct.deliveryInfo,
    specifications: strapiProduct.specifications,
    financingInfo: strapiProduct.financingInfo,
    badges: strapiProduct.badges?.map(badge => ({
      id: badge.id,
      name: badge.name,
      color: badge.color
    })),
    categories: strapiProduct.categories || '',
    images: strapiProduct.images?.map(img => getStrapiImageUrl(img) || '/images/placeholder.jpg') || [],
    frame: strapiProduct.frame ? {
      id: strapiProduct.frame.id.toString(),
      name: strapiProduct.frame.name || strapiProduct.frame.code,
      code: strapiProduct.frame.code,
      width: strapiProduct.frame.width,
      depth: strapiProduct.frame.depth,
      rebate: strapiProduct.frame.rebate,
      material: strapiProduct.frame.material,
      color: strapiProduct.frame.color,
      priceRate: strapiProduct.frame.priceRate,
      maxLength: strapiProduct.frame.maxLength || 200,
      category: strapiProduct.frame.category,
      isPopular: strapiProduct.frame.isPopular,
      isOnSale: strapiProduct.frame.isOnSale,
    } : null
  };
};
