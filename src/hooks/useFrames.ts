import { useState, useEffect } from 'react';
import { Frame } from '../components/frame-builder/types';
import { frames as mockFrames } from '../data/frames';

export const useFrames = () => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadFrames = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFrames(mockFrames);
      } catch (error) {
        console.error('Error loading frames:', error);
        setFrames([]);
      } finally {
        setLoading(false);
      }
    };

    loadFrames();
  }, []);

  return { frames, loading };
};

export const useFrameCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract unique categories from mock frames
    const loadCategories = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const uniqueCategories = Array.from(
          new Set(mockFrames.flatMap(frame => frame.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading };
};