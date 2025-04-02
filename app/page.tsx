
"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  BookText,
  Printer,
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  const services = [
    {
      id: "complete-help",
      title: "Complete Assignment Help",
      icon: <BookText className="w-8 h-8" />,
      desc: "We assist with research, writing on full scape paper, printing, and binding if needed—ensuring your assignments are properly prepared and submitted to your class rep as required",
      color: "bg-blue-100 text-blue-900",
      hoverColor: "hover:bg-blue-200 hover:text-blue-600",
    },
    {
      id: "print-bind",
      title: "Print & Spiral-Bind",
      icon: <Printer className="w-8 h-8" />,
      desc: "If you already have your answers, upload them, and we’ll handle the printing, binding, and submission to your class rep. If you don’t have your answers, this service isn’t for you",
      color: "bg-purple-100 text-purple-900",
      hoverColor: "hover:bg-purple-200 hover:text-purple-600",
    },
    {
      id: "printing",
      title: "Submit with Ease: Print or Handwritten",
      icon: <Printer className="w-8 h-8" />,
      desc: "This service is for those who already have their answers. If the lecturer requires printed submissions, we’ll print and submit them to your class rep. If the lecturer requires handwritten submissions on full scape paper, we’ll write it out for you and submit it",
      color: "bg-green-100 text-green-900",
      hoverColor: "hover:bg-green-200 hover:text-green-600",
    },
    {
      id: "binding",
      title: "Bind & Submit with Ease",
      icon: <BookText className="w-8 h-8" />,
      desc: "If you already have your printed work, we’ll bind it professionally and ensure it’s ready for submission to your class rep.",
      color: "bg-amber-100 text-amber-900",
      hoverColor: "hover:bg-amber-200 hover:text-amber-600",
    },
    {
      id: "custom",
      title: "Custom Requests",
      icon: <HelpCircle className="w-8 h-8" />,
      desc: "Need something special? Describe it.",
      color: "bg-orange-100 text-orange-900",
      hoverColor: "hover:bg-orange-200 hover:text-orange-600",
    },
  ];

  const handleServiceClick = (serviceId: string, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast("Please login to access this feature", {
        icon: "🔒",
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Welcome Toast Notification */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-14 md:top-20 left-1/2 transform -translate-x-1/2 bg-white text-xs shadow-lg rounded-lg px-4 py-2 flex items-center gap-2 z-50"
        >
          <span>👋 Welcome back,{user?.name}!</span>
        </motion.div>
      )}

      {/* Updated Navbar with Auth State */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Link
              href="/"
              className="text-base sm:text-2xl font-bold text-blue-600 flex items-center gap-2"
            >
              <BookText className="w-5 h-5 sm:w-6 sm:h-6" /> MassComm Solutions
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex gap-4">
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
            </div>
          ) : user ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Hi, {user.name.split(" ")[0]}!</span>
              </div>
              <Link
                href="/student/dashboard"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-red-600 transition"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex gap-2 sm:gap-4"
            >
              <Link
                href="/auth/user-login"
                className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition whitespace-nowrap"
              >
                Login
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/user-signup"
                  className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section with Gradient Animation */}
      <section className="py-16 sm:py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50 animate-gradient-xy"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <motion.span
              className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-white rounded-full shadow-md mb-3 sm:mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🚀 Trusted by 500+ Students
            </motion.span>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {user
                ? `Welcome Back, ${user.name.split(" ")[0]}!`
                : "Academic Success Made Simple"}
            </motion.h1>
            <motion.p
              className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user
                ? "Ready to tackle your next assignment?"
                : "From printing to full solutions—get expert help with guaranteed quality and on-time delivery."}
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loading ? (
              <>
                <Skeleton width={200} height={48} borderRadius={12} />
                <Skeleton width={200} height={48} borderRadius={12} />
              </>
            ) : user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/student/orders/new"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition font-medium text-base sm:text-lg"
                  >
                    Create New Order <ArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/student/dashboard"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-base sm:text-lg"
                  >
                    View Dashboard
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/auth/user-signup"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition font-medium text-base sm:text-lg"
                  >
                    Get Started Now <ArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/auth/user-login"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-base sm:text-lg"
                  >
                    Already have an account? Login
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services Grid with Interactive Cards */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={240} borderRadius={16} />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions for all your academic needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 ${service.color} ${service.hoverColor} transition-all duration-300 cursor-pointer h-full flex flex-col`}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="bg-white p-2 sm:p-3 rounded-full"
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center">
                    {service.desc}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} className="mt-auto">
                    <Link
                      href={
                        user
                          ? `/student/orders/new?service=${service.id}`
                          : "/auth/user-login"
                      }
                      onClick={(e) => handleServiceClick(service.id, e)}
                      className="block text-center px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-white bg-opacity-70 rounded-lg font-medium hover:bg-opacity-90 transition"
                    >
                      {user ? "Select" : "Login to Order"}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 text-center px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              {user ? "Ready to Continue?" : "Ready to Get Started?"}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              {user
                ? "Your academic success journey continues here"
                : "Join hundreds of students who get their assignments done stress-free"}
            </p>
            {loading ? (
              <Skeleton
                width={300}
                height={56}
                borderRadius={12}
                className="mx-auto"
              />
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href={user ? "/student/dashboard" : "/auth/user-signup"}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition font-medium text-base sm:text-lg"
                >
                  {user ? "Go to Dashboard" : "Create Your Account Now"}{" "}
                  <ArrowRight className="ml-2" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <BookText className="w-4 h-4 sm:w-5 sm:h-5" /> MassComm Solutions
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Your trusted assignment helper.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Contact
              </h3>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400 mb-1 sm:mb-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" /> +234 906 965 065 8
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> opanugaaladetomiwa@gmail.com
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Hours
              </h3>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> Mon-Sat: 9AM - 5PM
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} MassComm Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}