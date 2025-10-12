import { Frame, StandardSize } from '../components/frame-builder/types';

// Real frame data from frameshop.com.au
export const frames: Frame[] = [
  // Popular Frames
  { id: '103F', code: '103F', name: '103F', width: 2, depth: 4, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 5, category: ['Popular', 'Black'] },
  { id: '103H', code: '103H', name: '103H', width: 2, depth: 4, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 5, category: ['Popular', 'White'] },
  { id: '103RO', code: '103RO', name: '103RO', width: 2, depth: 4, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 5, category: ['Popular', 'Raw Timber'] },
  
  // 224 Series
  { id: '224H', code: '224H', name: '224H', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 2, category: ['Popular', 'White'] },
  { id: '224F', code: '224F', name: '224F', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 2, category: ['Popular', 'Black'] },
  { id: '224RO', code: '224RO', name: '224RO', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 3, category: ['Popular', 'Raw Timber'] },
  
  // 303 Series
  { id: '303F', code: '303F', name: '303F', width: 2, depth: 3, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 4, category: ['Black'] },
  { id: '303H', code: '303H', name: '303H', width: 2, depth: 3, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 4, category: ['White'] },
  { id: '303RO', code: '303RO', name: '303RO', width: 2, depth: 3, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 4, category: ['Raw Timber'] },
  
  // 232 Series
  { id: '232F', code: '232F', name: '232F', width: 3, depth: 2, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 3, category: ['Black'] },
  { id: '232H', code: '232H', name: '232H', width: 3, depth: 2, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 3, category: ['White'] },
  { id: '232RO', code: '232RO', name: '232RO', width: 3, depth: 2, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 4, category: ['Raw Timber'] },
  
  // 153 Series
  { id: '153RO', code: '153RO', name: '153RO', width: 3, depth: 4.5, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 8, category: ['Raw Timber'] },
  { id: '153FO', code: '153FO', name: '153FO', width: 3, depth: 4.5, rebate: 0.5, material: 'Wood', color: 'Black Grain', priceRate: 8, category: ['Black', 'Stains'] },
  { id: '153HO', code: '153HO', name: '153HO', width: 3, depth: 4.5, rebate: 0.5, material: 'Wood', color: 'White Grain', priceRate: 8, category: ['White', 'Stains'] },
  { id: '153H', code: '153H', name: '153H', width: 3, depth: 4.5, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 8, category: ['White'] },
  { id: '153F', code: '153F', name: '153F', width: 3, depth: 4.5, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 8, category: ['Black'] },
  
  // 171 Series
  { id: '171F', code: '171F', name: '171F', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'Black', priceRate: 4, category: ['Black'] },
  { id: '171H', code: '171H', name: '171H', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'White', priceRate: 4, category: ['White'] },
  { id: '171FO', code: '171FO', name: '171FO', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'Black Grain', priceRate: 5, category: ['Black', 'Stains'] },
  { id: '171HO', code: '171HO', name: '171HO', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'White Grain', priceRate: 6, category: ['White', 'Stains'] },
  { id: '171RO', code: '171RO', name: '171RO', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 5, category: ['Raw Timber'] },
  
  // 730 Series
  { id: '730RO', code: '730RO', name: '730RO', width: 4, depth: 2, rebate: 0.5, material: 'Wood', color: 'Raw Oak', priceRate: 6, category: ['Raw Timber'] },
  
  // Aluminium Frames
  { id: 'AL001', code: 'AL001', name: 'AL001', width: 1.5, depth: 1.5, rebate: 0.3, material: 'Aluminium', color: 'Silver', priceRate: 3, category: ['Aluminium', 'Silver'] },
  { id: 'AL002', code: 'AL002', name: 'AL002', width: 2, depth: 1.5, rebate: 0.3, material: 'Aluminium', color: 'Black', priceRate: 3, category: ['Aluminium', 'Black'] },
  { id: 'AL003', code: 'AL003', name: 'AL003', width: 2, depth: 1.5, rebate: 0.3, material: 'Aluminium', color: 'White', priceRate: 3, category: ['Aluminium', 'White'] },
  
  // Gold Frames
  { id: 'G001', code: 'G001', name: 'G001', width: 3, depth: 2.5, rebate: 0.5, material: 'Wood', color: 'Gold', priceRate: 7, category: ['Gold'] },
  { id: 'G002', code: 'G002', name: 'G002', width: 4, depth: 3, rebate: 0.5, material: 'Wood', color: 'Antique Gold', priceRate: 8, category: ['Gold'] },
  
  // Colourful Frames
  { id: 'C001', code: 'C001', name: 'C001', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'Red', priceRate: 4, category: ['Colourful'] },
  { id: 'C002', code: 'C002', name: 'C002', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'Blue', priceRate: 4, category: ['Colourful'] },
  { id: 'C003', code: 'C003', name: 'C003', width: 2, depth: 2, rebate: 0.5, material: 'Wood', color: 'Green', priceRate: 4, category: ['Colourful'] },
  
  // 3D Frames (Gallery Wrap / Box Frames)
  { id: '3D-001', code: '3D-BLACK', name: 'Black 3D Box', width: 0, depth: 3, rebate: 0, material: '3D', color: 'Black', priceRate: 8, category: ['3D Frame'] },
  { id: '3D-002', code: '3D-WHITE', name: 'White 3D Box', width: 0, depth: 3, rebate: 0, material: '3D', color: 'White', priceRate: 8, category: ['3D Frame'] },
  { id: '3D-003', code: '3D-OAK', name: 'Oak 3D Box', width: 0, depth: 3, rebate: 0, material: '3D', color: 'Oak', priceRate: 9, category: ['3D Frame'] },
  { id: '3D-004', code: '3D-SILVER', name: 'Silver 3D Box', width: 0, depth: 2, rebate: 0, material: '3D', color: 'Silver', priceRate: 10, category: ['3D Frame'] },
  { id: '3D-005', code: '3D-GOLD', name: 'Gold 3D Box', width: 0, depth: 2, rebate: 0, material: '3D', color: 'Gold', priceRate: 12, category: ['3D Frame'] },
];

