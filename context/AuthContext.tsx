
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// } | null;

// type AuthContextType = {
//   user: User;
//   loading: boolean;
//   login: (credentials: { email: string; password: string }) => Promise<void>;
//   logout: () => void;
//   getToken: () => string | undefined; // Add this to the type
// };

// // Update the default context to include getToken
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   login: async () => {},
//   logout: () => {},
//   getToken: () => undefined, // Add default implementation
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const response = await fetch("/api/auth/me", {
//           credentials: "include",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.user);
//         }
//       } catch (error) {
//         console.error("Failed to load user", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadUser();
//   }, []);

//   const login = async (credentials: { email: string; password: string }) => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Login failed");
//       }

//       const data = await response.json();
//       setUser(data.user);
//       router.push("/");
//       router.refresh();
//     } catch (error: any) {
//       console.error("Login error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     await fetch("/api/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setUser(null);
//     router.push("/auth/user-login");
//   };

//   // context/AuthContext.tsx
//   // const getToken = async (): Promise<string | null> => {
//   //   try {
//   //     const res = await fetch("/api/auth/token", {
//   //       credentials: "include",
//   //       cache: "no-store",
//   //     });

//   //     if (!res.ok) return null;

//   //     const data = await res.json();
//   //     return data.token || null;
//   //   } catch (error) {
//   //     console.error("Failed to get token:", error);
//   //     return null;
//   //   }
//   // };
// const getToken = async (): Promise<string | null> => {
//   try {
//     // First try to get token from cookies directly (client-side)
//     if (typeof window !== "undefined") {
//       const cookieToken = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1];

//       if (cookieToken) return cookieToken;
//     }

//     // Fallback to API call (works for both client and server)
//     const res = await fetch("/api/auth/token", {
//       credentials: "include",
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data.token || null;
//   } catch (error) {
//     console.error("Token fetch error:", error);
//     return null;
//   }
// };
//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };



// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 1. Define User type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
} | null;

// 2. Define AuthContext type
type AuthContextType = {
  user: User;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
};

// 3. Create the context with initial values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  getToken: () => null,
});

// 4. AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      router.push("/auth/user-login");
    }
  };
const getToken = async (): Promise<string | null> => {
  try {
    // First try to get from cookies (client-side)
    if (typeof window !== "undefined") {
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (cookieToken) return cookieToken;
    }

    // Fallback to API endpoint
    const response = await fetch("/api/auth/token", {
      credentials: "include",
      cache: "no-store",
    });

    if (response.ok) {
      const { token } = await response.json();
      return token;
    }
    return null;
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
};
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};