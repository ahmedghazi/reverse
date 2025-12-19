import "./styles/tailwind.css";
import "./styles/index.scss";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
// import { getSettings } from "./sanity-api/sanity-queries";
import { LocaleContextProvider } from "./context/LocaleContext";
import { getSettings } from "./sanity-api/sanity-queries";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import FaviconLetter from "./components/ui/FaviconLetter";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const { isEnabled } = await draftMode();

  return (
    <html lang='fr'>
      <body className={"is-loading"}>
        <div id='page'>
          <LocaleContextProvider>
            <PageContextProvider>
              {settings && <Header settings={settings} />}
              <main>{children}</main>
              <Footer settings={settings} />
              {isEnabled && (
                <VisualEditing
                  zIndex={1000} // Optional
                />
              )}
              <FaviconLetter letter='R' />
            </PageContextProvider>
          </LocaleContextProvider>
        </div>
      </body>
    </html>
  );
}
