import "../styles/index.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import API_MANAGER, { HELPERS } from "./api";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [siteSetting, setSiteSettings] = useState({});
  const routes = [
    "privacy-policy",
    "terms-conditions",
    "responsible-gaming",
    "support",
    "404",
  ];
  const getSiteSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setSiteSettings(decryptedData);
    } catch (e) {}
  };
  const IsTokenValid = () => {
    const path = router?.pathname?.split("/");

    let hashcode = localStorage.getItem("hashcode");
    if (!hashcode) {
      if (
        !routes?.includes(path[1]) &&
        path?.[1] !== "login" &&
        path?.[1] !== "" &&
        path?.[1] !== "privacy-policy" &&
        path?.[1] !== "terms-conditions" &&
        path?.[1] !== "responsible-gaming" &&
        path?.[1] !== "refund-policy" &&
        path?.[1] !== "support"
      ) {
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    getSiteSettings();
    IsTokenValid();
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" href="/wavelogo.png" />

        <title>Wave Game| Play And Win Real Cash</title>
        <meta property="og:title" content={"Wave Game"} />
        <meta name="robots" content="index, follow" />

        <meta
          name="keywords"
          content="Wave Game | Ludo | Gaming | Wave Game | wavegame.in | Wave Game Jaipur"
        />
        <meta name="twitter:card" content="Wave Game" />
        <meta name="description" content={"Wave Game: a gaming platform."} />
        <meta
          property="og:description"
          content="Wave Game: a gaming platform."
        />
        <meta
          name="twitter:description"
          content="Wave Game: a gaming platform."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="url" content={`https://starludo.club`} />
        <meta property="og:image" content="/wavelogo.png" />
        <meta property="og:url" content="https://starludo.club" />
        <meta name="twitter:url" content="https://starludo.club" />
        <link rel="canonical" href="https://starludo.club" />
        <meta name="author" content="Wave Game" />
        <meta property="og:type" content="website" />
        <meta name="twitter:type" content="summary" />
        <meta property="og:locale" content="English" />
        <meta property="og:site_name" content="Wave Game" />
        <meta name="og:email" content="support@starludo.club" />
        <meta name="og:phone_number" content="+91 9667175604" />
        <meta name="og:latitude" content="26.9124" />
        <meta name="og:longitude" content="75.7873" />
        <meta name="og:street-address" content="US" />
        <meta name="og:locality" content="IN" />
        <meta name="og:region" content="IN" />
        <meta name="og:postal-code" content="302001" />
        <meta name="og:country-name" content="IN" />
      </Head>
      <StyledComponentsRegistry>
        <Component {...pageProps} />

        {/* <a
          href={`https://api.whatsapp.com/send?phone=+91${siteSetting?.whatsappNumber}&text=Hello`}
          class="float"
          target="_blank"
          // style={{ position: "absolute", bottom: "20px", right: "20px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            fill="currentColor"
            class="bi bi-whatsapp  my-float"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a> */}
      </StyledComponentsRegistry>
      {/* <script src="//in.fw-cdn.com/32181230/1164002.js" chat="true"></script> */}
    </>
  );
}
