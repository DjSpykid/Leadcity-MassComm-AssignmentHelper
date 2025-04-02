// // app/api/auth/me/route.ts
// import { NextResponse } from 'next/server'
// import { User } from '@/lib/db/models'
// import jwt from 'jsonwebtoken'

// export async function GET(req: Request) {
//   try {
//     const token = req.cookies.get('token')?.value
//     if (!token) return NextResponse.json(null)

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string
//       role: string
//     }

//     const user = await User.findById(decoded.userId).select('-password')
//     if (!user) return NextResponse.json(null)

//     return NextResponse.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     })
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json(null)
//   }
// }


import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import jwt from "jsonwebtoken";
import { User } from "@/lib/db/models";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const cookieHeader = request.headers.get("cookie") || "";
    const token = cookieHeader.match(/token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ user: null }, { status: 200 });
  }
}