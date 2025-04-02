
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Temporary debug
        console.log("Login attempt with:", {
          email: credentials?.email,
          passLength: credentials?.password?.length,
        });

        // SIMPLE TEST - Comment out later
        if (credentials?.password === "Admin@1234") {
          console.log("TEST LOGIN SUCCESS");
          return { id: "1", email: "admin@assignmate.com" };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/login" },
};
