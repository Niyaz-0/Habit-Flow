// app/api/users/[userId]/route.ts
import { NextResponse } from "next/server";
import {connectToDB} from "@/app/lib/connectToDB"; // adjust path if needed
import User from "@/app/Models/UserSchema"; // adjust path if needed

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  await connectToDB();
  try {
    const user = await User.findOne({ clerkUserId: params.userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function PUT(request: Request, { params }: { params: { userId: string } }) {
//   await connectToDB();
//   try {
//     const body = await request.json();
//     // Optionally validate the body here
//     const updatedUser = await User.findOneAndUpdate(
//       { clerkUserId: params.userId },
//       body,
//       { new: true }
//     );
//     if (!updatedUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json({ user: updatedUser });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
//Removed because we don't need edit functionality for now