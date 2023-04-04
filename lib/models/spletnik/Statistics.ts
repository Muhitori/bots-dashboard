import mongoose from "mongoose";
import { connections } from "../../connections";

if (!connections.spletnik) {
	throw new Error("Spletnik DB is not specified");
}

export interface IStatistics {
	action: "find_rumor" | "add_rumor";
	userId: number;
	username: string;
	botName: string;
	createdAt: string;
}

const statisticsSchema = new mongoose.Schema(
	{
		action: String,
		userId: Number,
		username: String,
		botName: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const statistics = connections.spletnik.model(
	"Statistics",
	statisticsSchema,
	"Statistics"
);
