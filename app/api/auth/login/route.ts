


// import { NextResponse } from "next/server";
// import { connectToDB } from "@/lib/db/connect";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "@/lib/db/models";

// export async function POST(req: Request) {
//   try {
//     await connectToDB();

//     const { email, password } = await req.json();
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 401 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Wrong password" }, { status: 401 });
//     }

//     const token = jwt.sign(
//       { userId: user._id.toString(), role: user.role },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" }
//     );

//     const response = NextResponse.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });

//     response.cookies.set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24 * 7,
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return NextResponse.json({ error: "Login failed" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/lib/db/models";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // This is the critical part that should stay in the API route
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}