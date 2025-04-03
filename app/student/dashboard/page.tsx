

// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useCallback } from "react";

// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   PlusCircle,
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface Order {
//   id: string;
//   createdAt: string;
//   price: number;
//   status: "PENDING" | "PROCESSING" | "COMPLETED" | "SUBMITTED";
//   details: {
//     studentName: string;
//     matricNumber: string;
//     courseCode: string;
//     printType: string;
//     copies: number;
//   };
//   // Add more fields as needed
// }

// export default function DashboardPage() {
//   const { user, loading, getToken } = useAuth();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     pending: 0,
//     processing: 0,
//     completed: 0,
//     submitted: 0,
//   });
//   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(10);
//   const [statusFilter, setStatusFilter] = useState<string>("ALL");
//   const [showFilters, setShowFilters] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (statusFilter === "ALL") {
//       setFilteredOrders(orders);
//     } else {
//       setFilteredOrders(
//         orders.filter((order) => order.status === statusFilter)
//       );
//     }
//     setCurrentPage(1);
//   }, [orders, statusFilter]);

// const fetchOrders = useCallback(async () => {
//   setIsLoadingOrders(true);
//   try {
//     const token = await getToken();
//     const response = await fetch("/api/orders/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     const data = await response.json();
//     setOrders(data.orders || []);

//     const pending = data.orders.filter(
//       (o: Order) => o.status === "PENDING"
//     ).length;
//     const processing = data.orders.filter(
//       (o: Order) => o.status === "PROCESSING"
//     ).length;
//     const completed = data.orders.filter(
//       (o: Order) => o.status === "COMPLETED"
//     ).length;
//     const submitted = data.orders.filter(
//       (o: Order) => o.status === "SUBMITTED"
//     ).length;

//     setStats({
//       totalOrders: data.orders.length,
//       pending,
//       processing,
//       completed,
//       submitted,
//     });
//   } catch (error) {
//     console.error("Failed to fetch orders:", error);
//   } finally {
//     setIsLoadingOrders(false);
//   }
// }, [getToken]);

// useEffect(() => {
//   if (user) {
//     fetchOrders();
//   }
// }, [user, fetchOrders]);
  
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-800";
//       case "PROCESSING":
//         return "bg-blue-100 text-blue-800";
//       case "COMPLETED":
//         return "bg-green-100 text-green-800";
//       case "SUBMITTED":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loading || isLoadingOrders) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="text-center py-8">
//         <h2 className="text-2xl font-bold mb-4">
//           Please login to view dashboard
//         </h2>
//         <Link
//           href="/auth/user-login"
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Welcome back, {user.name}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Here&apos;s what&apos;s happening with your orders
//           </p>
//         </motion.div>

//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={() => router.push("/student/orders/new")}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all w-full sm:w-auto justify-center"
//         >
//           <PlusCircle size={18} />
//           <span>New Order</span>
//         </motion.button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
//           onClick={() => setStatusFilter("ALL")}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Orders</p>
//               <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
//             </div>
//             <div className="p-3 rounded-full bg-blue-50">
//               <FileText className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
//           onClick={() => setStatusFilter("PENDING")}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Pending</p>
//               <h3 className="text-2xl font-bold mt-1">{stats.pending}</h3>
//             </div>
//             <div className="p-3 rounded-full bg-yellow-50">
//               <Clock className="h-6 w-6 text-yellow-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
//           onClick={() => setStatusFilter("PROCESSING")}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Processing</p>
//               <h3 className="text-2xl font-bold mt-1">{stats.processing}</h3>
//             </div>
//             <div className="p-3 rounded-full bg-blue-50">
//               <FileText className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
//           onClick={() => setStatusFilter("COMPLETED")}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Completed</p>
//               <h3 className="text-2xl font-bold mt-1">
//                 {stats.completed + stats.submitted}
//               </h3>
//             </div>
//             <div className="p-3 rounded-full bg-green-50">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//       >
//         <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               {statusFilter === "ALL"
//                 ? "All Orders"
//                 : `${statusFilter.replace("_", " ")} Orders`}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               {filteredOrders.length} orders found
//             </p>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
//             >
//               <Filter size={16} />
//               <span>Filter</span>
//             </button>

//             {showFilters && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setStatusFilter("ALL");
//                       setShowFilters(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       statusFilter === "ALL"
//                         ? "bg-blue-50 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     All Orders
//                   </button>
//                   <button
//                     onClick={() => {
//                       setStatusFilter("PENDING");
//                       setShowFilters(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       statusFilter === "PENDING"
//                         ? "bg-blue-50 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     Pending
//                   </button>
//                   <button
//                     onClick={() => {
//                       setStatusFilter("PROCESSING");
//                       setShowFilters(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       statusFilter === "PROCESSING"
//                         ? "bg-blue-50 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     Processing
//                   </button>
//                   <button
//                     onClick={() => {
//                       setStatusFilter("COMPLETED");
//                       setShowFilters(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       statusFilter === "COMPLETED"
//                         ? "bg-blue-50 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     Completed
//                   </button>
//                   <button
//                     onClick={() => {
//                       setStatusFilter("SUBMITTED");
//                       setShowFilters(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       statusFilter === "SUBMITTED"
//                         ? "bg-blue-50 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     Submitted to Rep
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {filteredOrders.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="hidden sm:table min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Order
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentOrders.map((order) => (
//                   <motion.tr
//                     key={order._id}
//                     whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500 capitalize">
//                         {order.serviceType.replace("-", " ")}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                           order.status
//                         )}`}
//                       >
//                         {order.status.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <Link
//                         href={`/student/orders/${order._id}`}
//                         className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1"
//                       >
//                         View <ArrowRight className="h-4 w-4" />
//                       </Link>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="sm:hidden space-y-4 p-4">
//               {currentOrders.map((order) => (
//                 <motion.div
//                   key={order._id}
//                   whileHover={{ scale: 1.01 }}
//                   className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </h3>
//                       <p className="text-sm text-gray-500 mt-1 capitalize">
//                         {order.serviceType.replace("-", " ")}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status.replace("_", " ")}
//                     </span>
//                   </div>
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className="text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </span>
//                     <Link
//                       href={`/student/orders/${order._id}`}
//                       className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                     >
//                       View <ArrowRight className="h-4 w-4" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {filteredOrders.length > ordersPerPage && (
//               <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//                 <div className="flex-1 flex justify-between sm:hidden">
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentPage === 1}
//                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                     }
//                     disabled={currentPage === totalPages}
//                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Showing{" "}
//                       <span className="font-medium">
//                         {indexOfFirstOrder + 1}
//                       </span>{" "}
//                       to{" "}
//                       <span className="font-medium">
//                         {Math.min(indexOfLastOrder, filteredOrders.length)}
//                       </span>{" "}
//                       of{" "}
//                       <span className="font-medium">
//                         {filteredOrders.length}
//                       </span>{" "}
//                       results
//                     </p>
//                   </div>
//                   <div>
//                     <nav
//                       className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                       aria-label="Pagination"
//                     >
//                       <button
//                         onClick={() =>
//                           setCurrentPage((prev) => Math.max(prev - 1, 1))
//                         }
//                         disabled={currentPage === 1}
//                         className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                       >
//                         <span className="sr-only">Previous</span>
//                         <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//                       </button>

//                       {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                         (number) => (
//                           <button
//                             key={number}
//                             onClick={() => paginate(number)}
//                             className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                               currentPage === number
//                                 ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
//                                 : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                             }`}
//                           >
//                             {number}
//                           </button>
//                         )
//                       )}

//                       <button
//                         onClick={() =>
//                           setCurrentPage((prev) =>
//                             Math.min(prev + 1, totalPages)
//                           )
//                         }
//                         disabled={currentPage === totalPages}
//                         className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                       >
//                         <span className="sr-only">Next</span>
//                         <ChevronRight className="h-5 w-5" aria-hidden="true" />
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center p-12">
//             <div className="mx-auto h-20 w-20 text-gray-300 mb-4">
//               <FileText className="h-full w-full" strokeWidth={1} />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-1">
//               {statusFilter === "ALL"
//                 ? "No orders yet"
//                 : `No ${statusFilter.toLowerCase()} orders`}
//             </h3>
//             <p className="text-gray-500 mb-6 max-w-md mx-auto">
//               {statusFilter === "ALL"
//                 ? "You haven't placed any orders yet. Get started by creating your first order"
//                 : `You don't have any ${statusFilter.toLowerCase()} orders at the moment`}
//             </p>
//             <button
//               onClick={() => router.push("/student/orders/new")}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Create New Order
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }





"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  createdAt: string;
  price: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "SUBMITTED";
  details: {
    studentName: string;
    matricNumber: string;
    courseCode: string;
    printType: string;
    copies: number;
  };
}

export default function DashboardPage() {
  const { user, loading, getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    submitted: 0,
  });
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === statusFilter)
      );
    }
    setCurrentPage(1);
  }, [orders, statusFilter]);

  const fetchOrders = useCallback(async () => {
    setIsLoadingOrders(true);
    try {
      const token = await getToken();
      const response = await fetch("/api/orders/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders || []);

      const pending = data.orders.filter(
        (o: Order) => o.status === "PENDING"
      ).length;
      const processing = data.orders.filter(
        (o: Order) => o.status === "PROCESSING"
      ).length;
      const completed = data.orders.filter(
        (o: Order) => o.status === "COMPLETED"
      ).length;
      const submitted = data.orders.filter(
        (o: Order) => o.status === "SUBMITTED"
      ).length;

      setStats({
        totalOrders: data.orders.length,
        pending,
        processing,
        completed,
        submitted,
      });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "SUBMITTED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading || isLoadingOrders) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">
          Please login to view dashboard
        </h2>
        <Link
          href="/auth/user-login"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your orders
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/student/orders/new")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all w-full sm:w-auto justify-center"
        >
          <PlusCircle size={18} />
          <span>New Order</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setStatusFilter("ALL")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setStatusFilter("PENDING")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold mt-1">{stats.pending}</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setStatusFilter("PROCESSING")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <h3 className="text-2xl font-bold mt-1">{stats.processing}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setStatusFilter("COMPLETED")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold mt-1">
                {stats.completed + stats.submitted}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {statusFilter === "ALL"
                ? "All Orders"
                : `${statusFilter.replace("_", " ")} Orders`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="relative w-full sm:w-auto" ref={filterRef}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full sm:w-auto gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <span className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </span>
            </button>

            {showFilters && (
              <div className="absolute left-0 right-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setStatusFilter("ALL");
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "ALL"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Orders
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("PENDING");
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "PENDING"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("PROCESSING");
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "PROCESSING"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("COMPLETED");
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "COMPLETED"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("SUBMITTED");
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === "SUBMITTED"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Submitted to Rep
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="hidden sm:table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.slice(-6).toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 capitalize">
                        {order.details.printType.replace("-", " ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/student/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1"
                      >
                        View <ArrowRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <div className="sm:hidden space-y-4 p-4">
              {currentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        #{order.id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {order.details.printType.replace("-", " ")}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/student/orders/${order.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredOrders.length > ordersPerPage && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstOrder + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastOrder, filteredOrders.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredOrders.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-12">
            <div className="mx-auto h-20 w-20 text-gray-300 mb-4">
              <FileText className="h-full w-full" strokeWidth={1} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {statusFilter === "ALL"
                ? "No orders yet"
                : `No ${statusFilter.toLowerCase()} orders`}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {statusFilter === "ALL"
                ? "You haven't placed any orders yet. Get started by creating your first order"
                : `You don't have any ${statusFilter.toLowerCase()} orders at the moment`}
            </p>
            <button
              onClick={() => router.push("/student/orders/new")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Order
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}