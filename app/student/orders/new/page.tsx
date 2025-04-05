

// "use client";
// import { usePaystackPayment } from 'react-paystack';
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Upload,
//   FileText,
//   X,
//   ChevronLeft,
//   Loader2,
//   ArrowRight,
//   Printer,
//   Bookmark,
//   PenTool,
//   Zap,
//   Plus,
//   Minus,
// } from "lucide-react";
// import { courseReps } from "@/data/courseReps";
// import { useAuth } from "@/context/AuthContext";

// const serviceTypes = [
//   {
//     id: "complete-help",
//     title: "Complete Assignment Help",
//     description: "Full-service solution from research to submission",
//     icon: "🧠",
//     features: ["Research", "Writing", "Formatting", "Printing", "Binding"],
//     basePrice: 1950,
//   },
//   {
//     id: "print-bind",
//     title: "Print & Bind / Hand Written Assignment Only",
//     description: "Professional writng of your assign / printing and binding of your documents ",
//     icon: "🖨️",
//     features: ["High-quality printing", "Spiral binding"],
//     basePrice: 550,
//   },
//   {
//     id: "printing",
//     title: "Printing Only",
//     description: "Quick and reliable document printing",
//     icon: "📄",
//     features: [
//       "Multiple copies",
//       "Color/B&W options",
//       "Various paper types",
//     ],
//     basePrice: 400,
//   },
//   {
//     id: "binding",
//     title: "Binding Only",
//     description: "Professional document binding services",
//     icon: "📚",
//     features: ["Spiral binding", "Thermal binding"],
//     basePrice: 300,
//   },
//   {
//     id: "custom",
//     title: "Custom Request",
//     description: "Tailored solutions for unique needs",
//     icon: "✨",
//     features: ["Personalized service", "Flexible options", "Special requests"],
//     basePrice: 3000,
//   },
// ];

// const printingOptions = [
//   { id: "color", label: "Color Printing", price: 800 },
//   { id: "bw", label: "Black & White", price: 0 },
// ];

// const bindingOptions = [
//   { id: "spiral", label: "Spiral Binding", price: 1000 },
//   { id: "thermal", label: "Thermal Binding", price: 500 },
// ];

// const urgencyOptions = [
//   {
//     id: "standard",
//     label: "Standard (2-3 days)",
//     multiplier: 1,
//   },
//   {
//     id: "urgent",
//     label: "Urgent (24 hours) +20%",
//     multiplier: 1.4,
//   },
// ];

// // Custom Number Input Component
// const NumberInput = ({
//   value,
//   onChange,
//   min = 1,
//   max = 100,
//   className = "",
//   disabled = false
// }) => {
//   const handleIncrement = () => {
//     if (!disabled && value < max) {
//       onChange(value + 1);
//     }
//   };

//   const handleDecrement = () => {
//     if (!disabled && value > min) {
//       onChange(value - 1);
//     }
//   };

//   const handleChange = (e) => {
//     const newValue = parseInt(e.target.value) || min;
//     if (newValue >= min && newValue <= max) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div className={`flex items-center border border-gray-300 rounded-xl overflow-hidden ${className} ${
//       disabled ? "opacity-50 cursor-not-allowed" : ""
//     }`}>
//       <button
//         type="button"
//         onClick={handleDecrement}
//         disabled={disabled || value <= min}
//         className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//       >
//         <Minus className="w-4 h-4" />
//       </button>
//       <input
//         type="number"
//         value={value}
//         onChange={handleChange}
//         min={min}
//         max={max}
//         disabled={disabled}
//         className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="button"
//         onClick={handleIncrement}
//         disabled={disabled || value >= max}
//         className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//       >
//         <Plus className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default function AssignmentHelpPage() {
//   const { getToken, user } = useAuth();
//   const router = useRouter();
//   const [step, setStep] = useState<"select" | "details" | "review">("select");
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUrgent, setIsUrgent] = useState(false);

