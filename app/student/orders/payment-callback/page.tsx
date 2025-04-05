import { Suspense } from "react";
import PaymentCallbackPageClient from "./PaymentCallbackPageClient";


export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={<div className="p-4 text-center">Verifying payment...</div>}
    >
      <PaymentCallbackPageClient />
    </Suspense>
  );
}
