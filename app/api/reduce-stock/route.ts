'use server';

import Stock from "@/app/models/Stock";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";

export async function DELETE(req: Request) {
    try {
        await dbConnect();

        const { stockId, quantity } = await req.json();

        if (!stockId || !quantity || quantity <= 0) {
            return NextResponse.json(
                { error: "Invalid request data" },
                { status: 400 }
            );
        }

        const stock = await Stock.findById(stockId);

        if (!stock) {
            return NextResponse.json(
                { error: "Stock item not found" },
                { status: 404 }
            );
        }

        if (stock.quantity < quantity) {
            return NextResponse.json(
                { error: "Insufficient stock available" },
                { status: 400 }
            );
        }

        // Kurangi stok
        stock.quantity -= quantity;
        await stock.save();

        return NextResponse.json(
            { message: "Stock reduced successfully", updatedStock: stock },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error reducing stock:", error);
        return NextResponse.json({ error: "Failed to reduce stock" }, { status: 500 });
    }
}