export const standardSizes: StandardSize[] = [
  { name: '4" x 6" (10.2 x 15.2 cm)', width: 10.2, height: 15.2, widthInch: 4, heightInch: 6 },
  { name: '5" x 7" (12.7 x 17.8 cm)', width: 12.7, height: 17.8, widthInch: 5, heightInch: 7 },
  { name: '6" x 8" (15.2 x 20.3 cm)', width: 15.2, height: 20.3, widthInch: 6, heightInch: 8 },
  { name: '8" x 10" (20.3 x 25.4 cm)', width: 20.3, height: 25.4, widthInch: 8, heightInch: 10 },
  { name: '8" x 12" (20.3 x 30.5 cm)', width: 20.3, height: 30.5, widthInch: 8, heightInch: 12 },
  { name: '11" x 14" (27.9 x 35.6 cm)', width: 27.9, height: 35.6, widthInch: 11, heightInch: 14 },
  { name: '12" x 16" (30.5 x 40.6 cm)', width: 30.5, height: 40.6, widthInch: 12, heightInch: 16 },
  { name: '16" x 20" (40.6 x 50.8 cm)', width: 40.6, height: 50.8, widthInch: 16, heightInch: 20 },
  { name: '16" x 24" (40.6 x 61.0 cm)', width: 40.6, height: 61.0, widthInch: 16, heightInch: 24 },
  { name: '18" x 24" (45.6 x 61.0 cm)', width: 45.6, height: 61.0, widthInch: 18, heightInch: 24 },
  { name: 'A5 (14.8 x 21.0 cm)', width: 14.8, height: 21.0, widthInch: 5.8, heightInch: 8.3 },
  { name: 'A4 (21.0 x 29.7 cm)', width: 21.0, height: 29.7, widthInch: 8.3, heightInch: 11.7 },
  { name: 'A3 (29.7 x 42.0 cm)', width: 29.7, height: 42.0, widthInch: 11.7, heightInch: 16.5 },
  { name: 'A2 (42.0 x 59.4 cm)', width: 42.0, height: 59.4, widthInch: 16.5, heightInch: 23.4 },
  { name: 'A1 (59.4 x 84.1 cm)', width: 59.4, height: 84.1, widthInch: 23.4, heightInch: 33.1 },
  { name: 'A0 (84.1 x 118.9 cm)', width: 84.1, height: 118.9, widthInch: 33.1, heightInch: 46.8 },
  { name: 'B2 (50.0 x 70.7 cm)', width: 50.0, height: 70.7, widthInch: 19.7, heightInch: 27.8 },
  { name: 'B1 (70.7 x 100.0 cm)', width: 70.7, height: 100.0, widthInch: 27.8, heightInch: 39.4 },
];

export const frameCategories = [
  { id: 'popular', name: 'Popular', icon: '⭐' },
  { id: 'on-sale', name: 'On Sale', icon: '$' },
  { id: '3d-frame', name: '3D Frame', icon: '📦' },
  { id: 'aluminium', name: 'Aluminium', icon: '' },
  { id: 'black', name: 'Black', icon: '' },
  { id: 'white', name: 'White', icon: '' },
  { id: 'colourful', name: 'Colourful', icon: '' },
  { id: 'stains', name: 'Stains', icon: '' },
  { id: 'gold', name: 'Gold', icon: '' },
  { id: 'silver', name: 'Silver', icon: '' },
  { id: 'raw-timber', name: 'Raw Timber', icon: '' },
  { id: 'float-for-canvas', name: 'Float for Canvas', icon: '' },
];

export const bulkOptions = [
  { quantity: 10, discount: 0.10, label: 'Pack of 10 @ Save 10%' },
  { quantity: 25, discount: 0.15, label: 'Pack of 25 @ Save 15%' },
  { quantity: 50, discount: 0.20, label: 'Pack of 50 @ Save 20%' },
  { quantity: 100, discount: 0.25, label: 'Pack of 100 @ Save 25%' },
  { quantity: 200, discount: 0.30, label: 'Pack of 200 @ Save 30%' },
];
