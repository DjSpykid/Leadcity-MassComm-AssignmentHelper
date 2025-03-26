"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>

        {/* WhatsApp Contact */}
        <p className="text-gray-600 mb-4">
          Need help? Chat with us on WhatsApp!
        </p>
        <a
          href="https://wa.me/234XXXXXXXXXX" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block"
        >
          Chat on WhatsApp
        </a>

        {/* FAQs Section */}
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold mb-2">
            Frequently Asked Questions
          </h3>
          <div className="mb-2">
            <p className="font-medium">How do I place an order?</p>
            <p className="text-gray-600 text-sm">
              Go to the Order Page, select a service, and upload your files.
            </p>
          </div>
          <div className="mb-2">
            <p className="font-medium">What payment options do you accept?</p>
            <p className="text-gray-600 text-sm">
              We accept Flutterwave, Paystack, and bank transfers.
            </p>
          </div>
          <div className="mb-2">
            <p className="font-medium">
              How long does it take to complete an order?
            </p>
            <p className="text-gray-600 text-sm">
              It depends on the service. Urgent requests can be completed
              faster.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
