

// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter, useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowLeft,
//   FileText,
//   Clock,
//   CheckCircle,
//   Truck,
//   Download,
//   Printer,
//   BookOpen,
//   FileEdit,
//   Star,
// } from "lucide-react";

// type ServiceFields = {
//   name: string;
//   matricNumber: string;
//   deadline: string;
//   additionalInstructions?: string;
//   attachments?: string[];
//   deliveryMethod?: string;
//   courseSubject?: string;
//   assignmentType?: string;
//   wordCount?: number;
//   formattingRequirements?: string;
//   documentType?: string;
//   numberOfPages?: number;
//   bindingType?: string;
//   colorPreference?: string;
//   includeCoverPage?: boolean;
//   printType?: string;
//   paperSize?: string;
//   existingDocumentSource?: string;
//   bindingColor?: string;
//   customDescription?: string;
// };

// type Order = {
//   id: string;
//   serviceType: string;
//   details: ServiceFields;
//   price: number;
//   status: string;
//   createdAt: string;
// };

// const serviceTypeDetails = {
//   "complete-help": {
//     title: "Complete Assignment Help",
//     icon: <FileEdit className="h-5 w-5" />,
//     color: "bg-blue-100 text-blue-800",
//   },
//   "print-bind": {
//     title: "Print & Bind",
//     icon: <Printer className="h-5 w-5" />,
//     color: "bg-green-100 text-green-800",
//   },
//   printing: {
//     title: "Printing Only",
//     icon: <FileText className="h-5 w-5" />,
//     color: "bg-purple-100 text-purple-800",
//   },
//   binding: {
//     title: "Binding Only",
//     icon: <BookOpen className="h-5 w-5" />,
//     color: "bg-yellow-100 text-yellow-800",
//   },
//   custom: {
//     title: "Custom Request",
//     icon: <Star className="h-5 w-5" />,
//     color: "bg-pink-100 text-pink-800",
//   },
// };

// const statusSteps = [
//   {
//     id: "PENDING",
//     label: "Pending",
//     icon: Clock,
//     color: "bg-gray-100 text-gray-800",
//   },
//   {
//     id: "PROCESSING",
//     label: "Processing",
//     icon: FileText,
//     color: "bg-blue-100 text-blue-800",
//   },
//   {
//     id: "COMPLETED",
//     label: "Completed",
//     icon: CheckCircle,
//     color: "bg-green-100 text-green-800",
//   },
//   {
//     id: "SUBMITTED",
//     label: "Submitted to Class Rep",
//     icon: Truck,
//     color: "bg-purple-100 text-purple-800",
//   },
// ];

// export default function OrderDetailsPage() {
//   const { user, getToken } = useAuth();
//   const router = useRouter();
//   const params = useParams<{ orderId: string }>();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!user) {
//       router.push("/auth/user-login");
//       return;
//     }

//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         const token = await getToken();

//         const res = await fetch(`/api/orders/${params.orderId}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) {
//           throw new Error(
//             res.status === 404
//               ? "Order not found"
//               : `Failed to fetch order: ${res.statusText}`
//           );
//         }

//         const data = await res.json();
//         setOrder({
//           ...data,
//           serviceFields: data.details,
//         });
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [params.orderId, user, router, getToken]);

//   const handleDownload = async (filePath: string) => {
//     try {
//       const token = await getToken();
      
//       // If the file is a full URL, use it directly
//       if (filePath.startsWith('http')) {
//         window.open(filePath, '_blank');
//         return;
//       }

