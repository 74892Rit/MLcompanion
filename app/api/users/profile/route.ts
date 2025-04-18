import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import User from "@/database/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get user email from session
    const userEmail = session.user.email;

    // Find user by email
    const user = await User.findOne({ email: userEmail }).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get user email from session
    const userEmail = session.user.email;

    // Get request body
    const body = await req.json();

    const { name, username, location, bio, skills, projects, achievements } =
      body;

    // Basic validation
    if (username && username.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Username must be at least 3 characters long",
        },
        { status: 400 }
      );
    }

    // Find user and update
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        name,
        username,
        location,
        bio,
        skills,
        projects,
        achievements,
        // Don't update email or role here for security
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Check for duplicate key error (e.g., username already exists)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    ) {
    

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get user email from session
    const userEmail = session.user.email;

    // Get request body for confirmation
    const body = await req.json();
    const { confirmDelete } = body;

    if (!confirmDelete) {
      return NextResponse.json(
        {
          success: false,
          message: "Confirmation required for account deletion",
        },
        { status: 400 }
      );
    }

    // Find user and delete
    const deletedUser = await User.findOneAndDelete({ email: userEmail });

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
