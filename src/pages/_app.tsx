import type { AppType } from "next/app";
import React, { useState } from "react";
import "@/src/styles/globals.css";
import AppLayout from "../core/layouts/App";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const App: AppType = ({ Component, pageProps }) => {
  const [superbaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={superbaseClient}
      //@ts-ignore
      initialSession={pageProps.initialSession}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionContextProvider>
  );
};

export default App;
