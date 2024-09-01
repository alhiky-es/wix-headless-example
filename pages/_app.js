import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import styles from "@/styles/app.module.css";

import LoginBar from "./members";
import Toast from "@/src/components/ui/toast";
import React, { useEffect } from "react";
import { checkClientIdAndRemoveSessionIfChanged } from "@/src/utils/check-client-id-change";
import { PageTitle } from "@/src/components/ui/page-title";
import { LoadingProvider } from "@/src/context/loading-context";
import { GlobalLoader } from "@/src/components/global-loader";

const inter = Inter({ subsets: ["latin"] });

/*
 * Main App component for the Wix Headless Examples application.
 *
 * This component sets up the global context providers, handles client ID checks,
 * and renders the main layout including the header, and the current page component.
 */
export default function App({ Component, pageProps }) {
  useEffect(() => {
    checkClientIdAndRemoveSessionIfChanged();
  }, []);

  return (
    <>
      <Head>
        <title>Wix Headless Examples</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingProvider>
        <div className={`${styles.main} ${inter.className}`}>
          <div className={styles.content}>
            <Toast>
              The client IDs provided in the examples are for demonstration
              purposes only. Please use your own client ID that can be found{" "}
              <Link
                href={
                  "https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Foauth-apps-settings"
                }
                target={"_blank"}
                style={{ color: "#116DFF" }}
              >
                here
              </Link>
              . Edit the file <code>constants/constants.js</code> and replace
              the value of CLIENT_ID with your own client ID.{" "}
              <Link
                href={
                  "https://dev.wix.com/docs/go-headless/getting-started/setup/authentication/create-an-oauth-app-for-visitors-and-members"
                }
                target={"_blank"}
                style={{ color: "#116DFF" }}
              >
                Learn more about creating an OAuth app
              </Link>
              .
            </Toast>
            <header>
              <Link href="/">
                <Image
                  src="/wix.svg"
                  alt="Wix Logo"
                  width={88}
                  height={34}
                  priority
                />
              </Link>
              <LoginBar />
            </header>
            {pageProps.title && (
              <PageTitle title={pageProps.title} withBackButton={true} />
            )}
            <GlobalLoader />
            <Component {...pageProps} />
          </div>
          {/*<Examples />*/}
        </div>
      </LoadingProvider>
    </>
  );
}
