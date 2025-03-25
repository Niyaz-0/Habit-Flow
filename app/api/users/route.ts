import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/connectToDB";
import User from "@/app/Models/UserSchema";
import Log from "@/app/Models/LogSchema";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

// ✅ GET: Fetch Users from Clerk & Store in MongoDB
export async function GET(req: Request) {
  try {
    await connectToDB();
    const response = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);
    
    const data = await response.json();
    if (!data || !Array.isArray(data)) throw new Error("Invalid API response structure");

    const users = await Promise.all(
      data.map(async (user: any) => {
        const userData = {
          clerkUserId: user.id,
          username: user.first_name || "No Name",
          emailAddress: user.email_addresses?.[0]?.email_address || "No Email",
          role: user.public_metadata?.role || "user",
          active: !user.banned,
          createdAt: user.created_at,
        };

        const existingUser = await User.findOne({ clerkUserId: user.id });
        if (!existingUser) await User.create(userData);
        return userData;
      })
    );

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ POST: Ban/Unban/Delete Users with Logging
export async function POST(req: Request) {
  try {
    const { userId: adminUserId } = getAuth(req as any);
    if (!adminUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { userId, action } = await req.json();
    if (!userId || !["ban", "unban", "delete"].includes(action)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    // Get admin and target user details for logging
    const [adminUser, targetUser] = await Promise.all([
      clerkClient.users.getUser(adminUserId),
      clerkClient.users.getUser(userId),
    ]);

    // Perform action
    if (action === "delete") {
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.error || "Failed to delete user" }, { status: 500 });
      }

      await connectToDB();
      await User.findOneAndDelete({ clerkUserId: userId });
    } else {
      const endpoint = action === "ban" 
        ? `https://api.clerk.dev/v1/users/${userId}/ban`
        : `https://api.clerk.dev/v1/users/${userId}/unban`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.error || `Failed to ${action} user` }, { status: 500 });
      }

      await connectToDB();
      await User.findOneAndUpdate(
        { clerkUserId: userId },
        { active: action === "unban" },
        { new: true }
      );
    }

    // Create log entry
    await Log.create({
      action,
      targetUserId: userId,
      adminUserId,
      adminEmail: adminUser.emailAddresses[0]?.emailAddress,
      targetEmail: targetUser.emailAddresses[0]?.emailAddress,
    });

    return NextResponse.json({ 
      success: true, 
      message: `User ${action === "delete" ? "deleted" : action + "ned"} successfully` 
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}