import {QueryClient, QueryClientProvider} from "react-query";
import Error from "next/error";

function MyApp({ Component, pageProps }) {
    const queryClient = new QueryClient();

    if (pageProps.err) {
        return <Error statusCode={pageProps.err.statusCode} />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp