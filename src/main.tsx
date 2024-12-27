import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";
import { HashRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </I18nextProvider>
      </Provider>
    </HashRouter>
  </StrictMode>
);
