'use server'

import Stock from "@/app/models/Stock";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";

export async function GET(req: Request) {
    try {
        console.log("Search query:=====>", req);
        await dbConnect();

        const { search } = Object.fromEntries(new URL(req.url).searchParams);

        if (!search) {
            return NextResponse.json(
                { error: "Search query must be at least 2 characters long" },
                { status: 400 }
            );
        }

        // Gunakan regex yang lebih longgar (cocokkan dengan substring apapun)
        const regex = new RegExp(search, "i"); // Mencocokkan case-insensitive

        const stocks = await Stock.find(

            {
                name: { $regex: regex },
            }

        );

        return NextResponse.json(
            { message: "Stocks retrieved successfully", stocks },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error searching stocks:", error);
        return NextResponse.json({ error: "Failed to search stocks" }, { status: 500 });
    }
}