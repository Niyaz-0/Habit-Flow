import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User from "@/app/Models/UserSchema";
import { connectToDB } from "@/app/lib/connectToDB";

export async function POST(req: Request) {
  // Get Clerk Webhook Secret
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("❌ WEBHOOK_SECRET is missing in .env");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // Get request headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If headers are missing, reject the request
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("❌ Missing svix headers", { status: 400 });
  }

  // Get the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the payload with Clerk using Svix
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  // Extract user ID and event type
  const { id, first_name, email_addresses, public_metadata } = evt.data as any;
  const eventType = evt.type;

  console.log(`🔔 Webhook triggered: ${eventType}`);

  // ✅ Handle user creation
  if (eventType === "user.created") {
    const newUser = {
      clerkUserId: id,
      username: first_name || "No Name",
      emailAddress: email_addresses?.[0]?.email_address || "No Email",
      role: public_metadata?.role || "user", // Default to "user" role
      active: true, // Assume new users are active by default
    };

    console.log("🆕 New User Data:", newUser);

    try {
      await connectToDB();
      const existingUser = await User.findOne({ clerkUserId: id });

      if (!existingUser) {
        await User.create(newUser);
        console.log("✅ User successfully stored in MongoDB");
      } else {
        console.log("ℹ️ User already exists in MongoDB");
      }
    } catch (error) {
      console.error("❌ Error saving user:", error);
      return new Response("Error saving user", { status: 500 });
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
