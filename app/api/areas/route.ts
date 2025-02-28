import connectToDB from "@/app/lib/conntectToDB";
import Area from "@/app/Models/AreaSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { name, icon, clerkUserId } = await req.json();

    const area = new Area({
      name,
      icon,
      clerkUserId,
    });

    console.log(area);

    const savedArea = await area.save();

    return NextResponse.json({ area: savedArea });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDB();
    const areas = await Area.find({ clerkUserId: clerkId });
    return NextResponse.json({ areas: areas });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: any) {
  try {
    const { areaId } = await request.json(); // Get projectId from the request body
    // Get clerkId from the query parameters

    const areaToDelete = await Area.findOneAndDelete({
      _id: areaId,
    });

    if (!areaToDelete) {
      return NextResponse.json({ message: "area not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Area deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request: any) {
  try {
    const areaId = request.nextUrl.searchParams.get("areaId");
    const { name, icon } = await request.json();

    if (!areaId) {
      return NextResponse.json(
        { message: "area ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find the habit by habitId and update it
    const updateArea = await Area.findOneAndUpdate(
      { _id: areaId },
      {
        $set: {
          name,
          icon,
        },
      },
      { returnDocument: "after" } // Return the updated document
    );

    console.log(updateArea);

    return NextResponse.json({
      message: "Area has been updated successfully",
      habit: updateArea.value,
    });
  } catch (error) {
    console.error("Error updating area:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the area" },
      { status: 500 }
    );
  }
}
