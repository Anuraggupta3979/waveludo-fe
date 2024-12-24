import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReferHistory from "../components/history/ReferHistory";
import API_MANAGER, { HELPERS } from "./api";
import Head from "next/head";
import Layout from "@/components/layout";
function ReferHistoryPage() {
  const [user, setUser] = useState({});

  const userDetail = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);
      setUser(decryptedData);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    userDetail();
  }, []);
  return (
    <>
      <Head>
        <meta property="og:title" content="History" />
        <title>History</title>
        <meta
          name="keywords"
          content="Wave Game History | Ludo History | Gaming | Wave Game.in History | wavegame.in History| Wave Game Jaipur History"
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
        <meta name="url" content={`https://starludo.club/history`} />
        <meta property="og:image" content="/wavelogo.png" />
        <meta property="og:url" content="https://starludo.club" />
        <meta name="twitter:url" content="https://starludo.club" />
        <link rel="canonical" href="https://starludo.club" />
        <meta name="author" content="Wave Game" />
        <meta property="og:type" content="website" />
        <meta name="twitter:type" content="summary" />
        <meta property="og:locale" content="English" />
        <meta property="og:site_name" content="Wave Game" />
        <meta name="og:email" content="mskanwar5604@gmail.com" />
        <meta name="og:phone_number" content="+91 9667175604" />
        <meta name="og:latitude" content="26.9124" />
        <meta name="og:longitude" content="75.7873" />
        <meta name="og:street-address" content="US" />
        <meta name="og:locality" content="IN" />
        <meta name="og:region" content="IN" />
        <meta name="og:postal-code" content="302001" />
        <meta name="og:country-name" content="IN" />
      </Head>
      <Layout page={"Refer History"}>
        <div className="history_container">
          <div className="historyContentContainer">
            <div className="content_container">
              <div className="pageContent">
                <ReferHistory user={user} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>

    // </Layout>
  );
}

export default ReferHistoryPage;
