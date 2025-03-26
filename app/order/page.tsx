// app/order/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    id: "complete",
    name: "Complete Assignment Help",
    basePrice: 5000,
    icon: "📝",
  },
  {
    id: "print-bind",
    name: "Print & Spiral-Bind",
    basePrice: 1500,
    icon: "🖨️",
  },
  { id: "print", name: "Just Printing", basePrice: 500, icon: "🖨️" },
  { id: "bind", name: "Just Spiral-Binding", basePrice: 1000, icon: "📘" },
  { id: "custom", name: "Custom Request", basePrice: 0, icon: "✨" },
];

export default function OrderPage() {
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [pages, setPages] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const calculatePrice = () => {
    const service = services.find((s) => s.id === selectedService);
    if (!service) return 0;

    let price = service.basePrice;
    if (urgency) price *= 1.5;
    if (selectedService === "print" || selectedService === "print-bind") {
      price += (pages - 1) * 100;
    }
    return price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would handle form submission here
      alert(`Order placed! Total: ₦${calculatePrice()}`);
      router.push("/tracking");
    } catch (error) {
       console.error("Error submitting assignment:", error);
      setSubmitError("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8"
      >
        Request Assignment Help
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Select Service</h2>
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <motion.label
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer"
              >
                <input
                  type="radio"
                  name="service"
                  value={service.id}
                  checked={selectedService === service.id}
                  onChange={() => setSelectedService(service.id)}
                  className="h-5 w-5 text-indigo-600"
                />
                <span className="block flex items-center">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <span>
                    <span className="font-medium">{service.name}</span>
                    {service.basePrice > 0 && (
                      <span className="text-gray-600 ml-2">
                        (₦{service.basePrice} base price)
                      </span>
                    )}
                  </span>
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Additional Options */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 overflow-hidden"
            >
              {(selectedService === "print" ||
                selectedService === "print-bind") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Pages
                  </label>
                  <motion.input
                    type="number"
                    min="1"
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    whileFocus={{
                      borderColor: "#6366f1",
                      boxShadow: "0 0 0 1px #6366f1",
                    }}
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  id="urgency"
                  checked={urgency}
                  onChange={(e) => setUrgency(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="urgency"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Urgent Service (50% extra)
                </label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {selectedService === "complete"
                    ? "Assignment Details"
                    : "Upload Files"}
                </label>
                <motion.textarea
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  placeholder={
                    selectedService === "complete"
                      ? "Describe your assignment requirements..."
                      : "Any special instructions..."
                  }
                  whileFocus={{
                    borderColor: "#6366f1",
                    boxShadow: "0 0 0 1px #6366f1",
                  }}
                />
                <motion.div whileHover={{ scale: 1.01 }} className="mt-2">
                  <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <span className="mt-2 text-sm font-medium text-gray-700">
                      {files.length > 0
                        ? `${files.length} files selected`
                        : "Click to upload"}
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFiles(Array.from(e.target.files || []))
                      }
                      className="hidden"
                    />
                  </label>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Summary */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 p-4 rounded-lg border border-blue-100"
            >
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg">
                    Total Price:{" "}
                    <span className="font-bold">₦{calculatePrice()}</span>
                  </p>
                  {urgency && (
                    <p className="text-sm text-blue-600 mt-1">
                      Includes urgent service fee
                    </p>
                  )}
                </div>
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            type="submit"
            disabled={!selectedService || isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              selectedService && !isSubmitting
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            whileHover={selectedService && !isSubmitting ? { scale: 1.01 } : {}}
            whileTap={selectedService && !isSubmitting ? { scale: 0.99 } : {}}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Proceed to Payment
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-red-50 text-red-600 rounded-lg flex items-start"
            >
              <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{submitError}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
