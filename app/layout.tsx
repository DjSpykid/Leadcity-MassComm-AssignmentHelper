// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppHelp from "@/components/WhatsAppHelp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "My awesome Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          {children}
          <WhatsAppHelp />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
