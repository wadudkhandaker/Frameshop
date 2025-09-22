import { Frame, StandardSize, MatBoard, SortOption } from './types';



export const standardSizes: StandardSize[] = [
  { name: '4x6', label: '4" x 6" (10.2 x 15.2 cm)', width: 10.2, height: 15.2, widthInch: 4, heightInch: 6 },
  { name: '5x7', label: '5" x 7" (12.7 x 17.8 cm)', width: 12.7, height: 17.8, widthInch: 5, heightInch: 7 },
  { name: '6x8', label: '6" x 8" (15.2 x 20.3 cm)', width: 15.2, height: 20.3, widthInch: 6, heightInch: 8 },
  { name: '8x10', label: '8" x 10" (20.3 x 25.4 cm)', width: 20.3, height: 25.4, widthInch: 8, heightInch: 10 },
  { name: '8x12', label: '8" x 12" (20.3 x 30.5 cm)', width: 20.3, height: 30.5, widthInch: 8, heightInch: 12 },
  { name: '11x14', label: '11" x 14" (27.9 x 35.6 cm)', width: 27.9, height: 35.6, widthInch: 11, heightInch: 14 },
  { name: '12x16', label: '12" x 16" (30.5 x 40.6 cm)', width: 30.5, height: 40.6, widthInch: 12, heightInch: 16 },
  { name: '16x20', label: '16" x 20" (40.6 x 50.8 cm)', width: 40.6, height: 50.8, widthInch: 16, heightInch: 20 },
  { name: '16x24', label: '16" x 24" (40.6 x 61.0 cm)', width: 40.6, height: 61.0, widthInch: 16, heightInch: 24 },
  { name: '18x24', label: '18" x 24" (45.6 x 61.0 cm)', width: 45.6, height: 61.0, widthInch: 18, heightInch: 24 },
  { name: 'A5', label: 'A5 (14.8 x 21.0 cm)', width: 14.8, height: 21.0, widthInch: 5.8, heightInch: 8.3 },
  { name: 'A4', label: 'A4 (21.0 x 29.7 cm)', width: 21.0, height: 29.7, widthInch: 8.3, heightInch: 11.7 },
  { name: 'A3', label: 'A3 (29.7 x 42.0 cm)', width: 29.7, height: 42.0, widthInch: 11.7, heightInch: 16.5 },
  { name: 'A2', label: 'A2 (42.0 x 59.4 cm)', width: 42.0, height: 59.4, widthInch: 16.5, heightInch: 23.4 },
  { name: 'A1', label: 'A1 (59.4 x 84.1 cm)', width: 59.4, height: 84.1, widthInch: 23.4, heightInch: 33.1 },
  { name: 'A0', label: 'A0 (84.1 x 118.9 cm)', width: 84.1, height: 118.9, widthInch: 33.1, heightInch: 46.8 },
];

export const matBoards: MatBoard[] = [
  { id: '1', name: 'M47 Neutral White', color: '#fffdf8', textColor: 'black', category: 'white-core' },
  { id: '2', name: 'M55 Very White (Fine Texture)', color: '#fdfdff', textColor: 'black', category: 'white-core' },
  { id: '3', name: 'M34 Black', color: '#222222', textColor: 'white', category: 'white-core' },
  { id: '4', name: 'M20 Charcoal Grey', color: '#4e4e4e', textColor: 'white', category: 'white-core' },
  { id: '5', name: 'M301 London Grey', color: '#777f80', textColor: 'white', category: 'white-core' },
  { id: '6', name: 'M76 Harbour Grey', color: '#a6a7b3', textColor: 'black', category: 'white-core' },
  { id: '7', name: 'M66 Pale Grey', color: '#d7d8d2', textColor: 'black', category: 'white-core' },
  { id: '8', name: 'M02 Dove', color: '#fffff3', textColor: 'black', category: 'white-core' },
  { id: '9', name: 'M19 Ivory', color: '#fefbf2', textColor: 'black', category: 'white-core' },
  { id: '10', name: 'M08 Sugared Almond', color: '#fff7f5', textColor: 'black', category: 'white-core' },
  { id: '11', name: 'M68 Soapstone', color: '#fef2dc', textColor: 'black', category: 'white-core' },
  { id: '12', name: 'M44 Twilight Cream', color: '#ebe6d6', textColor: 'black', category: 'white-core' },
  { id: '13', name: 'M09 Light Cream', color: '#ffffee', textColor: 'black', category: 'white-core' },
  { id: '14', name: 'M309 Cashew', color: '#ffedd5', textColor: 'black', category: 'white-core' },
  { id: '15', name: 'M37 Cream', color: '#ffffe2', textColor: 'black', category: 'white-core' },
  { id: '16', name: 'M48 Cream', color: '#fff5cc', textColor: 'black', category: 'white-core' },
  { id: '17', name: 'M15 Azureish White', color: '#dae3fa', textColor: 'black', category: 'white-core' },
  { id: '18', name: 'M07 Pastel Blue', color: '#bcebf6', textColor: 'black', category: 'white-core' },
  { id: '19', name: 'M18 Mid Blue', color: '#8496c3', textColor: 'black', category: 'white-core' },
  { id: '20', name: 'M63 Flag Blue', color: '#3957b5', textColor: 'white', category: 'white-core' },
];

export const sortOptions: SortOption[] = [
  {
    label: 'Sort By Width: smallest first',
    value: 'width-asc',
    sortFn: (a, b) => a.width - b.width
  },
  {
    label: 'Sort By Width: largest first',
    value: 'width-desc',
    sortFn: (a, b) => b.width - a.width
  },
  {
    label: 'Sort By Price: low to high',
    value: 'price-asc',
    sortFn: (a, b) => a.priceRate - b.priceRate
  },
  {
    label: 'Sort By Price: high to low',
    value: 'price-desc',
    sortFn: (a, b) => b.priceRate - a.priceRate
  }
];

export const bulkOptions = [
  { value: '10', label: 'Pack of 10 @ $15.12 each - Save 10%' },
  { value: '25', label: 'Pack of 25 @ $14.28 each - Save 15%' },
  { value: '50', label: 'Pack of 50 @ $13.44 each - Save 20%' },
  { value: '100', label: 'Pack of 100 @ $12.60 each - Save 25%' },
  { value: '200', label: 'Pack of 200 @ $11.76 each - Save 30%' },
];

export const categories = [
  { name: 'All', icon: null },
  { name: 'Popular', icon: 'star' },
  { name: 'On Sale', icon: 'dollar' },
  { name: 'Aluminium', icon: null },
  { name: 'Black', icon: null },
  { name: 'White', icon: null },
  { name: 'Colourful', icon: null },
  { name: 'Stains', icon: null },
  { name: 'Gold', icon: null },
  { name: 'Silver', icon: null },
  { name: 'Raw Timber', icon: null },
  { name: 'Float for Canvas', icon: null }
];