//   const [formData, setFormData] = useState({
//     studentName: "",
//     matricNumber: "",
//     courseCode: "",
//     printType: "bw",
//     copies: 1,
//     doubleSided: false,
//     handwrittenRequired: false,
//     handwritingInstructions: "",
//     bindingType: "spiral",
//     assignmentQuestion: "",
//     pages: 1,
//     formatting: "",
//     urgency: "standard",
//     deliveryFormat: "handwritten",
//     selectedRep: "",
//     specialInstructions: "",
//     deadline: "",
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setUploadedFiles([...uploadedFiles, ...newFiles]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
//   };

//   const calculatePrice = () => {
//     if (!selectedService) return 0;

//     const service = serviceTypes.find((s) => s.id === selectedService);
//     let price = service?.basePrice || 0;

//     // Print/Bind specific calculations
//     if (selectedService === "print-bind" || selectedService === "printing") {
//       // Handwritten takes priority
//       if (formData.handwrittenRequired) {
//         return price + 500 + (formData.pages - 1) * 200;
//       }

//       if (selectedService === "printing") {
//         // Printing Only service
//         price = 400; // Base price for printing service
//         if (formData.printType === "color") {
//           price += 800 * formData.copies;
//         } else {
//           price += 200 * (formData.copies - 1);
//         }
//       } else {
//         // Print & Bind service
//         if (formData.printType === "color") {
//           price += 800 * formData.copies;
//         } else if (formData.copies > 1) {
//           price += 200 * (formData.copies - 1);
//         }
//       }
//     }

//     if (selectedService === "print-bind" || selectedService === "binding") {
//       if (!formData.handwrittenRequired) {
//         const bindingOption = bindingOptions.find(
//           (opt) => opt.id === formData.bindingType
//         );
//         price += bindingOption?.price || 0;
//       }
//     }

//     // Complete help service calculations
//     if (selectedService === "complete-help") {
//       price += formData.pages * 200;
//       const urgency = urgencyOptions.find((u) => u.id === formData.urgency);
//       price *= urgency?.multiplier || 1;
//       if (formData.deliveryFormat === "printed-bound") price += 1000;
//     }

//     // Custom service calculations
//     if (selectedService === "custom") {
//       price += Math.min(
//         Math.floor(formData.assignmentQuestion.length / 100) * 500,
//         5000
//       );
//       const urgency = urgencyOptions.find((u) => u.id === formData.urgency);
//       price *= urgency?.multiplier || 1;
//     }

//     // Urgency fee for print/bind services
//     if (
//       (selectedService === "print-bind" ||
//         selectedService === "printing" ||
//         selectedService === "binding") &&
//       formData.deadline
//     ) {
//       const deadlineDate = new Date(formData.deadline);
//       const now = new Date();
//       const hoursDiff =
//         (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);

//       if (hoursDiff < 24) {
//         price *= 1.3;
//       }
//     }

//     return Math.round(price);
//   };

//   // Paystack payment configuration
//   const config = {
//     reference: `${new Date().getTime()}`,
//     email: user?.email || "customer@example.com",
//     amount: calculatePrice() * 100, // in kobo
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//     metadata: {
//       custom_fields: [
//         {
//           display_name: "Service Type",
//           variable_name: "service_type",
//           value: selectedService,
//         },
//       ],
//     },
//   };

//   const initializePayment = usePaystackPayment(config);

//   // const handleSubmit = async () => {
//   //   const requiredFields = [
//   //     "studentName",
//   //     "matricNumber",
//   //     "courseCode",
//   //     "selectedRep",
//   //     "deadline",
//   //   ];

//   //   // Validate required fields
//   //   for (const field of requiredFields) {
//   //     if (!formData[field]) {
//   //       toast.error(
//   //         `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
//   //       );
//   //       return;
//   //     }
//   //   }

//   //   if (
//   //     (selectedService === "printing" || selectedService === "print-bind") &&
//   //     !formData.handwrittenRequired &&
//   //     uploadedFiles.length === 0
//   //   ) {
//   //     toast.error("Please upload files or select handwritten option");
//   //     return;
//   //   }

//   //   if (
//   //     (selectedService === "complete-help" || selectedService === "custom") &&
//   //     !formData.assignmentQuestion
//   //   ) {
//   //     toast.error("Please provide assignment details");
//   //     return;
//   //   }

//   //   setIsSubmitting(true);

//   //   try {
//   //     const token = await getToken();
//   //     if (!token) {
//   //       toast.error("Session expired. Please login again.");
//   //       router.push("/auth/user-login");
//   //       return;
//   //     }

//   //     // Initialize Paystack payment
//   //     initializePayment({
//   //       onSuccess: async (response) => {
//   //         // Prepare order data
//   //         const orderData = {
//   //           serviceType: selectedService,
//   //           price: calculatePrice(),
//   //           details: {
//   //             ...formData,
//   //             repDetails: courseReps.find(
//   //               (rep) => rep.id === formData.selectedRep
//   //             ),
//   //             attachments: uploadedFiles.map((file) => file.name),
//   //           },
//   //           paymentReference: response.reference,
//   //         };

//   //         // Submit order to backend
//   //         const formDataToSend = new FormData();
//   //         formDataToSend.append("data", JSON.stringify(orderData));
//   //         uploadedFiles.forEach((file) => {
//   //           formDataToSend.append("files", file);
//   //         });

//   //         const res = await fetch("/api/orders", {
//   //           method: "POST",
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //           body: formDataToSend,
//   //         });

//   //         if (!res.ok) {
//   //           const errorData = await res.json();
//   //           throw new Error(errorData.error || "Failed to submit order");
//   //         }

//   //         const { orderId } = await res.json();
//   //         toast.success("Payment successful! Order created.");
//   //         router.push(`/student/orders/${orderId}/success`);
//   //       },
//   //       onClose: () => {
//   //         toast.warning("Payment was not completed");
//   //         setIsSubmitting(false);
//   //       },
//   //     });
//   //   } catch (error) {
//   //     console.error("Submission error:", error);
//   //     toast.error(error.message || "Order submission failed");
//   //     setIsSubmitting(false);
//   //   }
//   // };

// const handleSubmit = async () => {
//   // Validate required fields
//   const requiredFields = [
//     "studentName",
//     "matricNumber",
//     "courseCode",
//     "selectedRep",
//     "deadline",
//   ];

//   for (const field of requiredFields) {
//     if (!formData[field]) {
//       toast.error(
//         `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
//       );
//       return;
//     }
//   }

//   // Validate service-specific requirements
//   if (
//     (selectedService === "printing" || selectedService === "print-bind") &&
//     !formData.handwrittenRequired &&
//     uploadedFiles.length === 0
//   ) {
//     toast.error("Please upload files or select handwritten option");
//     return;
//   }

//   if (
//     (selectedService === "complete-help" || selectedService === "custom") &&
//     !formData.assignmentQuestion
//   ) {
//     toast.error("Please provide assignment details");
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const token = await getToken();
//     if (!token) {
//       toast.error("Session expired. Please login again.");
//       router.push("/auth/user-login");
//       return;
//     }

//     // Prepare the complete order data structure
//     const orderData = {
//       serviceType: selectedService,
//       price: calculatePrice(),
//       details: {
//         // Student information (always included)
//         studentName: formData.studentName,
//         matricNumber: formData.matricNumber,
//         courseCode: formData.courseCode,

//         // Printing-related fields (for print services)
//         ...((selectedService === "print-bind" ||
//           selectedService === "printing") && {
//           printType: formData.printType,
//           copies: formData.copies,
//           doubleSided: formData.doubleSided,
//           handwrittenRequired: formData.handwrittenRequired,
//           handwritingInstructions: formData.handwritingInstructions,
//           pages: formData.pages || 1, // Default to 1 if not specified
//         }),

//         // Binding-related fields (for binding services)
//         ...((selectedService === "print-bind" ||
//           selectedService === "binding") && {
//           bindingType: formData.bindingType,
//         }),

//         // Assignment-related fields (for complete help/custom)
//         ...((selectedService === "complete-help" ||
//           selectedService === "custom") && {
//           assignmentQuestion: formData.assignmentQuestion,
//           pages: formData.pages || 1,
//           formatting: formData.formatting,
//           urgency: formData.urgency,
//           deliveryFormat: formData.deliveryFormat,
//         }),

//         // Common fields
//         selectedRep: formData.selectedRep,
//         specialInstructions: formData.specialInstructions,
//         deadline: formData.deadline,
//         repDetails: courseReps.find((rep) => rep.id === formData.selectedRep),
//       },
//       attachments: uploadedFiles.map((file) => file.name),
//       paymentReference: `${new Date().getTime()}`,
//     };

//     // Prepare FormData for file uploads
//     const formDataToSend = new FormData();
//     formDataToSend.append("data", JSON.stringify(orderData));

//     // Add files if they exist
//     uploadedFiles.forEach((file) => {
//       formDataToSend.append("files", file);
//     });

//     // Initialize Paystack payment
//     initializePayment({
//       reference: orderData.paymentReference,
//       email: user?.email || "customer@example.com",
//       amount: orderData.price * 100, // in kobo
//       publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Service Type",
//             variable_name: "service_type",
//             value: selectedService,
//           },
//           {
//             display_name: "Matric Number",
//             variable_name: "matric_number",
//             value: formData.matricNumber,
//           },
//         ],
//       },
//       onSuccess: async (response) => {
//         try {
//           // Submit order to backend after successful payment
//           const res = await fetch("/api/orders", {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             body: formDataToSend,
//           });

//           if (!res.ok) {
//             const errorData = await res.json();
//             throw new Error(errorData.error || "Failed to submit order");
//           }

//           const { orderId } = await res.json();
//           toast.success("Payment successful! Order created.");
//           router.push(`/student/orders/${orderId}/success`);
//         } catch (error) {
//           console.error("Order submission error:", error);
//           toast.error(error.message || "Failed to create order after payment");
//           setIsSubmitting(false);
//         }
//       },
//       onClose: () => {
//         toast.warning("Payment was not completed");
//         setIsSubmitting(false);
//       },
//     });
//   } catch (error) {
//     console.error("Submission error:", error);
//     toast.error(error.message || "Order submission failed");
//     setIsSubmitting(false);
//   }
// };



//   // Helper function to normalize course codes
//   function normalizeCourseCode(code: string): string {
//     return code.replace(/\s+/g, "").toUpperCase();
//   }

//   // Helper function to find reps by course code
//   function findRepsByCourse(courseCode: string) {
//     if (!courseCode) return [];

//     const normalizedInput = normalizeCourseCode(courseCode);
//     return courseReps.filter((rep) =>
//       rep.courses.some(
//         (course) => normalizeCourseCode(course) === normalizedInput
//       )
//     );
//   }
 

//   const filteredReps = findRepsByCourse(formData.courseCode);
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-8 relative">
//           <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -z-10 rounded-full"></div>
//           {["Select", "Details", "Review"].map((label, index) => {
//             const stepIndex = ["select", "details", "review"].indexOf(step);
//             const isActive = index <= stepIndex;
//             return (
//               <div key={label} className="flex flex-col items-center z-10">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                     isActive
//                       ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200 shadow-sm"
//                       : "bg-white text-gray-400 border-2 border-gray-200"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span
//                   className={`mt-2 text-sm font-medium ${
//                     isActive ? "text-blue-600" : "text-gray-400"
//                   }`}
//                 >
//                   {label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         <AnimatePresence mode="wait">
//           {step === "select" && (
//             <motion.div
//               key="select"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               <div className="text-center">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Academic Services
//                 </h1>
//                 <p className="text-gray-500 mt-2">
//                   Select the service that matches your requirements
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {serviceTypes.map((service) => (
//                   <motion.div
//                     key={service.id}
//                     whileHover={{ y: -5 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
//                     onClick={() => {
//                       setSelectedService(service.id);
//                       setStep("details");
//                     }}
//                   >
//                     <div className="flex items-start gap-4">
//                       <span className="text-3xl">{service.icon}</span>
//                       <div>
//                         <h3 className="font-bold text-lg text-gray-900">
//                           {service.title}
//                         </h3>
//                         <p className="text-gray-600 mt-1 text-sm">
//                           {service.description}
//                         </p>
//                         <div className="mt-3 flex flex-wrap gap-2">
//                           {service.features.map((feature, i) => (
//                             <span
//                               key={i}
//                               className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                         </div>
//                         <div className="mt-4 text-lg font-semibold text-blue-600">
//                           Starting from ₦{service.basePrice.toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {step === "details" && selectedService && (
//             <motion.div
//               key="details"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setStep("select")}
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-gray-500" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {serviceTypes.find((s) => s.id === selectedService)?.title}
//                   </h1>
//                   <p className="text-gray-500 text-sm">
//                     Complete your order information
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                 <h2 className="font-semibold text-lg mb-4 text-gray-800">
//                   Student Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.studentName}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           studentName: e.target.value,
//                         })
//                       }
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Your full name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Matric Number *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.matricNumber}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           matricNumber: e.target.value,
//                         })
//                       }
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., 20/12345"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-5 relative">
//                   <label className="block font-medium text-gray-700 mb-2">
//                     Course Code *
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       value={formData.courseCode}
//                       onChange={(e) => {
//                         setFormData({
//                           ...formData,
//                           courseCode: e.target.value,
//                           selectedRep: "",
//                         });
//                       }}
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
//                       placeholder="e.g., CSC 101 or PHY101"
//                       list="courseSuggestions"
//                     />
//                     {formData.courseCode && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setFormData({
//                             ...formData,
//                             courseCode: "",
//                             selectedRep: "",
//                           });
//                         }}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     )}
//                   </div>

//                   {/* Course code validation feedback */}
//                   {formData.courseCode && filteredReps.length === 0 && (
//                     <p className="mt-2 text-sm text-red-600">
//                       No representatives found for {formData.courseCode}. Please
//                       check the course code.
//                     </p>
//                   )}

//                   {/* Course suggestions datalist */}
//                   <datalist id="courseSuggestions">
//                     {Array.from(
//                       new Set(courseReps.flatMap((rep) => rep.courses))
//                     ).map((course) => (
//                       <option key={course} value={course} />
//                     ))}
//                   </datalist>
//                 </div>
//               </div>

//               {(selectedService === "print-bind" ||
//                 selectedService === "printing") && (
//                 <>
//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                     <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
//                       <Printer className="w-5 h-5" /> Document Upload
//                     </h2>
//                     <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50">
//                       <div className="max-w-md mx-auto">
//                         <Upload
//                           className="w-10 h-10 mx-auto text-gray-400 mb-3"
//                           strokeWidth={1.5}
//                         />
//                         <h3 className="font-medium text-gray-900 mb-1">
//                           Upload Your Documents
//                         </h3>
//                         <p className="text-sm text-gray-500 mb-4">
//                           Supported formats: PDF, DOC, DOCX (Max 10MB each)
//                         </p>
//                         {formData.handwrittenRequired && (
//                           <p className="text-sm text-gray-500 mb-2 bg-blue-50 text-blue-600 p-2 rounded-lg">
//                             File upload is optional for handwritten assignments
//                           </p>
//                         )}
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           className="hidden"
//                           onChange={handleFileChange}
//                           multiple
//                           accept=".pdf,.doc,.docx"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => fileInputRef.current?.click()}
//                           className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 font-medium text-sm"
//                         >
//                           Select Files
//                         </button>
//                       </div>

//                       {uploadedFiles.length > 0 && (
//                         <div className="mt-6 space-y-3">
//                           {uploadedFiles.map((file, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
//                             >
//                               <div className="flex items-center">
//                                 <FileText className="h-5 w-5 text-gray-500 mr-3" />
//                                 <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
//                                   {file.name}
//                                 </span>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => removeFile(index)}
//                                 className="text-gray-400 hover:text-red-500 transition-colors"
//                               >
//                                 <X className="h-5 w-5" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                     <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
//                       <Printer className="w-5 h-5" /> Printing Options
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                       <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                           Print Type *
//                         </label>
//                         <div className="space-y-2">
//                           {printingOptions.map((option) => (
//                             <label
//                               key={option.id}
//                               className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer ${
//                                 formData.handwrittenRequired
//                                   ? "opacity-50 cursor-not-allowed border-gray-200"
//                                   : "hover:border-blue-500 border-gray-300"
//                               }`}
//                             >
//                               <input
//                                 type="radio"
//                                 name="printType"
//                                 value={option.id}
//                                 checked={formData.printType === option.id}
//                                 onChange={() => {
//                                   if (formData.handwrittenRequired) return;
//                                   setFormData({
//                                     ...formData,
//                                     printType: option.id,
//                                   });
//                                 }}
//                                 className="h-5 w-5 text-blue-600"
//                                 disabled={formData.handwrittenRequired}
//                               />
//                               <div>
//                                 <p className="font-medium">{option.label}</p>
//                                 <p className="text-sm text-gray-500">
//                                   {option.price > 0
//                                     ? `+₦${option.price.toLocaleString()}`
//                                     : "No extra charge"}
//                                 </p>
//                               </div>
//                             </label>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block font-medium text-gray-700 mb-2">
//                           Number of Copies *
//                         </label>
//                         <NumberInput
//                           value={formData.copies}
//                           onChange={(value) => {
//                             if (formData.handwrittenRequired) return;
//                             setFormData({ ...formData, copies: value });
//                           }}
//                           min={1}
//                           max={10}
//                           className="w-full"
//                           disabled={formData.handwrittenRequired}
//                         />
//                         <div className="mt-3 flex items-center">
//                           <input
//                             type="checkbox"
//                             id="doubleSided"
//                             checked={formData.doubleSided}
//                             onChange={(e) => {
//                               if (formData.handwrittenRequired) return;
//                               setFormData({
//                                 ...formData,
//                                 doubleSided: e.target.checked,
//                               });
//                             }}
//                             className={`h-4 w-4 text-blue-600 rounded ${
//                               formData.handwrittenRequired
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : ""
//                             }`}
//                             disabled={formData.handwrittenRequired}
//                           />
//                           <label
//                             htmlFor="doubleSided"
//                             className={`ml-2 text-sm ${
//                               formData.handwrittenRequired
//                                 ? "text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                           >
//                             Double-sided printing
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     {selectedService !== "printing" && (
//                       <div className="mt-6">
//                         <label className="flex items-center space-x-3">
//                           <input
//                             type="checkbox"
//                             checked={formData.handwrittenRequired}
//                             onChange={(e) => {
//                               const isChecked = e.target.checked;
//                               setFormData({
//                                 ...formData,
//                                 handwrittenRequired: isChecked,
//                                 printType: "bw",
//                                 copies: 1,
//                                 doubleSided: false,
//                                 bindingType: "spiral",
//                                 pages: isChecked ? formData.pages : 1,
//                               });
//                             }}
//                             className="h-5 w-5 text-blue-600 rounded"
//                           />
//                           <span className="font-medium text-gray-700">
//                             Lecturer requires handwritten submission on fullscap
//                             paper
//                           </span>
//                         </label>

//                         {formData.handwrittenRequired && (
//                           <div className="mt-4 ml-8 space-y-4">
//                             <div>
//                               <label className="block font-medium text-gray-700 mb-2">
//                                 Number of Pages *
//                               </label>
//                               <NumberInput
//                                 value={formData.pages}
//                                 onChange={(value) =>
//                                   setFormData({ ...formData, pages: value })
//                                 }
//                                 min={1}
//                                 className="w-full"
//                               />
//                               <p className="text-sm text-gray-500 mt-1">
//                                 Price: ₦500 (1st page) + ₦200 per additional
//                                 page
//                               </p>
//                             </div>

//                             <div>
//                               <label className="block font-medium text-gray-700 mb-2">
//                                 Handwriting Instructions
//                               </label>
//                               <textarea
//                                 value={formData.handwritingInstructions}
//                                 onChange={(e) =>
//                                   setFormData({
//                                     ...formData,
//                                     handwritingInstructions: e.target.value,
//                                   })
//                                 }
//                                 className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Any specific instructions for the handwritten version..."
//                                 rows={3}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {(selectedService === "print-bind" ||
//                 selectedService === "binding") && (
//                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                   <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
//                     <Bookmark className="w-5 h-5" /> Binding Options
//                   </h2>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Binding Type *
//                     </label>
//                     <div className="space-y-2">
//                       {bindingOptions.map((option) => (
//                         <label
//                           key={option.id}
//                           className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer ${
//                             formData.handwrittenRequired
//                               ? "opacity-50 cursor-not-allowed border-gray-200"
//                               : "hover:border-blue-500 border-gray-300"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="bindingType"
//                             value={option.id}
//                             checked={formData.bindingType === option.id}
//                             onChange={() => {
//                               if (formData.handwrittenRequired) return;
//                               setFormData({
//                                 ...formData,
//                                 bindingType: option.id,
//                               });
//                             }}
//                             className="h-5 w-5 text-blue-600"
//                             disabled={formData.handwrittenRequired}
//                           />
//                           <div>
//                             <p className="font-medium">{option.label}</p>
//                             <p className="text-sm text-gray-500">
//                               {option.price > 0
//                                 ? `+₦${option.price.toLocaleString()}`
//                                 : "No extra charge"}
//                             </p>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {selectedService === "complete-help" && (
//                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                   <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
//                     <PenTool className="w-5 h-5" /> Assignment Details
//                   </h2>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Assignment Question/Requirements *
//                     </label>
//                     <textarea
//                       value={formData.assignmentQuestion}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           assignmentQuestion: e.target.value,
//                         })
//                       }
//                       required
//                       rows={5}
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Paste the exact assignment question and requirements..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
//                     <div>
//                       <label className="block font-medium text-gray-700 mb-2">
//                         Number of Pages *
//                       </label>
//                       <NumberInput
//                         value={formData.pages}
//                         onChange={(value) =>
//                           setFormData({ ...formData, pages: value })
//                         }
//                         min={1}
//                         className="w-full"
//                       />
//                       <p className="text-sm text-gray-500 mt-1">
//                         Price: ₦200 per page (Total: ₦{formData.pages * 200})
//                       </p>
//                     </div>
//                     <div>
//                       <label className="block font-medium text-gray-700 mb-2">
//                         Formatting Style
//                       </label>
//                       <select
//                         value={formData.formatting}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             formatting: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Select formatting style</option>
//                         <option value="APA">
//                           APA Style (Standard for Mass Comm)
//                         </option>
//                         <option value="MLA">
//                           MLA Style (For media analysis papers)
//                         </option>
//                         <option value="Chicago">Chicago/Turabian Style</option>
//                         <option value="Harvard">
//                           Harvard Style (Some departments)
//                         </option>
//                         <option value="NUN">
//                           Nigerian University Norms (House Style)
//                         </option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="mt-5">
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Urgency *
//                     </label>
//                     <div className="grid grid-cols-2 gap-3">
//                       {urgencyOptions.map((option) => (
//                         <div
//                           key={option.id}
//                           onClick={() =>
//                             setFormData({
//                               ...formData,
//                               urgency: option.id,
//                             })
//                           }
//                           className={`p-4 border rounded-xl cursor-pointer transition-colors ${
//                             formData.urgency === option.id
//                               ? "border-blue-500 bg-blue-50"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           <div className="flex items-center">
//                             <div
//                               className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
//                                 formData.urgency === option.id
//                                   ? "border-blue-500 bg-blue-500"
//                                   : "border-gray-400"
//                               }`}
//                             >
//                               {formData.urgency === option.id && (
//                                 <div className="w-2 h-2 bg-white rounded-full"></div>
//                               )}
//                             </div>
//                             <span className="font-medium">{option.label}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mt-5">
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Delivery Format *
//                     </label>
//                     <div className="space-y-3">
//                       <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="deliveryFormat"
//                           value="handwritten"
//                           checked={formData.deliveryFormat === "handwritten"}
//                           onChange={() =>
//                             setFormData({
//                               ...formData,
//                               deliveryFormat: "handwritten",
//                             })
//                           }
//                           className="h-5 w-5 text-blue-600"
//                         />
//                         <div>
//                           <p className="font-medium">
//                             Handwritten on Fullscap Paper
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             We&apos;ll write the assignment by hand on fullscap
//                             paper
//                           </p>
//                         </div>
//                       </label>
//                       <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="deliveryFormat"
//                           value="printed-bound"
//                           checked={formData.deliveryFormat === "printed-bound"}
//                           onChange={() =>
//                             setFormData({
//                               ...formData,
//                               deliveryFormat: "printed-bound",
//                             })
//                           }
//                           className="h-5 w-5 text-blue-600"
//                         />
//                         <div>
//                           <p className="font-medium">
//                             Printed & Bound (+₦1,000)
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Professionally printed and bound assignment
//                           </p>
//                         </div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {selectedService === "custom" && (
//                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                   <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
//                     <Zap className="w-5 h-5" /> Custom Request Details
//                   </h2>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Request Details *
//                     </label>
//                     <textarea
//                       value={formData.assignmentQuestion}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           assignmentQuestion: e.target.value,
//                         })
//                       }
//                       required
//                       rows={5}
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Describe your custom request in detail..."
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Urgency *
//                     </label>
//                     <div className="grid grid-cols-2 gap-3">
//                       {urgencyOptions.map((option) => (
//                         <div
//                           key={option.id}
//                           onClick={() =>
//                             setFormData({
//                               ...formData,
//                               urgency: option.id,
//                             })
//                           }
//                           className={`p-4 border rounded-xl cursor-pointer transition-colors ${
//                             formData.urgency === option.id
//                               ? "border-blue-500 bg-blue-50"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           <div className="flex items-center">
//                             <div
//                               className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
//                                 formData.urgency === option.id
//                                   ? "border-blue-500 bg-blue-500"
//                                   : "border-gray-400"
//                               }`}
//                             >
//                               {formData.urgency === option.id && (
//                                 <div className="w-2 h-2 bg-white rounded-full"></div>
//                               )}
//                             </div>
//                             <span className="font-medium">{option.label}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                 <h2 className="font-semibold text-lg mb-4 text-gray-800">
//                   Submission Details
//                 </h2>

//                 <div className="space-y-5">
//                   <div className="mt-5">
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Course Representative *
//                     </label>

//                     {filteredReps.length > 0 ? (
//                       <div className="space-y-3">
//                         {filteredReps.map((rep) => (
//                           <div
//                             key={rep.id}
//                             onClick={() =>
//                               setFormData({ ...formData, selectedRep: rep.id })
//                             }
//                             className={`p-4 border rounded-xl cursor-pointer transition-colors ${
//                               formData.selectedRep === rep.id
//                                 ? "border-blue-500 bg-blue-50"
//                                 : "border-gray-300 hover:border-gray-400"
//                             }`}
//                           >
//                             <div className="flex items-start">
//                               <div
//                                 className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
//                                   formData.selectedRep === rep.id
//                                     ? "border-blue-500 bg-blue-500"
//                                     : "border-gray-400"
//                                 }`}
//                               >
//                                 {formData.selectedRep === rep.id && (
//                                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                                 )}
//                               </div>
//                               <div>
//                                 <h4 className="font-medium text-gray-900">
//                                   {rep.name}
//                                 </h4>
//                                 <p className="text-sm text-gray-600 mt-1">
//                                   <span className="font-medium">Courses:</span>{" "}
//                                   {rep.courses.join(", ")}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Contact:</span>{" "}
//                                   {rep.phone} | {rep.email}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Location:</span>{" "}
//                                   {rep.location}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-center">
//                         <p className="text-gray-500">
//                           {formData.courseCode
//                             ? "No representatives found for this course"
//                             : "Enter a course code to see available representatives"}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mt-4">
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Submission Deadline *
//                     </label>
//                     <input
//                       type="datetime-local"
//                       required
//                       value={formData.deadline}
//                       onChange={(e) => {
//                         setFormData({ ...formData, deadline: e.target.value });

//                         const deadlineDate = new Date(e.target.value);
//                         const now = new Date();
//                         const hoursLeft =
//                           (deadlineDate - now) / (1000 * 60 * 60);

//                         setIsUrgent(hoursLeft < 24);
//                       }}
//                       min={new Date().toISOString().slice(0, 16)}
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />

//                     {isUrgent && (
//                       <div className="mt-2 text-sm bg-yellow-50 border-l-4 border-yellow-400 p-2">
//                         <p className="font-medium text-yellow-700">
//                           ⚠️ Urgent order! A +30% fee will apply.
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-2">
//                       Special Instructions
//                     </label>
//                     <textarea
//                       value={formData.specialInstructions}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           specialInstructions: e.target.value,
//                         })
//                       }
//                       rows={3}
//                       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Any special instructions or requirements..."
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setStep("select")}
//                   className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const requiredFields = [
//                       "studentName",
//                       "matricNumber",
//                       "courseCode",
//                       "selectedRep",
//                       "deadline",
//                     ];

//                     if (
//                       (selectedService === "print-bind" ||
//                         selectedService === "printing") &&
//                       uploadedFiles.length === 0 &&
//                       !formData.handwrittenRequired
//                     ) {
//                       toast.error("Please upload at least one file");
//                       return;
//                     }

//                     if (
//                       (selectedService === "complete-help" ||
//                         selectedService === "custom") &&
//                       !formData.assignmentQuestion
//                     ) {
//                       toast.error("Please provide assignment details");
//                       return;
//                     }

//                     for (const field of requiredFields) {
//                       if (!formData[field]) {
//                         toast.error(`Please fill in all required fields`);
//                         return;
//                       }
//                     }
//                     setStep("review");
//                   }}
//                   className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center shadow-sm shadow-blue-200"
//                 >
//                   Continue to Review <ArrowRight className="ml-2 w-5 h-5" />
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {step === "review" && (
//             <motion.div
//               key="review"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setStep("details")}
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-gray-500" />
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     Review Your Order
//                   </h1>
//                   <p className="text-gray-500 text-sm">
//                     Confirm all details before submission
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                 <h2 className="font-semibold text-lg mb-5 text-gray-800">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-5">
//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Service:</span>
//                     <span className="font-medium text-gray-900 capitalize">
//                       {
//                         serviceTypes.find((s) => s.id === selectedService)
//                           ?.title
//                       }
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Student Name:</span>
//                     <span className="font-medium text-gray-900">
//                       {formData.studentName}
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Matric Number:</span>
//                     <span className="font-medium text-gray-900">
//                       {formData.matricNumber}
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Course Code:</span>
//                     <span className="font-medium text-gray-900">
//                       {formData.courseCode}
//                     </span>
//                   </div>

//                   {(selectedService === "print-bind" ||
//                     selectedService === "printing" ||
//                     selectedService === "binding") && (
//                     <div className="flex justify-between pb-3 border-b border-gray-100">
//                       <span className="text-gray-600">Files to Print:</span>
//                       <span className="font-medium text-gray-900">
//                         {uploadedFiles.length} file(s)
//                         {formData.handwrittenRequired &&
//                           " (Optional for handwritten)"}
//                       </span>
//                     </div>
//                   )}

//                   {(selectedService === "print-bind" ||
//                     selectedService === "printing") && (
//                     <>
//                       {!formData.handwrittenRequired && (
//                         <>
//                           <div className="flex justify-between pb-3 border-b border-gray-100">
//                             <span className="text-gray-600">Print Type:</span>
//                             <span className="font-medium text-gray-900">
//                               {
//                                 printingOptions.find(
//                                   (opt) => opt.id === formData.printType
//                                 )?.label
//                               }
//                             </span>
//                           </div>
//                           <div className="flex justify-between pb-3 border-b border-gray-100">
//                             <span className="text-gray-600">Copies:</span>
//                             <span className="font-medium text-gray-900">
//                               {formData.copies}
//                             </span>
//                           </div>
//                           <div className="flex justify-between pb-3 border-b border-gray-100">
//                             <span className="text-gray-600">Double-sided:</span>
//                             <span className="font-medium text-gray-900">
//                               {formData.doubleSided ? "Yes" : "No"}
//                             </span>
//                           </div>
//                         </>
//                       )}
//                       {formData.handwrittenRequired && (
//                         <>
//                           <div className="flex justify-between pb-3 border-b border-gray-100">
//                             <span className="text-gray-600">
//                               Handwritten Required:
//                             </span>
//                             <span className="font-medium text-gray-900">
//                               Yes ({formData.pages} pages)
//                             </span>
//                           </div>
//                           <div className="flex justify-between pb-3 border-b border-gray-100">
//                             <span className="text-gray-600">
//                               Handwriting Cost:
//                             </span>
//                             <span className="font-medium text-gray-900">
//                               ₦500 + {formData.pages - 1} × ₦200 = ₦
//                               {500 + (formData.pages - 1) * 200}
//                             </span>
//                           </div>
//                           {formData.handwritingInstructions && (
//                             <div className="flex justify-between pb-3 border-b border-gray-100">
//                               <span className="text-gray-600">
//                                 Handwriting Instructions:
//                               </span>
//                               <span className="font-medium text-gray-900 max-w-xs text-right">
//                                 {formData.handwritingInstructions.length > 50
//                                   ? `${formData.handwritingInstructions.substring(
//                                       0,
//                                       50
//                                     )}...`
//                                   : formData.handwritingInstructions}
//                               </span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   )}

//                   {(selectedService === "print-bind" ||
//                     selectedService === "binding") && (
//                     <div className="flex justify-between pb-3 border-b border-gray-100">
//                       <span className="text-gray-600">Binding:</span>
//                       <span className="font-medium text-gray-900">
//                         {formData.handwrittenRequired
//                           ? "Not applicable (handwritten submission)"
//                           : bindingOptions.find(
//                               (opt) => opt.id === formData.bindingType
//                             )?.label}
//                       </span>
//                     </div>
//                   )}

//                   {(selectedService === "complete-help" ||
//                     selectedService === "custom") && (
//                     <div className="flex justify-between pb-3 border-b border-gray-100">
//                       <span className="text-gray-600">
//                         {selectedService === "complete-help"
//                           ? "Assignment Question"
//                           : "Request Details"}
//                       </span>
//                       <span className="font-medium text-gray-900 max-w-xs text-right">
//                         {formData.assignmentQuestion.length > 50
//                           ? `${formData.assignmentQuestion.substring(0, 50)}...`
//                           : formData.assignmentQuestion}
//                       </span>
//                     </div>
//                   )}

//                   {selectedService === "complete-help" && (
//                     <>
//                       <div className="flex justify-between pb-3 border-b border-gray-100">
//                         <span className="text-gray-600">Pages:</span>
//                         <span className="font-medium text-gray-900">
//                           {formData.pages}
//                         </span>
//                       </div>
//                       {formData.formatting && (
//                         <div className="flex justify-between pb-3 border-b border-gray-100">
//                           <span className="text-gray-600">Formatting:</span>
//                           <span className="font-medium text-gray-900">
//                             {formData.formatting}
//                           </span>
//                         </div>
//                       )}
//                       <div className="flex justify-between pb-3 border-b border-gray-100">
//                         <span className="text-gray-600">Urgency:</span>
//                         <span className="font-medium text-gray-900 capitalize">
//                           {formData.urgency}{" "}
//                           <span className="font-medium text-gray-900">
//                             {
//                               urgencyOptions.find(
//                                 (u) => u.id === formData.urgency
//                               )?.label
//                             }
//                           </span>
//                         </span>
//                       </div>
//                       <div className="flex justify-between pb-3 border-b border-gray-100">
//                         <span className="text-gray-600">Delivery Format:</span>
//                         <span className="font-medium text-gray-900">
//                           {formData.deliveryFormat === "handwritten"
//                             ? "Handwritten on Fullscap"
//                             : "Printed & Bound"}
//                         </span>
//                       </div>
//                     </>
//                   )}

//                   {selectedService === "custom" && (
//                     <div className="flex justify-between pb-3 border-b border-gray-100">
//                       <span className="text-gray-600">Urgency:</span>
//                       <span className="font-medium text-gray-900 capitalize">
//                         {formData.urgency}{" "}
//                         {formData.urgency === "urgent" && "(1-3 days)"}
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Course Rep:</span>
//                     <span className="font-medium text-gray-900">
//                       {
//                         courseReps.find((r) => r.id === formData.selectedRep)
//                           ?.name
//                       }
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Rep Contact:</span>
//                     <span className="font-medium text-gray-900">
//                       {
//                         courseReps.find((r) => r.id === formData.selectedRep)
//                           ?.phone
//                       }
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Submission Location:</span>
//                     <span className="font-medium text-gray-900">
//                       {
//                         courseReps.find((r) => r.id === formData.selectedRep)
//                           ?.location
//                       }
//                     </span>
//                   </div>

//                   <div className="flex justify-between pb-3 border-b border-gray-100">
//                     <span className="text-gray-600">Deadline:</span>
//                     <span className="font-medium text-gray-900">
//                       {new Date(formData.deadline).toLocaleString()}
//                     </span>
//                   </div>

//                   {formData.specialInstructions && (
//                     <div className="flex justify-between pb-3 border-b border-gray-100">
//                       <span className="text-gray-600">
//                         Special Instructions:
//                       </span>
//                       <span className="font-medium text-gray-900 max-w-xs text-right">
//                         {formData.specialInstructions.length > 50
//                           ? `${formData.specialInstructions.substring(
//                               0,
//                               50
//                             )}...`
//                           : formData.specialInstructions}
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center pt-4">
//                     <span className="text-lg font-medium text-gray-700">
//                       Total:
//                     </span>
//                     <div className="flex items-center">
//                       <span className="text-3xl font-bold text-blue-600">
//                         ₦{calculatePrice().toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setStep("details")}
//                   className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className={`px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center shadow-sm shadow-blue-200 ${
//                     isSubmitting ? "opacity-80 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="animate-spin mr-2 w-5 h-5" />
//                       Processing...
//                     </>
//                   ) : (
//                     "Submit Order"
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }














"use client";
import { useState, useRef, useEffect } from "react"; // Added useEffect
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  ChevronLeft,
  Loader2,
  ArrowRight,
  Printer,
  Bookmark,
  PenTool,
  Zap,
  Plus,
  Minus,
} from "lucide-react";
import { courseReps } from "@/data/courseReps";
import { useAuth } from "@/context/AuthContext";

// Service types, options, and NumberInput component remain unchanged
const serviceTypes = [
  {
    id: "complete-help",
    title: "Complete Assignment Help",
    description: "Full-service solution from research to submission",
    icon: "🧠",
    features: ["Research", "Writing", "Formatting", "Printing", "Binding"],
    basePrice: 1950,
  },
  {
    id: "print-bind",
    title: "Print & Bind / Hand Written Assignment Only",
    description: "Professional writing of your assign / printing and binding",
    icon: "🖨️",
    features: ["High-quality printing", "Spiral binding"],
    basePrice: 550,
  },
  {
    id: "printing",
    title: "Printing Only",
    description: "Quick and reliable document printing",
    icon: "📄",
    features: ["Multiple copies", "Color/B&W options", "Various paper types"],
    basePrice: 400,
  },
  {
    id: "binding",
    title: "Binding Only",
    description: "Professional document binding services",
    icon: "📚",
    features: ["Spiral binding", "Thermal binding"],
    basePrice: 300,
  },
  {
    id: "custom",
    title: "Custom Request",
    description: "Tailored solutions for unique needs",
    icon: "✨",
    features: ["Personalized service", "Flexible options", "Special requests"],
    basePrice: 3000,
  },
];

const printingOptions = [
  { id: "color", label: "Color Printing", price: 800 },
  { id: "bw", label: "Black & White", price: 0 },
];

const bindingOptions = [
  { id: "spiral", label: "Spiral Binding", price: 1000 },
  { id: "thermal", label: "Thermal Binding", price: 500 },
];

const urgencyOptions = [
  { id: "standard", label: "Standard (2-3 days)", multiplier: 1 },
  { id: "urgent", label: "Urgent (24 hours) +20%", multiplier: 1.4 },
];

const NumberInput = ({
  value,
  onChange,
  min = 1,
  max = 100,
  className = "",
  disabled = false,
}) => {
  const handleIncrement = () => {
    if (!disabled && value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (!disabled && value > min) onChange(value - 1);
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) onChange(newValue);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-xl overflow-hidden ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function AssignmentHelpPage() {
  const { getToken, user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"select" | "details" | "review">("select");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  const [formData, setFormData] = useState({
    studentName: "",
    matricNumber: "",
    courseCode: "",
    printType: "bw",
    copies: 1,
    doubleSided: false,
    handwrittenRequired: false,
    handwritingInstructions: "",
    bindingType: "spiral",
    assignmentQuestion: "",
    pages: 1,
    formatting: "",
    urgency: "standard",
    deliveryFormat: "handwritten",
    selectedRep: "",
    specialInstructions: "",
    deadline: "",
  });

  // Ensure code runs only on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const calculatePrice = () => {
    if (!selectedService) return 0;

    const service = serviceTypes.find((s) => s.id === selectedService);
    let price = service?.basePrice || 0;

    if (selectedService === "print-bind" || selectedService === "printing") {
      if (formData.handwrittenRequired) {
        return price + 500 + (formData.pages - 1) * 200;
      }

      if (selectedService === "printing") {
        price = 400;
        if (formData.printType === "color") {
          price += 800 * formData.copies;
        } else {
          price += 200 * (formData.copies - 1);
        }
      } else {
        if (formData.printType === "color") {
          price += 800 * formData.copies;
        } else if (formData.copies > 1) {
          price += 200 * (formData.copies - 1);
        }
      }
    }

    if (selectedService === "print-bind" || selectedService === "binding") {
      if (!formData.handwrittenRequired) {
        const bindingOption = bindingOptions.find(
          (opt) => opt.id === formData.bindingType
        );
        price += bindingOption?.price || 0;
      }
    }

    if (selectedService === "complete-help") {
      price += formData.pages * 200;
      const urgency = urgencyOptions.find((u) => u.id === formData.urgency);
      price *= urgency?.multiplier || 1;
      if (formData.deliveryFormat === "printed-bound") price += 1000;
    }

    if (selectedService === "custom") {
      price += Math.min(
        Math.floor(formData.assignmentQuestion.length / 100) * 500,
        5000
      );
      const urgency = urgencyOptions.find((u) => u.id === formData.urgency);
      price *= urgency?.multiplier || 1;
    }

    if (
      (selectedService === "print-bind" ||
        selectedService === "printing" ||
        selectedService === "binding") &&
      formData.deadline
    ) {
      const deadlineDate = new Date(formData.deadline);
      const now = new Date();
      const hoursDiff =
        (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursDiff < 24) price *= 1.3;
    }

    return Math.round(price);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "studentName",
      "matricNumber",
      "courseCode",
      "selectedRep",
      "deadline",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return;
      }
    }

    if (
      (selectedService === "printing" || selectedService === "print-bind") &&
      !formData.handwrittenRequired &&
      uploadedFiles.length === 0
    ) {
      toast.error("Please upload files or select handwritten option");
      return;
    }

    if (
      (selectedService === "complete-help" || selectedService === "custom") &&
      !formData.assignmentQuestion
    ) {
      toast.error("Please provide assignment details");
      return;
    }

    if (!isClient) {
      toast.error("Payment functionality is only available in the browser");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Session expired. Please login again.");
        router.push("/auth/user-login");
        return;
      }

      const orderData = {
        serviceType: selectedService,
        price: calculatePrice(),
        details: {
          studentName: formData.studentName,
          matricNumber: formData.matricNumber,
          courseCode: formData.courseCode,
          ...((selectedService === "print-bind" ||
            selectedService === "printing") && {
            printType: formData.printType,
            copies: formData.copies,
            doubleSided: formData.doubleSided,
            handwrittenRequired: formData.handwrittenRequired,
            handwritingInstructions: formData.handwritingInstructions,
            pages: formData.pages || 1,
          }),
          ...((selectedService === "print-bind" ||
            selectedService === "binding") && {
            bindingType: formData.bindingType,
          }),
          ...((selectedService === "complete-help" ||
            selectedService === "custom") && {
            assignmentQuestion: formData.assignmentQuestion,
            pages: formData.pages || 1,
            formatting: formData.formatting,
            urgency: formData.urgency,
            deliveryFormat: formData.deliveryFormat,
          }),
          selectedRep: formData.selectedRep,
          specialInstructions: formData.specialInstructions,
          deadline: formData.deadline,
          repDetails: courseReps.find((rep) => rep.id === formData.selectedRep),
        },
        attachments: uploadedFiles.map((file) => file.name),
        paymentReference: `${new Date().getTime()}`,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(orderData));
      uploadedFiles.forEach((file) => {
        formDataToSend.append("files", file);
      });

      // Dynamically import and use Paystack inside handleSubmit
      const { usePaystackPayment } = await import("react-paystack");
      const initializePayment = usePaystackPayment({
        reference: orderData.paymentReference,
        email: user?.email || "customer@example.com",
        amount: orderData.price * 100, // in kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      });

      initializePayment({
        onSuccess: async (response) => {
          try {
            const res = await fetch("/api/orders", {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formDataToSend,
            });

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error || "Failed to submit order");
            }

            const { orderId } = await res.json();
            toast.success("Payment successful! Order created.");
            router.push(`/student/orders/${orderId}/success`);
          } catch (error) {
            console.error("Order submission error:", error);
            toast.error(
              error.message || "Failed to create order after payment"
            );
            setIsSubmitting(false);
          }
        },
        onClose: () => {
          toast.warning("Payment was not completed");
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Order submission failed");
      setIsSubmitting(false);
    }
  };

  function normalizeCourseCode(code: string): string {
    return code.replace(/\s+/g, "").toUpperCase();
  }

  function findRepsByCourse(courseCode: string) {
    if (!courseCode) return [];
    const normalizedInput = normalizeCourseCode(courseCode);
    return courseReps.filter((rep) =>
      rep.courses.some(
        (course) => normalizeCourseCode(course) === normalizedInput
      )
    );
  }

  const filteredReps = findRepsByCourse(formData.courseCode);

  // JSX remains unchanged from your previous version
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -z-10 rounded-full"></div>
          {["Select", "Details", "Review"].map((label, index) => {
            const stepIndex = ["select", "details", "review"].indexOf(step);
            const isActive = index <= stepIndex;
            return (
              <div key={label} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200 shadow-sm"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Academic Services
                </h1>
                <p className="text-gray-500 mt-2">
                  Select the service that matches your requirements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {serviceTypes.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
                    onClick={() => {
                      setSelectedService(service.id);
                      setStep("details");
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          {service.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.features.map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 text-lg font-semibold text-blue-600">
                          Starting from ₦{service.basePrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "details" && selectedService && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep("select")}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {serviceTypes.find((s) => s.id === selectedService)?.title}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Complete your order information
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-lg mb-4 text-gray-800">
                  Student Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Matric Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.matricNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          matricNumber: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 20/12345"
                    />
                  </div>
                </div>

                <div className="mt-5 relative">
                  <label className="block font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.courseCode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          courseCode: e.target.value,
                          selectedRep: "",
                        });
                      }}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="e.g., CSC 101 or PHY101"
                      list="courseSuggestions"
                    />
                    {formData.courseCode && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            courseCode: "",
                            selectedRep: "",
                          });
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {formData.courseCode && filteredReps.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      No representatives found for {formData.courseCode}. Please
                      check the course code.
                    </p>
                  )}

                  <datalist id="courseSuggestions">
                    {Array.from(
                      new Set(courseReps.flatMap((rep) => rep.courses))
                    ).map((course) => (
                      <option key={course} value={course} />
                    ))}
                  </datalist>
                </div>
              </div>

              {(selectedService === "print-bind" ||
                selectedService === "printing") && (
                <>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                      <Printer className="w-5 h-5" /> Document Upload
                    </h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50">
                      <div className="max-w-md mx-auto">
                        <Upload
                          className="w-10 h-10 mx-auto text-gray-400 mb-3"
                          strokeWidth={1.5}
                        />
                        <h3 className="font-medium text-gray-900 mb-1">
                          Upload Your Documents
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Supported formats: PDF, DOC, DOCX (Max 10MB each)
                        </p>
                        {formData.handwrittenRequired && (
                          <p className="text-sm text-gray-500 mb-2 bg-blue-50 text-blue-600 p-2 rounded-lg">
                            File upload is optional for handwritten assignments
                          </p>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                          accept=".pdf,.doc,.docx"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 font-medium text-sm"
                        >
                          Select Files
                        </button>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-6 space-y-3">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-500 mr-3" />
                                <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                      <Printer className="w-5 h-5" /> Printing Options
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          Print Type *
                        </label>
                        <div className="space-y-2">
                          {printingOptions.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer ${
                                formData.handwrittenRequired
                                  ? "opacity-50 cursor-not-allowed border-gray-200"
                                  : "hover:border-blue-500 border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="printType"
                                value={option.id}
                                checked={formData.printType === option.id}
                                onChange={() => {
                                  if (formData.handwrittenRequired) return;
                                  setFormData({
                                    ...formData,
                                    printType: option.id,
                                  });
                                }}
                                className="h-5 w-5 text-blue-600"
                                disabled={formData.handwrittenRequired}
                              />
                              <div>
                                <p className="font-medium">{option.label}</p>
                                <p className="text-sm text-gray-500">
                                  {option.price > 0
                                    ? `+₦${option.price.toLocaleString()}`
                                    : "No extra charge"}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          Number of Copies *
                        </label>
                        <NumberInput
                          value={formData.copies}
                          onChange={(value) => {
                            if (formData.handwrittenRequired) return;
                            setFormData({ ...formData, copies: value });
                          }}
                          min={1}
                          max={10}
                          className="w-full"
                          disabled={formData.handwrittenRequired}
                        />
                        <div className="mt-3 flex items-center">
                          <input
                            type="checkbox"
                            id="doubleSided"
                            checked={formData.doubleSided}
                            onChange={(e) => {
                              if (formData.handwrittenRequired) return;
                              setFormData({
                                ...formData,
                                doubleSided: e.target.checked,
                              });
                            }}
                            className={`h-4 w-4 text-blue-600 rounded ${
                              formData.handwrittenRequired
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={formData.handwrittenRequired}
                          />
                          <label
                            htmlFor="doubleSided"
                            className={`ml-2 text-sm ${
                              formData.handwrittenRequired
                                ? "text-gray-400"
                                : "text-gray-700"
                            }`}
                          >
                            Double-sided printing
                          </label>
                        </div>
                      </div>
                    </div>

                    {selectedService !== "printing" && (
                      <div className="mt-6">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.handwrittenRequired}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setFormData({
                                ...formData,
                                handwrittenRequired: isChecked,
                                printType: "bw",
                                copies: 1,
                                doubleSided: false,
                                bindingType: "spiral",
                                pages: isChecked ? formData.pages : 1,
                              });
                            }}
                            className="h-5 w-5 text-blue-600 rounded"
                          />
                          <span className="font-medium text-gray-700">
                            Lecturer requires handwritten submission on fullscap
                            paper
                          </span>
                        </label>

                        {formData.handwrittenRequired && (
                          <div className="mt-4 ml-8 space-y-4">
                            <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                Number of Pages *
                              </label>
                              <NumberInput
                                value={formData.pages}
                                onChange={(value) =>
                                  setFormData({ ...formData, pages: value })
                                }
                                min={1}
                                className="w-full"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Price: ₦500 (1st page) + ₦200 per additional
                                page
                              </p>
                            </div>

                            <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                Handwriting Instructions
                              </label>
                              <textarea
                                value={formData.handwritingInstructions}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    handwritingInstructions: e.target.value,
                                  })
                                }
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any specific instructions for the handwritten version..."
                                rows={3}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {(selectedService === "print-bind" ||
                selectedService === "binding") && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <Bookmark className="w-5 h-5" /> Binding Options
                  </h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Binding Type *
                    </label>
                    <div className="space-y-2">
                      {bindingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer ${
                            formData.handwrittenRequired
                              ? "opacity-50 cursor-not-allowed border-gray-200"
                              : "hover:border-blue-500 border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="bindingType"
                            value={option.id}
                            checked={formData.bindingType === option.id}
                            onChange={() => {
                              if (formData.handwrittenRequired) return;
                              setFormData({
                                ...formData,
                                bindingType: option.id,
                              });
                            }}
                            className="h-5 w-5 text-blue-600"
                            disabled={formData.handwrittenRequired}
                          />
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-gray-500">
                              {option.price > 0
                                ? `+₦${option.price.toLocaleString()}`
                                : "No extra charge"}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedService === "complete-help" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <PenTool className="w-5 h-5" /> Assignment Details
                  </h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Assignment Question/Requirements *
                    </label>
                    <textarea
                      value={formData.assignmentQuestion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignmentQuestion: e.target.value,
                        })
                      }
                      required
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paste the exact assignment question and requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Number of Pages *
                      </label>
                      <NumberInput
                        value={formData.pages}
                        onChange={(value) =>
                          setFormData({ ...formData, pages: value })
                        }
                        min={1}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Price: ₦200 per page (Total: ₦{formData.pages * 200})
                      </p>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Formatting Style
                      </label>
                      <select
                        value={formData.formatting}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            formatting: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-xl focus peer:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select formatting style</option>
                        <option value="APA">
                          APA Style (Standard for Mass Comm)
                        </option>
                        <option value="MLA">
                          MLA Style (For media analysis papers)
                        </option>
                        <option value="Chicago">Chicago/Turabian Style</option>
                        <option value="Harvard">
                          Harvard Style (Some departments)
                        </option>
                        <option value="NUN">
                          Nigerian University Norms (House Style)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block font-medium text-gray-700 mb-2">
                      Urgency *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {urgencyOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              urgency: option.id,
                            })
                          }
                          className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                            formData.urgency === option.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                formData.urgency === option.id
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-400"
                              }`}
                            >
                              {formData.urgency === option.id && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block font-medium text-gray-700 mb-2">
                      Delivery Format *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryFormat"
                          value="handwritten"
                          checked={formData.deliveryFormat === "handwritten"}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              deliveryFormat: "handwritten",
                            })
                          }
                          className="h-5 w-5 text-blue-600"
                        />
                        <div>
                          <p className="font-medium">
                            Handwritten on Fullscap Paper
                          </p>
                          <p className="text-sm text-gray-500">
                            We'll write the assignment by hand on fullscap paper
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryFormat"
                          value="printed-bound"
                          checked={formData.deliveryFormat === "printed-bound"}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              deliveryFormat: "printed-bound",
                            })
                          }
                          className="h-5 w-5 text-blue-600"
                        />
                        <div>
                          <p className="font-medium">
                            Printed & Bound (+₦1,000)
                          </p>
                          <p className="text-sm text-gray-500">
                            Professionally printed and bound assignment
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === "custom" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Custom Request Details
                  </h2>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Request Details *
                    </label>
                    <textarea
                      value={formData.assignmentQuestion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignmentQuestion: e.target.value,
                        })
                      }
                      required
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your custom request in detail..."
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block font-medium text-gray-700 mb-2">
                      Urgency *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {urgencyOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              urgency: option.id,
                            })
                          }
                          className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                            formData.urgency === option.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                formData.urgency === option.id
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-400"
                              }`}
                            >
                              {formData.urgency === option.id && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-lg mb-4 text-gray-800">
                  Submission Details
                </h2>

                <div className="space-y-5">
                  <div className="mt-5">
                    <label className="block font-medium text-gray-700 mb-2">
                      Course Representative *
                    </label>

                    {filteredReps.length > 0 ? (
                      <div className="space-y-3">
                        {filteredReps.map((rep) => (
                          <div
                            key={rep.id}
                            onClick={() =>
                              setFormData({ ...formData, selectedRep: rep.id })
                            }
                            className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                              formData.selectedRep === rep.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                                  formData.selectedRep === rep.id
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-400"
                                }`}
                              >
                                {formData.selectedRep === rep.id && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {rep.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Courses:</span>{" "}
                                  {rep.courses.join(", ")}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Contact:</span>{" "}
                                  {rep.phone} | {rep.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Location:</span>{" "}
                                  {rep.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <p className="text-gray-500">
                          {formData.courseCode
                            ? "No representatives found for this course"
                            : "Enter a course code to see available representatives"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block font-medium text-gray-700 mb-2">
                      Submission Deadline *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.deadline}
                      onChange={(e) => {
                        setFormData({ ...formData, deadline: e.target.value });
                        const deadlineDate = new Date(e.target.value);
                        const now = new Date();
                        const hoursLeft =
                          (deadlineDate - now) / (1000 * 60 * 60);
                        setIsUrgent(hoursLeft < 24);
                      }}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {isUrgent && (
                      <div className="mt-2 text-sm bg-yellow-50 border-l-4 border-yellow-400 p-2">
                        <p className="font-medium text-yellow-700">
                          ⚠️ Urgent order! A +30% fee will apply.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={formData.specialInstructions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialInstructions: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any special instructions or requirements..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const requiredFields = [
                      "studentName",
                      "matricNumber",
                      "courseCode",
                      "selectedRep",
                      "deadline",
                    ];

                    if (
                      (selectedService === "print-bind" ||
                        selectedService === "printing") &&
                      uploadedFiles.length === 0 &&
                      !formData.handwrittenRequired
                    ) {
                      toast.error("Please upload at least one file");
                      return;
                    }

                    if (
                      (selectedService === "complete-help" ||
                        selectedService === "custom") &&
                      !formData.assignmentQuestion
                    ) {
                      toast.error("Please provide assignment details");
                      return;
                    }

                    for (const field of requiredFields) {
                      if (!formData[field]) {
                        toast.error(`Please fill in all required fields`);
                        return;
                      }
                    }
                    setStep("review");
                  }}
                  className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center shadow-sm shadow-blue-200"
                >
                  Continue to Review <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep("details")}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Review Your Order
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Confirm all details before submission
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-lg mb-5 text-gray-800">
                  Order Summary
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {
                        serviceTypes.find((s) => s.id === selectedService)
                          ?.title
                      }
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Student Name:</span>
                    <span className="font-medium text-gray-900">
                      {formData.studentName}
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Matric Number:</span>
                    <span className="font-medium text-gray-900">
                      {formData.matricNumber}
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Course Code:</span>
                    <span className="font-medium text-gray-900">
                      {formData.courseCode}
                    </span>
                  </div>

                  {(selectedService === "print-bind" ||
                    selectedService === "printing" ||
                    selectedService === "binding") && (
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Files to Print:</span>
                      <span className="font-medium text-gray-900">
                        {uploadedFiles.length} file(s)
                        {formData.handwrittenRequired &&
                          " (Optional for handwritten)"}
                      </span>
                    </div>
                  )}

                  {(selectedService === "print-bind" ||
                    selectedService === "printing") && (
                    <>
                      {!formData.handwrittenRequired && (
                        <>
                          <div className="flex justify-between pb-3 border-b border-gray-100">
                            <span className="text-gray-600">Print Type:</span>
                            <span className="font-medium text-gray-900">
                              {
                                printingOptions.find(
                                  (opt) => opt.id === formData.printType
                                )?.label
                              }
                            </span>
                          </div>
                          <div className="flex justify-between pb-3 border-b border-gray-100">
                            <span className="text-gray-600">Copies:</span>
                            <span className="font-medium text-gray-900">
                              {formData.copies}
                            </span>
                          </div>
                          <div className="flex justify-between pb-3 border-b border-gray-100">
                            <span className="text-gray-600">Double-sided:</span>
                            <span className="font-medium text-gray-900">
                              {formData.doubleSided ? "Yes" : "No"}
                            </span>
                          </div>
                        </>
                      )}
                      {formData.handwrittenRequired && (
                        <>
                          <div className="flex justify-between pb-3 border-b border-gray-100">
                            <span className="text-gray-600">
                              Handwritten Required:
                            </span>
                            <span className="font-medium text-gray-900">
                              Yes ({formData.pages} pages)
                            </span>
                          </div>
                          <div className="flex justify-between pb-3 border-b border-gray-100">
                            <span className="text-gray-600">
                              Handwriting Cost:
                            </span>
                            <span className="font-medium text-gray-900">
                              ₦500 + {formData.pages - 1} × ₦200 = ₦
                              {500 + (formData.pages - 1) * 200}
                            </span>
                          </div>
                          {formData.handwritingInstructions && (
                            <div className="flex justify-between pb-3 border-b border-gray-100">
                              <span className="text-gray-600">
                                Handwriting Instructions:
                              </span>
                              <span className="font-medium text-gray-900 max-w-xs text-right">
                                {formData.handwritingInstructions.length > 50
                                  ? `${formData.handwritingInstructions.substring(
                                      0,
                                      50
                                    )}...`
                                  : formData.handwritingInstructions}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {(selectedService === "print-bind" ||
                    selectedService === "binding") && (
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Binding:</span>
                      <span className="font-medium text-gray-900">
                        {formData.handwrittenRequired
                          ? "Not applicable (handwritten submission)"
                          : bindingOptions.find(
                              (opt) => opt.id === formData.bindingType
                            )?.label}
                      </span>
                    </div>
                  )}

                  {(selectedService === "complete-help" ||
                    selectedService === "custom") && (
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">
                        {selectedService === "complete-help"
                          ? "Assignment Question"
                          : "Request Details"}
                      </span>
                      <span className="font-medium text-gray-900 max-w-xs text-right">
                        {formData.assignmentQuestion.length > 50
                          ? `${formData.assignmentQuestion.substring(0, 50)}...`
                          : formData.assignmentQuestion}
                      </span>
                    </div>
                  )}

                  {selectedService === "complete-help" && (
                    <>
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span className="text-gray-600">Pages:</span>
                        <span className="font-medium text-gray-900">
                          {formData.pages}
                        </span>
                      </div>
                      {formData.formatting && (
                        <div className="flex justify-between pb-3 border-b border-gray-100">
                          <span className="text-gray-600">Formatting:</span>
                          <span className="font ragazzi-medium text-gray-900">
                            {formData.formatting}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span className="text-gray-600">Urgency:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.urgency}{" "}
                          <span className="font-medium text-gray-900">
                            {
                              urgencyOptions.find(
                                (u) => u.id === formData.urgency
                              )?.label
                            }
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span className="text-gray-600">Delivery Format:</span>
                        <span className="font-medium text-gray-900">
                          {formData.deliveryFormat === "handwritten"
                            ? "Handwritten on Fullscap"
                            : "Printed & Bound"}
                        </span>
                      </div>
                    </>
                  )}

                  {selectedService === "custom" && (
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Urgency:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {formData.urgency}{" "}
                        {formData.urgency === "urgent" && "(1-3 days)"}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Course Rep:</span>
                    <span className="font-medium text-gray-900">
                      {
                        courseReps.find((r) => r.id === formData.selectedRep)
                          ?.name
                      }
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Rep Contact:</span>
                    <span className="font-medium text-gray-900">
                      {
                        courseReps.find((r) => r.id === formData.selectedRep)
                          ?.phone
                      }
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Submission Location:</span>
                    <span className="font-medium text-gray-900">
                      {
                        courseReps.find((r) => r.id === formData.selectedRep)
                          ?.location
                      }
                    </span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(formData.deadline).toLocaleString()}
                    </span>
                  </div>

                  {formData.specialInstructions && (
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">
                        Special Instructions:
                      </span>
                      <span className="font-medium text-gray-900 max-w-xs text-right">
                        {formData.specialInstructions.length > 50
                          ? `${formData.specialInstructions.substring(
                              0,
                              50
                            )}...`
                          : formData.specialInstructions}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-medium text-gray-700">
                      Total:
                    </span>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-blue-600">
                        ₦{calculatePrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center shadow-sm shadow-blue-200 ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 w-5 h-5" />
                      Processing...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}