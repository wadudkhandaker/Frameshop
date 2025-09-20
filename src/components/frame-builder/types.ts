export interface Frame {
  id: string;
  code: string;
  name?: string;
  width: number;
  depth: number;
  rebate: number;
  material: string;
  color: string;
  priceRate: number;
  category: string[];
  image?: string;
  isPopular?: boolean;
  isOnSale?: boolean;
  maxLength?: number;
}

export interface SortOption {
  label: string;
  value: string;
  sortFn: (a: Frame, b: Frame) => number;
}

export interface StandardSize {
  label: string;
  width: number;
  height: number;
}

export interface MatBoard {
  id: string;
  name: string;
  color: string;
  textColor: 'black' | 'white';
  category: 'white-core' | 'black-core' | 'museum';
  backgroundImage?: string;
}

export type TabType = 'frames' | 'mats' | 'glass' | 'printing' | 'extras';
export type MatStyle = '0' | '1' | '2';
export type ImageOverlap = 'PHOTO' | 'EXACT';
export type MatCategory = 'white-core' | 'black-core' | 'museum';
export type MatWidthType = 'uniform' | 'custom';
export type Units = 'cm' | 'inch';

export interface StandardSize {
  name: string;
  width: number;
  height: number;
  widthInch: number;
  heightInch: number;
}

export interface CustomOrder {
  width: number;
  height: number;
  units: 'cm' | 'inch';
  frame: Frame | null;
  image: File | null;
  matting: boolean;
  glass: string;
  backing: string;
  hanger: string;
  quantity: number;
  bulkOption?: number;
}