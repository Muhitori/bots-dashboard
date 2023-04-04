import mongoose from "mongoose";

export interface IBot {
	botName: string;
	token: string;
}

const botSchema = new mongoose.Schema({
	botName: String,
	token: String,
});

export const bot =
	mongoose.models.Bot || mongoose.model("Bot", botSchema, "Bot");
