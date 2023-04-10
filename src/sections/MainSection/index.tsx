import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { snackbarGenerator } from "@/components/SnackbarGenerator";
import { LoadingComponent } from "@/components/LoadingComponent";

import type { IBot } from "../../../lib/models/Bot";

type RenderBotData = IBot & { activeUsersCount: number; usersCount: number };

interface ArticleProps {
	label: string;
	value: string | number;
}

const Article: FC<ArticleProps> = ({ label, value }) => {
	return (
		<Box display='flex' gap={2}>
			<Typography variant='h6'>{label}:</Typography>
			<Typography variant='h6'>{value}</Typography>
		</Box>
	);
};

export const MainSection = () => {
	const [bots, setBots] = useState<RenderBotData[]>([]);

	useEffect(() => {
		const effect = async () => {
			const {
				data: { data: bots },
			} = await axios.get("/api/bots");

			setBots(bots);
		};

		effect();
	}, []);

	const testHandler = async () => {
		await axios.post("/api/bots", { botName: "test", token: "test" });
	};

	const snackHandler = () => snackbarGenerator.info("test");

	return (
		<Container>
			<Typography textAlign='center' variant='h1'>
				Main page
			</Typography>
			<Button onClick={testHandler} variant='outlined'>
				Create test
			</Button>

			<Button onClick={snackHandler} variant='outlined'>
				Create notification
			</Button>

			{Boolean(bots.length) ? (
				bots.map(({ botName, token, activeUsersCount, usersCount }, index) => (
					<Box
						key={`${botName}-${index}`}
						display='flex'
						flexDirection='column'
						border='1px solid black'
						gap={2}
						my={1}>
						<Article label='Bot name' value={botName} />
						<Article label='Bot token' value={token} />
						<Article label='Total users' value={usersCount} />
						<Article label='Active users' value={activeUsersCount} />
					</Box>
				))
			) : (
				<LoadingComponent />
			)}
		</Container>
	);
};
