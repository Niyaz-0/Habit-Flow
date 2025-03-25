import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/connectToDB";
import Log from "@/app/Models/LogSchema";

export async function GET() {
  try {
    await connectToDB();
    const logs = await Log.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}