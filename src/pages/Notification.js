import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { Row, Col } from "antd";
import Image from "next/image";
import NoDataImage from "../Assets/noData.svg";
import API_MANAGER from "./api";
import Head from "next/head";

function Notification() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await API_MANAGER.getNotification();
      setData(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Head>
        <meta property="og:title" content="Notifications" />
        <title>Notifications</title>
        <meta
          name="keywords"
          content="Wave Game Notifications | Ludo Notifications | Gaming | Wave Game.in Notifications | wavegame.in Notifications| Wave Game Jaipur Notifications"
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
        <meta name="url" content={`https://wavegame.in/Notification`} />
        <meta property="og:image" content="/wavelogo.png" />
        <meta property="og:url" content="https://wavegame.in" />
        <meta name="twitter:url" content="https://wavegame.in" />
        <link rel="canonical" href="https://wavegame.in" />
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

      <Layout page={"Notifications"}>
        <div className="notification_container">
          {/* <div className="noDataContainer">
          <div>
            <Row justify={"center"} align={"middle"}>
              <Image src={NoDataImage} alt="No Data" />
            </Row>
            <Row justify={"center"}>
              <p className="desc">No Recent Notification Yet !</p>
            </Row>
          </div>
        </div> */}
          <ul>
            {data?.map((item, index) => (
              <li className="notificationItem">{item?.message}</li>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  );
}

export default Notification;
