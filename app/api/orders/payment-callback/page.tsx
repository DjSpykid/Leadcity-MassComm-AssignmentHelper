// // app/student/orders/payment-callback/page.tsx
// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";

// export default function PaymentCallbackPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { getToken } = useAuth();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const reference = searchParams.get("reference");
//       if (!reference) {
//         toast.error("Payment reference not found");
//         router.push("/student/orders");
//         return;
//       }

//       try {
//         const token = await getToken();
//         if (!token) {
//           toast.error("Session expired. Please login again.");
//           router.push("/auth/user-login");
//           return;
//         }

//         // Verify payment with our backend
//         const verifyRes = await fetch("/api/paystack/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ reference }),
//         });

//         if (!verifyRes.ok) {
//           throw new Error("Payment verification failed");
//         }

//         const { orderId } = await verifyRes.json();
//         toast.success("Payment successful!");
//         router.push(`/student/orders/${orderId}/success`);
//       } catch (error: unknown) {
//         console.error("Payment verification error:", error);
//         toast.error(error.message || "Payment verification failed");
//         router.push("/student/orders");
//       }
//     };

//     verifyPayment();
//   }, [searchParams, router, getToken]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
//         <h1 className="mt-4 text-xl font-medium text-gray-900">
//           Verifying your payment...
//         </h1>
//         <p className="mt-2 text-gray-600">
//           Please wait while we confirm your payment.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function PaymentVerifier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");
      if (!reference) {
        toast.error("Payment reference not found");
        router.push("/student/orders");
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          toast.error("Session expired. Please login again.");
          router.push("/auth/user-login");
          return;
        }

        const verifyRes = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reference }),
        });

        if (!verifyRes.ok) {
          throw new Error("Payment verification failed");
        }

        const { orderId } = await verifyRes.json();
        toast.success("Payment successful!");
        router.push(`/student/orders/${orderId}/success`);
      } catch (error: any) {
        console.error("Payment verification error:", error);
        toast.error(error.message || "Payment verification failed");
        router.push("/student/orders");
      }
    };

    verifyPayment();
  }, [searchParams, router, getToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <h1 className="mt-4 text-xl font-medium text-gray-900">
          Verifying your payment...
        </h1>
        <p className="mt-2 text-gray-600">
          Please wait while we confirm your payment.
        </p>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-sm">Loading...</span>
        </div>
      }
    >
      <PaymentVerifier />
    </Suspense>
  );
}
