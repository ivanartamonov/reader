import {QueryClient, QueryClientProvider} from "react-query";
import Error from "next/error";
import ThemeProvider from "../components/ThemeProvider";

function MyApp({ Component, pageProps }) {
    const queryClient = new QueryClient();

    if (pageProps.err) {
        return <Error statusCode={pageProps.err.statusCode} />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default MyApp