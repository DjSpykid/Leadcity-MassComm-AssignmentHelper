// // app/admin/orders/[orderId]/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
// import FilePreview from "@/components/admin/FilePreview";

// type OrderData = {
//   _id: string;
//   serviceType: string;
//   status: string;
//   price: number;
//   createdAt: string;
//   user?: {
//     name: string;
//     email: string;
//     phone?: string;
//   };
//   details?: {
//     studentName: string;
//     matricNumber?: string;
//     courseCode?: string;
//     printType?: string;
//     copies?: number;
//     doubleSided?: boolean;
//     bindingType?: string;
//     assignmentQuestion?: string;
//     pages?: number;
//     handwrittenRequired?: boolean;
//     handwritingInstructions?: string;
//     formatting?: string;
//     urgency?: string;
//     deliveryFormat?: string;
//     selectedRep: string;
//     repDetails?: any;
//     specialInstructions?: string;
//     deadline: string;
//     attachments?: string[];
//   };
// };

// export default function OrderDetailPage() {
//   const params = useParams<{ orderId: string }>();
//   const [orderData, setOrderData] = useState<OrderData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`/api/admin/orders/${params.orderId}`);
//         if (!res.ok) {
//           throw new Error(
//             res.status === 404 ? "Order not found" : "Failed to fetch order"
//           );
//         }

//         const data = await res.json();
//         setOrderData(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [params.orderId]);

//   if (loading) {
//     return (
//       <div className="p-4 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 rounded-lg">
//         <h2 className="text-red-600 font-medium">Error loading order</h2>
//         <p className="text-red-500 mt-2">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!orderData) {
//     return (
//       <div className="p-4 bg-yellow-50 rounded-lg">
//         <h2 className="text-yellow-700">Order not found</h2>
//         <p className="mt-2">The requested order could not be found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Order Details</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Order ID:</span> {orderData._id}
//             </p>
//             <p>
//               <span className="font-medium">Status:</span>
//               <OrderStatusBadge status={orderData.status} />
//             </p>
//             <p>
//               <span className="font-medium">Service Type:</span>{" "}
//               {orderData.serviceType}
//             </p>
//             <p>
//               <span className="font-medium">Price:</span> ₦
//               {orderData.price.toFixed(2)}
//             </p>
//             <p>
//               <span className="font-medium">Created:</span>{" "}
//               {new Date(orderData.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </div>

//         {/* Student Information */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Student Information</h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Name:</span>{" "}
//               {orderData.details?.studentName}
//             </p>
//             <p>
//               <span className="font-medium">Email:</span>{" "}
//               {orderData.user?.email}
//             </p>
//             <p>
//               <span className="font-medium">Phone:</span>{" "}
//               {orderData.user?.phone || "Not provided"}
//             </p>
//             {orderData.details?.matricNumber && (
//               <p>
//                 <span className="font-medium">Matric No:</span>{" "}
//                 {orderData.details.matricNumber}
//               </p>
//             )}
//             {orderData.details?.courseCode && (
//               <p>
//                 <span className="font-medium">Course Code:</span>{" "}
//                 {orderData.details.courseCode}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Order-Specific Details */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Service Details</h2>

//         {orderData.serviceType === "Print and Bind" && (
//           <div className="space-y-2">
//             {orderData.details?.printType && (
//               <p>
//                 <span className="font-medium">Print Type:</span>{" "}
//                 {orderData.details.printType}
//               </p>
//             )}
//             {orderData.details?.copies && (
//               <p>
//                 <span className="font-medium">Copies:</span>{" "}
//                 {orderData.details.copies}
//               </p>
//             )}
//             {orderData.details?.bindingType && (
//               <p>
//                 <span className="font-medium">Binding Type:</span>{" "}
//                 {orderData.details.bindingType}
//               </p>
//             )}
//             {orderData.details?.doubleSided && (
//               <p>
//                 <span className="font-medium">Double Sided:</span>{" "}
//                 {orderData.details.doubleSided ? "Yes" : "No"}
//               </p>
//             )}
//           </div>
//         )}

