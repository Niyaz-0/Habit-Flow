// app/api/users/route.ts
export async function GET(req: Request) {
  try {
    const response = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // For debugging

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid API response structure");
    }

    // Map Clerk's response to our fields
    const users = data.map((user: any) => ({
      clerkUserId: user.id,
      emailAddress: user.email_addresses?.[0]?.email_address || "No email",
      role: user.public_metadata?.role || "user",
      active: !user.banned, // active is true if the user is not banned
      firstName: user.first_name || "No name",
    }));

    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();

    if (!userId || (action !== "ban" && action !== "unban")) {
      return new Response(JSON.stringify({ error: "Invalid request parameters" }), { status: 400 });
    }

    const endpoint =
      action === "ban"
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
      return new Response(JSON.stringify({ error: errorData.error || `Failed to ${action} user` }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: `User ${action}ned successfully` }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
