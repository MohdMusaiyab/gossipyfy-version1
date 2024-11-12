"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

declare global {
  interface Window {
    Razorpay: any; // You can leave this as any since Razorpay's library might not have TypeScript definitions
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  const loadRazorpay = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // @ts-ignore
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      await loadRazorpay();

      const { data } = await axios.post("/api/create-order", {
        amount: 50, // Example amount in INR (in paise)
      });

      const { razorpayOrderId, amount, currency } = data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: "Your App",
        description: "Premium Subscription",
        handler: async (response: RazorpayResponse) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            const verificationResponse = await axios.post(
              "/api/verify-signature",
              {
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                razorpaySignature: razorpay_signature,
              }
            );

            router.push("/payment-success");
            // @ts-ignore
          } catch (verificationError: AxiosError) {
            setError("Payment verification failed. Please contact support.");
            setDebugInfo(
              JSON.stringify(
                verificationError.response?.data || verificationError.message
              )
            );
          }
        },
        theme: {
          color: "#6C63FF",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      // @ts-ignore
    } catch (error: AxiosError) {
      setError("Failed to initiate payment. Please try again.");
      setDebugInfo(JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] text-white">
      {/* Test Payment Information Banner */}
      <div className="w-full max-w-md mb-4 p-4 bg-gradient-to-br from-blue-800 to-purple-800 text-white font-semibold text-center rounded-lg shadow-lg">
        <p>
          Test Card Number: <strong>5267 3181 8797 5449</strong>
        </p>
        <p>
          Random CVV: <strong>Any 3 digits</strong>
        </p>
        <p>
          Expiry Date: <strong>Any future date</strong>
        </p>
        <p>Mobile Number:- Any 10 Digit Number</p>
        <p>Click on <strong>SKIP OTP</strong> in case of Random Number</p>
      </div>

      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-white bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Premium Subscription
        </h1>
        {error && <p className="mb-4 text-red-400 text-center">{error}</p>}
        {debugInfo && (
          <pre className="mb-4 p-2 bg-gray-800 rounded-lg text-xs overflow-x-auto text-gray-300">
            {debugInfo}
          </pre>
        )}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md text-white font-semibold tracking-wide transition-all duration-200 ${
            loading
              ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg shadow-purple-600/50 focus:outline-none focus:ring-4 focus:ring-purple-400"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
