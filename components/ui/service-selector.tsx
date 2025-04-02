"use client";

import { motion } from "framer-motion";
import { BookText, Printer, HelpCircle, } from "lucide-react";


export const ServiceSelector = ({
  onSelect,
}: {
  onSelect: (service: string) => void;
}) => {
  const services = [
    {
      id: "complete-help",
      title: "Complete Help",
      icon: <BookText className="w-6 h-6" />,
      desc: "We handle everything from research to binding",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "print-bind",
      title: "Print & Bind",
      icon: <Printer className="w-6 h-6" />,
      desc: "Upload your work, we print and bind it",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "printing",
      title: "Just Printing",
      icon: <Printer className="w-6 h-6" />,
      desc: "Upload documents, we print them",
      color: "from-green-500 to-green-600",
    },
    {
      id: "binding",
      title: "Just Binding",
      icon: <BookText className="w-6 h-6" />,
      desc: "Bring printed work, we bind it",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "custom",
      title: "Custom Request",
      icon: <HelpCircle className="w-6 h-6" />,
      desc: "Special requests? Describe them",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {services.map((service, index) => (
        <motion.button
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            y: -5,
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(service.id)}
          className={`bg-gradient-to-br ${service.color} text-white p-6 rounded-xl flex flex-col items-center text-center h-full`}
        >
          <motion.div
            className="bg-white bg-opacity-20 p-3 rounded-full mb-4"
            whileHover={{ rotate: 10 }}
          >
            {service.icon}
          </motion.div>
          <h3 className="font-bold text-lg mb-2">{service.title}</h3>
          <p className="text-sm opacity-90">{service.desc}</p>
        </motion.button>
      ))}
    </div>
  );
};
