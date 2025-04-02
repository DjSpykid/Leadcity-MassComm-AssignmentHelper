"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";


type Props = {
  params: {
    orderId: string;
  };
};


export default function OrderSuccessPage({params}: Props) {
  const router = useRouter();

  useEffect(() => {
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
            <div className="absolute inset-0 bg-green-100 rounded-full opacity-0 animate-ping-slow" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 text-lg"
        >
          Your order <span className="font-semibold">#{params.orderId}</span>{" "}
          has been received and is being processed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col space-y-4"
        >
          <Button
            onClick={() => router.push(`/student/orders/${params.orderId}`)}
            className="w-full py-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className="text-white font-medium">View Order Details</span>
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full py-6 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className="font-medium">Continue Shopping</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-100"
        >
          <p className="text-sm text-gray-500">
            We&apos;ll send a confirmation email shortly. Contact support if you
            have any questions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
