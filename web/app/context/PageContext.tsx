"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import useDeviceDetect from "../hooks/useDeviceDetect";
// import { getSettings } from "../utils/sanity-queries";

const PageContext = createContext({});

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children } = props;
  const pathname = usePathname();
  // console.log(pathname);
  const [isInfos, setIsInfos] = useState<boolean>(false);
  const settings = {
    pathname,
  };
  const { browser } = useDeviceDetect();

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);
    const token = subscribe("LOTTIE_READY", (msg: string, data: any) => {});

    setTimeout(() => {
      document.body.classList.remove("is-loading");
      publish("DOC_READY");
    }, 1000);

    return () => {
      window.removeEventListener("resize", _format);
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    if (browser) document.documentElement.classList.add(`is-${browser}`);
  }, [browser]);

  const _format = () => {
    // const wh = window.innerHeight;

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    const header = document.querySelector("header");
    let headerBounding = { height: 50 };
    if (header) {
      headerBounding = header.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--header-height",
        headerBounding.height + "px"
      );
    }
  };

  return (
    <PageContext.Provider value={{ settings, isInfos, setIsInfos }}>
      {children}
    </PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
