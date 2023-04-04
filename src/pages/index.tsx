import Head from "next/head";
import { MainSection } from "@/sections/MainSection";

export default function Home() {
	return (
		<>
			<Head>
				<title>Main page</title>
				<meta name='description' content='Main page' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<MainSection />
			</main>
		</>
	);
}
