import Stock from "@/app/models/Stock";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const { name, quantity, price, unit } = await req.json();

        console.log("Stock data:", { name, quantity, price, unit });

        // Validasi input
        if (!name || !quantity || !price || !unit) {
            console.log("Required fields missing:", { name, quantity, price, unit });
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create new stock
        const stock = new Stock({
            name,
            quantity,
            price,
            unit,
        });

        await stock.save();

        return NextResponse.json({ message: "Stock created successfully", stock }, { status: 201 });

    } catch (error) {
        console.error("Error creating stock:", error);
        return NextResponse.json({ error: "Failed to create stock" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await dbConnect();
        
        const stocks = await Stock.find(); // Mengambil semua stok dari database

        return NextResponse.json({ message: "Stocks retrieved successfully", stocks }, { status: 200 });

    } catch (error) {
        console.error("Error retrieving stocks:", error);
        return NextResponse.json({ error: "Failed to retrieve stocks" }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        await dbConnect();

        const { id } = await req.json(); // Ambil ID dari request body

        if (!id) {
            return NextResponse.json({ error: "Stock ID is required" }, { status: 400 });
        }

        const stock = await Stock.findById(id);

        if (!stock) {
            return NextResponse.json({ error: "Stock not found" }, { status: 404 });
        }

        await Stock.findByIdAndDelete(id); // Hapus stok dari database

        return NextResponse.json({ message: "Stock deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting stock:", error);
        return NextResponse.json({ error: "Failed to delete stock" }, { status: 500 });
    }
}