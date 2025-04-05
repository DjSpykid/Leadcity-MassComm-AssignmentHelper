"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PaymentCallbackPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");
      if (!reference) {
        toast.error("Missing payment reference");
        return router.push("/student/orders");
      }

      try {
        const token = await getToken();
        const res = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reference }),
        });

        if (!res.ok) throw new Error("Verification failed");

        const data = await res.json();
        if (data.success) {
          toast.success("Payment verified!");
          router.push("/student/orders");
        } else {
          throw new Error(data.error || "Payment failed");
        }
      } catch (error: any) {
        toast.error(error.message);
        router.push("/student/orders");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen gap-4">
      <Loader2 className="animate-spin h-12 w-12" />
      <p>Verifying payment...</p>
    </div>
  );
}
