// lib/db/connect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

const cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
    cached.conn = await cached.promise;
    console.log("Database connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Propagate the error
  }
}
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in your .env file");
// }

// declare global {
//   var mongoose: any;
// }

// let cached = global.mongoose || { conn: null, promise: null };

// export async function connectToDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         bufferCommands: false,
//       })
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
