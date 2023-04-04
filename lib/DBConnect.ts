import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("DB is not specified");
}

mongoose.set("bufferCommands", true);

const dbConnect = async () => mongoose.connect(MONGODB_URI);

export default dbConnect;
