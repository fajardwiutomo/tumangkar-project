// Using ES6 imports
import mongoose from 'mongoose';

const connection: { isConnected?: number} = {};

async function dbConnect() {
    if (connection.isConnected) {
        // Use current db connection
        return;
    }

    console.log("Connecting to MongoDB...");
    // Use new db connection
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log(`MongoDB connected with state: ${connection.isConnected}`);
}

export default dbConnect;