//         {orderData.serviceType === "Assignment Help" && (
//           <div className="space-y-2">
//             {orderData.details?.pages && (
//               <p>
//                 <span className="font-medium">Pages:</span>{" "}
//                 {orderData.details.pages}
//               </p>
//             )}
//             {orderData.details?.handwrittenRequired && (
//               <p>
//                 <span className="font-medium">Handwritten:</span>{" "}
//                 {orderData.details.handwrittenRequired ? "Yes" : "No"}
//               </p>
//             )}
//             {orderData.details?.handwritingInstructions && (
//               <p>
//                 <span className="font-medium">Handwriting Instructions:</span>{" "}
//                 {orderData.details.handwritingInstructions}
//               </p>
//             )}
//             {orderData.details?.deadline && (
//               <p>
//                 <span className="font-medium">Deadline:</span>{" "}
//                 {new Date(orderData.details.deadline).toLocaleString()}
//               </p>
//             )}
//           </div>
//         )}

//         {orderData.details?.specialInstructions && (
//           <div className="mt-4">
//             <h3 className="font-medium">Special Instructions:</h3>
//             <p className="whitespace-pre-line bg-gray-50 p-3 rounded mt-1">
//               {orderData.details.specialInstructions}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Attachments */}
//       {orderData.details?.attachments &&
//         orderData.details.attachments.length > 0 && (
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Attachments</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {orderData.details.attachments.map((file, index) => (
//                 <FilePreview key={index} fileUrl={file} />
//               ))}
//             </div>
//           </div>
//         )}

//       <div className="flex justify-end">
//         <button
//           onClick={() => window.history.back()}
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Back to Orders
//         </button>
//       </div>
//     </div>
//   );
// }




// app/admin/orders/[orderId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Mail, 
  Phone, 
  User, 
  FileText, 
  Printer, 
  Bookmark, 
  PenTool,
  Copy,
  ArrowLeft
} from "lucide-react";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import FilePreview from "@/components/admin/FilePreview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type OrderData = {
  _id: string;
  serviceType: string;
  status: string;
  price: number;
  createdAt: string;
  user?: {
    name: string;
    email: string;
    phone: string;
    _id: string;
  };
  details?: {
    studentName: string;
    matricNumber: string;
    courseCode: string;
    assignmentQuestion?: string;
    pages?: number;
    handwrittenRequired?: boolean;
    handwritingInstructions?: string;
    formatting?: string;
    urgency?: string;
    deliveryFormat?: string;
    printType?: string;
    copies?: number;
    doubleSided?: boolean;
    bindingType?: string;
    selectedRep: string;
    repDetails?: {
      name: string;
      email: string;
      phone: string;
      location: string;
    };
    specialInstructions?: string;
    deadline: string;
    attachments?: string[];
  };
};

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/admin/orders/${params.orderId}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404 ? "Order not found" : "Failed to fetch order"
          );
        }

        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getServiceIcon = () => {
    switch (orderData?.serviceType) {
      case "complete-help":
        return <PenTool className="h-5 w-5 text-blue-500" />;
      case "print-bind":
        return <Printer className="h-5 w-5 text-green-500" />;
      case "printing":
        return <Printer className="h-5 w-5 text-orange-500" />;
      case "binding":
        return <Bookmark className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h2 className="text-red-600 font-medium">Error loading order</h2>
        <p className="text-red-500 mt-2">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-yellow-700">Order not found</h2>
        <p className="mt-2">The requested order could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="ml-auto">
          <OrderStatusBadge status={orderData.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-3">
            {getServiceIcon()}
            <h2 className="text-lg font-semibold">Order Summary</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{orderData._id}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Service Type</p>
              <p className="font-medium capitalize">
                {orderData.serviceType.replace(/-/g, " ")}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">₦{orderData.price.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">
                {new Date(orderData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Student Information</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{orderData.details?.studentName}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{orderData.user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(orderData.user?.email || "")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {orderData.user?.phone || "Not provided"}
                </p>
              </div>
              {orderData.user?.phone && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(orderData.user?.phone || "")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {orderData.details?.matricNumber && (
              <div>
                <p className="text-sm text-gray-500">Matric Number</p>
                <p className="font-medium">{orderData.details.matricNumber}</p>
              </div>
            )}
            
            {orderData.details?.courseCode && (
              <div>
                <p className="text-sm text-gray-500">Course Code</p>
                <p className="font-medium">{orderData.details.courseCode}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 pt-2">
            {orderData.user?.email && (
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`mailto:${orderData.user.email}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
            )}
            
            {orderData.user?.phone && (
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`tel:${orderData.user.phone}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Course Representative */}
        {orderData.details?.repDetails && (
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold">Course Representative</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{orderData.details.repDetails.name}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{orderData.details.repDetails.phone}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(orderData.details?.repDetails?.phone || "")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{orderData.details.repDetails.location}</p>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`mailto:${orderData.details.repDetails.email}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={`tel:${orderData.details.repDetails.phone}`}
                  className="flex gap-2 items-center justify-center"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Service-Specific Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Service Details</h2>

        {orderData.serviceType === "print-bind" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orderData.details?.printType && (
              <div>
                <p className="text-sm text-gray-500">Print Type</p>
                <p className="font-medium">{orderData.details.printType}</p>
              </div>
            )}
            
            {orderData.details?.copies && (
              <div>
                <p className="text-sm text-gray-500">Copies</p>
                <p className="font-medium">{orderData.details.copies}</p>
              </div>
            )}
            
            {orderData.details?.bindingType && (
              <div>
                <p className="text-sm text-gray-500">Binding Type</p>
                <p className="font-medium">{orderData.details.bindingType}</p>
              </div>
            )}
            
            {orderData.details?.doubleSided !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Double Sided</p>
                <p className="font-medium">
                  {orderData.details.doubleSided ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        )}

        {orderData.serviceType === "complete-help" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orderData.details?.pages && (
              <div>
                <p className="text-sm text-gray-500">Pages</p>
                <p className="font-medium">{orderData.details.pages}</p>
              </div>
            )}
            
            {orderData.details?.handwrittenRequired !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Handwritten</p>
                <p className="font-medium">
                  {orderData.details.handwrittenRequired ? "Yes" : "No"}
                </p>
              </div>
            )}
            
            {orderData.details?.handwritingInstructions && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Handwriting Instructions</p>
                <p className="font-medium">
                  {orderData.details.handwritingInstructions}
                </p>
              </div>
            )}
            
            {orderData.details?.formatting && (
              <div>
                <p className="text-sm text-gray-500">Formatting Style</p>
                <p className="font-medium">{orderData.details.formatting}</p>
              </div>
            )}
            
            {orderData.details?.urgency && (
              <div>
                <p className="text-sm text-gray-500">Urgency</p>
                <p className="font-medium capitalize">{orderData.details.urgency}</p>
              </div>
            )}
            
            {orderData.details?.deliveryFormat && (
              <div>
                <p className="text-sm text-gray-500">Delivery Format</p>
                <p className="font-medium">
                  {orderData.details.deliveryFormat === "handwritten"
                    ? "Handwritten on Fullscap"
                    : "Printed & Bound"}
                </p>
              </div>
            )}
          </div>
        )}

        {orderData.details?.assignmentQuestion && (
          <div className="mt-6">
            <p className="text-sm text-gray-500">Assignment Question</p>
            <div className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-line">
              {orderData.details.assignmentQuestion}
            </div>
          </div>
        )}

        {orderData.details?.specialInstructions && (
          <div className="mt-6">
            <p className="text-sm text-gray-500">Special Instructions</p>
            <div className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-line">
              {orderData.details.specialInstructions}
            </div>
          </div>
        )}

        {orderData.details?.deadline && (
          <div className="mt-6">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium">
              {new Date(orderData.details.deadline).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Attachments */}
      {orderData.details?.attachments && orderData.details.attachments.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attachments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orderData.details.attachments.map((file, index) => (
              <FilePreview key={index} fileUrl={file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}