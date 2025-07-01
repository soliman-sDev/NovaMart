import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/store";
import { ThemeProvider } from "next-themes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <ThemeProvider enableSystem={true} attribute="class">
                <Component {...pageProps} />
              </ThemeProvider>
            </Auth>
          ) : (
            <ThemeProvider enableSystem={true} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
export default MyApp;