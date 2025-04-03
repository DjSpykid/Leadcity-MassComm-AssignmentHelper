"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Download,
  Printer,
  Bookmark,
  Mail,
  Phone,
  User,
  MoreVertical,
  PenTool,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ContactStudentModal } from "../ContactStudentModal";

type User = {
  name: string;
  email: string;
  phone: string;
  _id: string;
};

type RepDetails = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

type OrderDetails = {
  studentName: string;
  matricNumber: string;
  courseCode: string;
  assignmentQuestion?: string;
  pages?: number;
  handwrittenRequired?: boolean;
  formatting?: string;
  deadline?: string;
  specialInstructions?: string;
  attachments?: string[];
  printType?: string;
  copies?: number;
  bindingType?: string;
  urgency?: string;
  deliveryFormat?: string;
  repDetails?: RepDetails;
};

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | "SUBMITTED";
type ServiceType =
  | "complete-help"
  | "print-bind"
  | "printing"
  | "binding"
  | "custom";

type Order = {
  _id: string;
  serviceType: ServiceType;
  status: OrderStatus;
  price: number;
  createdAt: string;
  user?: User;
  details?: OrderDetails;
};

type SelectedStudent = {
  name: string;
  email: string;
  phone: string;
  matricNumber?: string;
} | null;

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedOrder: Order = await res.json();
      setOrders(
        orders.map((order) => (order._id === orderId ? updatedOrder : order))
      );
      toast.success("Order status updated");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleContactStudent = (order: Order) => {
    setSelectedStudent({
      name: order.details?.studentName || order.user?.name || "Student",
      email: order.user?.email || "",
      phone: order.user?.phone || "",
      matricNumber: order.details?.matricNumber,
    });
    setContactModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getServiceIcon = (serviceType: ServiceType) => {
    const iconMap: Record<ServiceType, React.ReactNode> = {
      "complete-help": <PenTool className="h-5 w-5 text-blue-500" />,
      "print-bind": <Printer className="h-5 w-5 text-green-500" />,
      printing: <Printer className="h-5 w-5 text-orange-500" />,
      binding: <Bookmark className="h-5 w-5 text-purple-500" />,
      custom: <Zap className="h-5 w-5 text-yellow-500" />,
    };

    return (
      iconMap[serviceType] || <FileText className="h-5 w-5 text-gray-500" />
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-sm text-gray-500">
            Manage all student orders and track their progress
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
            className="border p-2 rounded-lg text-sm"
          >
            <option value="all">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rep Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order._id.substring(0, 8)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.details?.studentName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {order.user?.email}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {order.details?.matricNumber}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getServiceIcon(order.serviceType)}
                        <span className="text-sm font-medium capitalize">
                          {order.serviceType.replace(/-/g, " ")}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.details?.courseCode}
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm">
                        {order.serviceType === "complete-help" && (
                          <>
                            <p className="font-medium">Assignment Help</p>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {order.details?.assignmentQuestion}
                            </p>
                            {order.details?.pages && (
                              <p className="text-xs mt-1">
                                <span className="font-medium">Pages:</span>{" "}
                                {order.details.pages}
                              </p>
                            )}
                            {order.details?.handwrittenRequired && (
                              <Badge variant="outline" className="mt-1">
                                Handwritten
                              </Badge>
                            )}
                          </>
                        )}

                        {order.serviceType === "print-bind" && (
                          <>
                            <p className="font-medium">Print & Bind</p>
                            {order.details?.printType && (
                              <p className="text-xs">
                                <span className="font-medium">Type:</span>{" "}
                                {order.details.printType}
                              </p>
                            )}
                            {order.details?.copies && (
                              <p className="text-xs">
                                <span className="font-medium">Copies:</span>{" "}
                                {order.details.copies}
                              </p>
                            )}
                            {order.details?.bindingType && (
                              <p className="text-xs">
                                <span className="font-medium">Binding:</span>{" "}
                                {order.details.bindingType}
                              </p>
                            )}
                          </>
                        )}

                        {order.serviceType === "custom" && (
                          <p className="text-xs text-gray-500 line-clamp-3">
                            {order.details?.assignmentQuestion}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.details?.repDetails ? (
                        <div className="text-sm">
                          <p className="font-medium">
                            {order.details.repDetails.name}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.details.repDetails.phone}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {order.details.repDetails.location}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {order.details?.deadline ? (
                          <>
                            <p>
                              {new Date(
                                order.details.deadline
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                order.details.deadline
                              ).toLocaleTimeString()}
                            </p>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Not specified
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        ₦{order.price.toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value as OrderStatus)
                        }
                        className={`text-xs p-1 rounded ${
                          order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "SUBMITTED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/orders/${order._id}`)
                            }
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {order.details?.attachments &&
                            order.details.attachments.length > 0 && (
                              <DropdownMenuItem
                                onClick={() => {
                                  toast.info("Downloading attachments...");
                                }}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download Files
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuItem
                            onClick={() => handleContactStudent(order)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ContactStudentModal
        student={
          selectedStudent || {
            name: "",
            email: "",
            phone: "",
            matricNumber: "",
          }
        }
        repInfo={
          selectedStudent
            ? orders.find(
                (o) =>
                  o.details?.studentName === selectedStudent.name ||
                  o.user?.email === selectedStudent.email
              )?.details?.repDetails
            : undefined
        }
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </div>
  );
}



