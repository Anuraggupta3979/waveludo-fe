import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { Row, Form, Input, Button, Col, Divider, message, Tooltip } from "antd";
import axios from "axios";
import loadingImg from "../../Assets/loading_old.gif";
import API_MANAGER from "../api";
import Head from "next/head";

function ClassicLudoGame() {
  const router = useRouter();
  const { game_id, sToken } = router.query;
  let navigate = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        navigate.back();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const enterFullScreen = async () => {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } catch (err) {
        console.error("Error attempting to enable full-screen mode:", err);
      }
    };

    enterFullScreen();

    if (!sessionStorage.getItem("firstLoadDone")) {
      sessionStorage.setItem("firstLoadDone", "true");
    } else {
      navigate.back();
    }
    return () => {
      sessionStorage.removeItem("firstLoadDone");
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.error(err));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta property="og:title" content="Ludo 57" />
        <title>Wave Game</title>
        <meta
          name="keywords"
          content="Wave Game Ludo 57 | Ludo Ludo 57 | Gaming | Wave Game.in Ludo 57 | wavegame.in Ludo 57| Wave Game Jaipur Ludo 57"
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
        <meta name="url" content={`https://wavegame.in/tournaments`} />
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
      <Layout isTournament={true}>
        <div className="starludo-classicgame">
          {game_id && sToken && (
            <div className="starludo-classicgame-iframe">
              <iframe
                id="mainframe"
                src={`https://stargame.starludo.club/?sGameId=${game_id}&sUserToken=${sToken}`}
              ></iframe>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ClassicLudoGame;
