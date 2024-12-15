import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/Users";
import dbConnect from "@/app/lib/db";

export async function POST(req: Request) {
    const { username, password } = await req.json();
    
    const isValidUsername = username && username.length > 0;
    const isValidPassword = password && password.length > 0;

    if (!isValidUsername || !isValidPassword) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
    }

    await dbConnect();

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}