import {useState} from 'react'
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";

import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import GlobalStyles from "../components/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  // where cache and request defaults can be stored and accesed from
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <GlobalStyles />
          <Layout preview={pageProps.preview}>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
