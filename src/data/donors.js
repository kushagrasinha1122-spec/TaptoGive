export const DONOR_FEED = [
  { name: 'Meera', amount: 500 },
  { name: 'Karan', amount: 150 },
  { name: 'Rahul', amount: 60 },
  { name: 'Vikram', amount: 90 },
  { name: 'Priya', amount: 300 },
  { name: 'Aisha', amount: 30 },
  { name: 'Ravi', amount: 120 },
  { name: 'Sneha', amount: 450 },
  { name: 'Amit', amount: 60 },
  { name: 'Divya', amount: 180 },
];

export const MEAL_OPTIONS = [
  { amount: 30,  meals: 1, label: '1 meal',   desc: 'Feeds 1 child today',    tag: 'Most Affordable', impact: '1 child will be fed tonight' },
  { amount: 60,  meals: 2, label: '2 meals',  desc: 'Feeds 2 children today', tag: null,              impact: '2 children will be fed tonight' },
  { amount: 90,  meals: 3, label: '3 meals',  desc: 'Feeds 3 children today', tag: 'Popular Choice',  impact: '3 children will be fed tonight' },
  { amount: 150, meals: 5, label: '5 meals',  desc: 'Feeds 5 children today', tag: null,              impact: '5 children will be fed tonight' },
];

export const PAYMENT_METHODS = [
  { id: 'upi',        icon: '📱', label: 'UPI',          sub: 'GPay, PhonePe, Paytm', recommended: true },
  { id: 'card',       icon: '💳', label: 'Card',         sub: 'Debit / Credit Card',  recommended: false },
  { id: 'netbanking', icon: '🏦', label: 'Net Banking',  sub: 'All major banks',      recommended: false },
  { id: 'wallets',    icon: '👜', label: 'Wallets',      sub: 'Paytm, Mobikwik',      recommended: false },
];
