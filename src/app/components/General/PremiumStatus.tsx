import React from 'react';
import { Star } from 'lucide-react'; // You can use any icon library or SVG here
import Link from 'next/link';
const PremiumStatus = () => {
  return (
    <Link  href="/payment-success" className="flex items-center space-x-2 text-yellow-500">
      <Star className="w-4 h-4" /> {/* Small icon size */}
      <span className="text-sm font-medium">Premium User</span>
    </Link>
  );
};

export default PremiumStatus;
