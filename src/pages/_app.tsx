import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { store, persistor } from "@/store";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { MAX_SNACK } from "@/utils/constants";
import { SnackbarGenerator } from "@/components/SnackbarGenerator";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SnackbarProvider maxSnack={MAX_SNACK}>
					<CssBaseline />
					<SnackbarGenerator />

					<Component {...pageProps} />
				</SnackbarProvider>
			</PersistGate>
		</Provider>
	);
}