//       // For local files, use an API endpoint
//       const response = await fetch(`/api/download?file=${encodeURIComponent(filePath)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Download failed');
      
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = filePath.split('/').pop() || 'download';
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (error) {
//       console.error('Download error:', error);
//       // Fallback to direct download if API fails
//       window.open(filePath, '_blank');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <p className="mb-4 text-red-500">{error}</p>
//           <Button onClick={() => router.push("/dashboard")}>
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <p className="mb-4">Order not found</p>
//           <Button onClick={() => router.push("/dashboard")}>
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const currentStatusIndex = statusSteps.findIndex(
//     (step) => step.id === order.status
//   );
//   const serviceDetails = serviceTypeDetails[
//     order.serviceType as keyof typeof serviceTypeDetails
//   ] || {
//     title: order.serviceType,
//     icon: <FileText />,
//     color: "bg-gray-100 text-gray-800",
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6">
//       <Button
//         variant="ghost"
//         onClick={() => router.back()}
//         className="mb-6 flex items-center gap-2"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Orders
//       </Button>

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//           Order #{order.id.slice(-6).toUpperCase()}
//         </h1>
//         <div
//           className={`px-4 py-2 rounded-full ${serviceDetails.color} text-sm font-medium flex items-center gap-2`}
//         >
//           {serviceDetails.icon}
//           {serviceDetails.title}
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
//         <h2 className="font-bold text-xl mb-4 text-gray-800">Order Status</h2>
//         <div className="relative">
//           <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 hidden sm:block"></div>
//           <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0">
//             {statusSteps.map((step, index) => {
//               const isCompleted = index < currentStatusIndex;
//               const isCurrent = index === currentStatusIndex;
//               const Icon = step.icon;

//               return (
//                 <div
//                   key={step.id}
//                   className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-0 z-10"
//                 >
//                   {index > 0 && (
//                     <div className="w-4 h-1 bg-gray-200 sm:hidden"></div>
//                   )}
//                   <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
//                         isCompleted
//                           ? "bg-green-500 text-white"
//                           : isCurrent
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       <Icon className="h-5 w-5" />
//                     </div>
//                     <div className="sm:text-center">
//                       <span
//                         className={`text-sm ${
//                           isCompleted || isCurrent
//                             ? "font-medium text-gray-900"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         {step.label}
//                       </span>
//                       {isCompleted && (
//                         <span className="block text-xs text-gray-400 mt-1">
//                           {new Date(order.createdAt).toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h2 className="font-bold text-xl mb-4 text-gray-800">
//             Order Details
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <span className="text-gray-600 block text-sm">Student Name:</span>
//               <p className="font-medium text-gray-900 mt-1">
//                 {order.details.name}
//               </p>
//             </div>
//             <div>
//               <span className="text-gray-600 block text-sm">
//                 Matric Number:
//               </span>
//               <p className="font-medium text-gray-900 mt-1">
//                 {order.details.matricNumber}
//               </p>
//             </div>
//             <div>
//               <span className="text-gray-600 block text-sm">Deadline:</span>
//               <p className="font-medium text-gray-900 mt-1">
//                 {new Date(order.details.deadline).toLocaleString()}
//               </p>
//             </div>

//             {order.serviceType === "complete-help" && (
//               <>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Course/Subject:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.courseSubject || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Assignment Type:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.assignmentType || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Word Count:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.wordCount || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Formatting:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.formattingRequirements ||
//                       "Not specified"}
//                   </p>
//                 </div>
//               </>
//             )}

//             {order.serviceType === "print-bind" && (
//               <>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Document Type:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.documentType || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Number of Pages:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.numberOfPages || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Binding Type:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.bindingType || "Not specified"}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600 block text-sm">
//                     Color Preference:
//                   </span>
//                   <p className="font-medium text-gray-900 mt-1">
//                     {order.details.colorPreference || "Not specified"}
//                   </p>
//                 </div>
//               </>
//             )}

//             {order.details.additionalInstructions && (
//               <div>
//                 <span className="text-gray-600 block text-sm">
//                   Additional Instructions:
//                 </span>
//                 <p className="font-medium text-gray-900 mt-1">
//                   {order.details.additionalInstructions}
//                 </p>
//               </div>
//             )}

//             {order.details.attachments?.length ? (
//               <div>
//                 <span className="text-gray-600 block text-sm">
//                   Attachments:
//                 </span>
//                 <div className="mt-2 space-y-2">
//                   {order.details.attachments.map((file, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
//                     >
//                       <div className="flex items-center text-sm text-gray-700">
//                         <FileText className="h-4 w-4 mr-2 text-blue-600" />
//                         <span className="truncate max-w-[180px]">{file}</span>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-blue-600 hover:text-blue-700"
//                         onClick={() => handleDownload(file)}
//                       >
//                         <Download className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : null}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h2 className="font-bold text-xl mb-4 text-gray-800">
//             Payment & Summary
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between py-2">
//               <span className="text-gray-600">Order Date:</span>
//               <span className="font-medium text-gray-900">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="flex justify-between py-2">
//               <span className="text-gray-600">Order ID:</span>
//               <span className="font-medium text-gray-900">
//                 {order.id.slice(-6).toUpperCase()}
//               </span>
//             </div>
//             <div className="pt-4 border-t border-gray-200">
//               <div className="flex justify-between items-center py-3">
//                 <span className="text-gray-600">Subtotal:</span>
//                 <span className="font-medium text-gray-900">
//                   ₦{order.price.toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center py-3 border-t border-gray-200">
//                 <span className="text-gray-600 font-semibold">Total:</span>
//                 <span className="text-xl font-bold text-blue-600">
//                   ₦{order.price.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             {order.status === "COMPLETED" || order.status === "SUBMITTED" ? (
//               <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
//                 Download Completed Work
//               </Button>
//             ) : (
//               <Button variant="outline" className="w-full mt-4" disabled>
//                 Work in Progress
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  Download,
  Printer,
  BookOpen,
  FileEdit,
  Star,
} from "lucide-react";
import OrderHelp from "@/components/OrderHelp";

type ServiceFields = {
  name: string;
  matricNumber: string;
  deadline: string;
  additionalInstructions?: string;
  attachments?: string[];
  deliveryMethod?: string;
  courseSubject?: string;
  assignmentType?: string;
  wordCount?: number;
  formattingRequirements?: string;
  documentType?: string;
  numberOfPages?: number;
  bindingType?: string;
  colorPreference?: string;
  includeCoverPage?: boolean;
  printType?: string;
  paperSize?: string;
  existingDocumentSource?: string;
  bindingColor?: string;
  customDescription?: string;
};

type Order = {
  id: string;
  serviceType: string;
  details: ServiceFields;
  price: number;
  status: string;
  createdAt: string;
};

const serviceTypeDetails = {
  "complete-help": {
    title: "Complete Assignment Help",
    icon: <FileEdit className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800",
  },
  "print-bind": {
    title: "Print & Bind",
    icon: <Printer className="h-5 w-5" />,
    color: "bg-green-100 text-green-800",
  },
  printing: {
    title: "Printing Only",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800",
  },
  binding: {
    title: "Binding Only",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-800",
  },
  custom: {
    title: "Custom Request",
    icon: <Star className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-800",
  },
};

const statusSteps = [
  {
    id: "PENDING",
    label: "Pending",
    icon: Clock,
    color: "bg-gray-100 text-gray-800",
  },
  {
    id: "PROCESSING",
    label: "Processing",
    icon: FileText,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "COMPLETED",
    label: "Completed",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "SUBMITTED",
    label: "Submitted to Class Rep",
    icon: Truck,
    color: "bg-purple-100 text-purple-800",
  },
];

export default function OrderDetailsPage() {
  const { user, getToken } = useAuth();
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/user-login");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const res = await fetch(`/api/orders/${params.orderId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Order not found"
              : `Failed to fetch order: ${res.statusText}`
          );
        }

        const data = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId, user, router, getToken]);

  const handleDownload = (fileUrl: string) => {
    // Only handle properly formatted URLs
    if (fileUrl.startsWith("http")) {
      window.open(fileUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="mb-4">Order not found</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.id === order.status
  );
  const serviceDetails = serviceTypeDetails[
    order.serviceType as keyof typeof serviceTypeDetails
  ] || {
    title: order.serviceType,
    icon: <FileText />,
    color: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Order #{order.id.slice(-6).toUpperCase()}
        </h1>
        <div
          className={`px-4 py-2 rounded-full ${serviceDetails.color} text-sm font-medium flex items-center gap-2`}
        >
          {serviceDetails.icon}
          {serviceDetails.title}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Order Status</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 hidden sm:block"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0">
            {statusSteps.map((step, index) => {
              const isCompleted = index < currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-0 z-10"
                >
                  {index > 0 && (
                    <div className="w-4 h-1 bg-gray-200 sm:hidden"></div>
                  )}
                  <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="sm:text-center">
                      <span
                        className={`text-sm ${
                          isCompleted || isCurrent
                            ? "font-medium text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isCompleted && (
                        <span className="block text-xs text-gray-400 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-bold text-xl mb-4 text-gray-800">
            Order Details
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 block text-sm">Student Name:</span>
              <p className="font-medium text-gray-900 mt-1">
                {order.details.name}
              </p>
            </div>
            <div>
              <span className="text-gray-600 block text-sm">
                Matric Number:
              </span>
              <p className="font-medium text-gray-900 mt-1">
                {order.details.matricNumber}
              </p>
            </div>
            <div>
              <span className="text-gray-600 block text-sm">Deadline:</span>
              <p className="font-medium text-gray-900 mt-1">
                {new Date(order.details.deadline).toLocaleString()}
              </p>
            </div>

            {order.serviceType === "complete-help" && (
              <>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Course/Subject:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.courseSubject || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Assignment Type:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.assignmentType || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Word Count:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.wordCount || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Formatting:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.formattingRequirements || "Not specified"}
                  </p>
                </div>
              </>
            )}

            {order.serviceType === "print-bind" && (
              <>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Document Type:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.documentType || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Number of Pages:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.numberOfPages || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Binding Type:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.bindingType || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">
                    Color Preference:
                  </span>
                  <p className="font-medium text-gray-900 mt-1">
                    {order.details.colorPreference || "Not specified"}
                  </p>
                </div>
              </>
            )}

            {order.details.additionalInstructions && (
              <div>
                <span className="text-gray-600 block text-sm">
                  Additional Instructions:
                </span>
                <p className="font-medium text-gray-900 mt-1">
                  {order.details.additionalInstructions}
                </p>
              </div>
            )}

            {order.details.attachments?.filter((file) =>
              file.startsWith("http")
            ).length ? (
              <div>
                <span className="text-gray-600 block text-sm">
                  Attachments:
                </span>
                <div className="mt-2 space-y-2">
                  {order.details.attachments
                    .filter((file) => file.startsWith("http"))
                    .map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center text-sm text-gray-700">
                          <FileText className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="truncate max-w-[180px]">{file}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => handleDownload(file)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-bold text-xl mb-4 text-gray-800">
            Payment & Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">
                {order.id.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">
                  ₦{order.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-gray-600 font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ₦{order.price.toLocaleString()}
                </span>
              </div>
            </div>

            {order.status !== "COMPLETED" && order.status !== "SUBMITTED" && (
              <Button variant="outline" className="w-full mt-4" disabled>
                Work in Progress
              </Button>
            )}
          </div>
        </div>
      </div>
      <OrderHelp/>
    </div>
  );
}