import mongoose from "mongoose";

export const connections = {
	spletnik: mongoose.createConnection(process.env.SPLETNIK_URI as string),
};
