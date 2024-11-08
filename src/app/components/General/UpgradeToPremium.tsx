import React from "react";
import Link from "next/link";

const UpgradeToPremium = () => {
  return (
    <Link
      href="/payment"
      className="px-6 py-3 mx-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    >
      Upgrade to Premium
    </Link>
  );
};

export default UpgradeToPremium;
