import type { NextApiRequest, NextApiResponse } from "next";
import { statistics } from "../../../lib/models/spletnik/Statistics";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { botName } = req.query;

	const endDate = new Date();
	const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

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

	res.status(200).json(activeUsersCount);
}
