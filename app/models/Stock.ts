import mongoose, { Document, Model, Schema } from "mongoose";

interface IStock extends Document {
    name: string;
    quantity: number;
    price: number;
    unit: string;
}

const stockSchema: Schema<IStock> = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
}, {
    timestamps: true, // Ditempatkan di sini, sebagai opsi schema
});

const Stock: Model<IStock> = mongoose.models.Stock || mongoose.model<IStock>("Stock", stockSchema);

export default Stock;