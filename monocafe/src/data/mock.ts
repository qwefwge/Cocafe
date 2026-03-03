export const MENU_CATEGORIES = [
  { id: 'wraps', name: 'Wraps & Sandwiches', icon: '🥪', color: 'bg-orange-100' },
  { id: 'fruit', name: 'Fruit Cups', icon: '🍎', color: 'bg-red-100' },
  { id: 'drinks', name: 'Healthy Drinks', icon: '🥤', color: 'bg-blue-100' },
  { id: 'smoothies', name: 'Yogurt Smoothies', icon: '🫐', color: 'bg-purple-100' },
  { id: 'specials', name: 'Today\'s Specials', icon: '✨', color: 'bg-yellow-100' },
];

export const MENU_ITEMS = [
  {
    id: '1',
    category: 'wraps',
    name: 'Turkey Avocado Wrap',
    price: 6.50,
    calories: 420,
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=600',
    tags: ['High Protein', 'Whole Grain'],
    allergens: ['Gluten'],
    description: 'Roasted turkey breast, fresh avocado, lettuce, and tomato in a whole wheat wrap.'
  },
  {
    id: '2',
    category: 'wraps',
    name: 'Veggie Hummus Sandwich',
    price: 5.75,
    calories: 350,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian', 'Fiber Rich'],
    allergens: ['Sesame', 'Gluten'],
    description: 'Creamy hummus, cucumber, bell peppers, and spinach on multigrain bread.'
  },
  {
    id: '3',
    category: 'fruit',
    name: 'Berry Mix Cup',
    price: 4.00,
    calories: 80,
    image: 'https://images.unsplash.com/photo-1563746098251-d36a7191242f?auto=format&fit=crop&q=80&w=600',
    tags: ['Low Sugar', 'Vitamin C'],
    allergens: [],
    description: 'Fresh strawberries, blueberries, and raspberries.'
  },
  {
    id: '4',
    category: 'smoothies',
    name: 'Green Power Smoothie',
    price: 5.50,
    calories: 210,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600',
    tags: ['Detox', 'No Added Sugar'],
    allergens: ['Dairy'],
    description: 'Spinach, banana, greek yogurt, and honey.'
  },
  {
    id: '5',
    category: 'specials',
    name: 'Spicy Tuna Poke Bowl',
    price: 8.95,
    calories: 550,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    tags: ['Chef\'s Choice', 'Omega-3'],
    allergens: ['Fish', 'Soy', 'Sesame'],
    description: 'Fresh tuna, sushi rice, spicy mayo, edamame, and seaweed salad.'
  }
];

export const CHARITY_DATA = {
  currentMonth: 'October',
  cause: 'Local Animal Shelter',
  goal: 1000,
  raised: 745,
  options: [
    { id: 1, name: 'Local Animal Shelter', votes: 145 },
    { id: 2, name: 'Community Garden', votes: 89 },
    { id: 3, name: 'Literacy Program', votes: 112 },
  ]
};
