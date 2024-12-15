
import dbConnect from "@/app/lib/db";
import User from "@/app/models/Users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username } = await req.json();
    const user = await User?.findOne({ username }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
