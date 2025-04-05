// components/OrderHelp.tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

interface OrderHelpProps {
  orderId?: string;
  userName?: string;
}

export default function OrderHelp({ orderId, userName }: OrderHelpProps) {
  // Create the WhatsApp link with personalized message
  const whatsappLink = orderId
    ? `https://wa.me/2349123774118?text=Hi%20MassComm%20Solutions,%20this%20is%20${
        userName ? encodeURIComponent(userName) : "a%20user"
      }%20from%20MassComm.%20I%20need%20help%20with%20order%20number:%20${orderId}`
    : `https://wa.me/2349123774118?text=Hi%20MassComm%20Solutions,%20this%20is%20${
        userName ? encodeURIComponent(userName) : "a%20user"
      }%20from%20MassComm.%20I%20need%20help%20with%20my%20order`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-900 mb-2">
            {orderId
              ? "Need help with this order?"
              : "Need help with an order?"}
          </h3>
          <p className="text-gray-600 mb-4">
            Our team is ready to assist you with any questions about your order
            status, delivery, or any issues you might be experiencing.
          </p>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Support
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
