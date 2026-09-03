import { Template } from './types';

const GRAY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e5e7eb'/%3E%3Cpath d='M200 220a20 20 0 1 0 0-40 20 20 0 0 0 0 40zm-40 60l30-40 20 20 40-50 30 70H160z' fill='%239ca3af'/%3E%3C/svg%3E";

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Diwali Mega Sale',
    category: 'Festival',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-square',
    defaultText: {
      headline: 'FESTIVE MEGA SALE',
      subheadline: 'Light up your home with our special offers',
      offer: 'UP TO 50% OFF',
    },
    colorScheme: { bg: 'bg-gray-200', text: 'text-gray-900', accent: 'bg-gray-800' }
  },
  {
    id: 't2',
    name: 'Weekend Clearance',
    category: 'Discount',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[9/16]',
    defaultText: {
      headline: 'WEEKEND CLEARANCE',
      subheadline: 'Everything must go this weekend only',
      offer: 'FLAT 30% OFF',
    },
    colorScheme: { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-700' }
  },
  {
    id: 't3',
    name: 'New Arrival Showcase',
    category: 'New Arrival',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-video',
    defaultText: {
      headline: 'NEW ARRIVALS',
      subheadline: 'Check out the latest collection in store',
      offer: 'VISIT US TODAY',
    },
    colorScheme: { bg: 'bg-gray-300', text: 'text-gray-900', accent: 'bg-black' }
  },
  {
    id: 't4',
    name: 'Grand Opening',
    category: 'Opening',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[4/5]',
    defaultText: {
      headline: 'GRAND OPENING',
      subheadline: 'Join us for our store launch event',
      offer: 'FREE GIFTS FOR FIRST 50',
    },
    colorScheme: { bg: 'bg-white', text: 'text-gray-900', accent: 'bg-gray-900' }
  }
];

export const CATEGORIES = ['All', 'Festival', 'Discount', 'New Arrival', 'Opening', 'Seasonal'];

export const ASPECT_RATIOS = [
  { id: '1:1', name: 'Square (Post)', class: 'aspect-square' },
  { id: '9:16', name: 'Portrait (Story)', class: 'aspect-[9/16]' },
  { id: '4:5', name: 'Feed Portrait', class: 'aspect-[4/5]' },
  { id: '16:9', name: 'Landscape', class: 'aspect-video' },
];
