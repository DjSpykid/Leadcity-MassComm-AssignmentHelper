// components/WhatsAppHelp.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WhatsAppHelp() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if we're on an order details page
  const isOrderDetailsPage =
    pathname?.includes("/student/orders/") && pathname.split("/").length > 3;

  useEffect(() => {
    // Skip order details pages completely
    if (isOrderDetailsPage) return;

    // Show after 30 seconds on other pages
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [pathname, isOrderDetailsPage]);

  // Don't render anything on order details pages
  if (isOrderDetailsPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-4 rounded-xl shadow-xl w-64"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">
                Confirm Order ?
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Chat with us on WhatsApp to confirm your order with payment receipt.
            </p>
            <Link
              href="https://wa.me/2349069650658?text=Hi%20MassComm%20Solutions,%20I%20am%20here%20to%20confirm%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Start Chat
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.div>
      )}
    </div>
  );
}
