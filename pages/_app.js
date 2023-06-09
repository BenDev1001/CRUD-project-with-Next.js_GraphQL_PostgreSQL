import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { CssBaseline } from '@mui/material';

const lightTheme = createTheme({
  type: 'light',
  theme: {
     colors: {},
  },
});


const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
         }}
      >
        <CssBaseline />
        <NextUIProvider>
              <Component {...pageProps} />
        </NextUIProvider>

      </NextThemesProvider>
    </ApolloProvider>
  );
}

export default MyApp;
