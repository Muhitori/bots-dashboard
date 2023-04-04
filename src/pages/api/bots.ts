import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/DBConnect";
import { statistics } from "../../../lib/models/spletnik/Statistics";
import { bot } from "../../../lib/models/Bot";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			try {
				const bots = await bot.find({});

				const data = await Promise.all(
					bots.map(async ({ botName, token }) => {
						const endDate = new Date();
						const startDate = new Date(
							endDate.getTime() - 7 * 24 * 60 * 60 * 1000
						);

						const usersCount = await statistics.aggregate([
							{
								$match: {
									botName,
								},
							},
							{ $group: { _id: "$username" } },
							{ $count: "total" },
						]);

						const activeUsersCount = await statistics.aggregate([
							{
								$match: {
									botName,
									createdAt: {
										$gte: startDate,
										$lt: endDate,
									},
								},
							},
							{ $group: { _id: "$username" } },
							{ $count: "total" },
						]);

						return {
							botName,
							token,
							activeUsersCount: activeUsersCount[0]?.total || 0,
							usersCount: usersCount[0]?.total || 0,
						};
					})
				);

				res.status(200).json({ success: true, data });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const data = await bot.create(req.body);
				res.status(201).json({ success: true, data });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
