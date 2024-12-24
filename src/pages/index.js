import Head from "next/head";
import Header from "../components/layout/Header";
import { Carousel, Col, Row, message } from "antd";
import Layout from "@/components/layout";
import Image from "next/image";
import ClassicImage from "../Assets/LudoClassic.png";
import ManualImage from "../Assets/home/classic.png";
import LudoCover from "../Assets/Ludo_cover.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API_MANAGER, { HELPERS } from "./api";

export default function Home() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [siteSetting, setSiteSettings] = useState({});

  const IsTokenValid = () => {
    const path = router?.pathname?.split("/");
    let hashcode = localStorage.getItem("hashcode");
    if (!hashcode) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  const getSiteSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      const decryptedData = HELPERS.decrypt(response?.data?.data);
      setSiteSettings(decryptedData);
    } catch (e) {
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    IsTokenValid();
    getSiteSettings();
  }, []);

  return (
    <div>
      <Head>
        <meta property="og:title" content="Wave Game" />
        <title>Wave Game| Play And Win Real Cash</title>
        <meta
          name="keywords"
          content="Wave Game | Ludo | Gaming | WAVEGAME | wavegame.in | Wave Game Play "
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
        <meta name="url" content={`https://ludo.com`} />
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
      <Layout>
        <div className="tournaments_container">
          {siteSetting?.homePageMsg && (
            <div className="notification_alert_container">
              ◉ {siteSetting?.homePageMsg}
            </div>
          )}

          <Row gutter={20}>
            {/* <Col span={12}>
              <a href="../Assets/base.apk" download="starludo.apk">
                <div className="youtube_container downloadContainer">
                  <div style={{ textAlign: "center" }}>
                    <p>Download App</p>
                    <Image src={AndroidIcon} />
                  </div>
                </div>
              </a>
            </Col> */}
          </Row>
          <div>
            <Carousel autoplay dots={false}>
              <div>
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={LudoCover}
                />
              </div>
              <div>
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={LudoCover}
                />
              </div>
              <div>
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={LudoCover}
                />
              </div>
              <div>
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={LudoCover}
                />
              </div>
            </Carousel>
            <div className="tournaments">
              <h2 className="tournaments_heading">OUR TOURNAMENTS</h2>
              <div className="ludo_game_container w-100">
                <Image
                  src={ManualImage}
                  alt="manual room code"
                  className="home_image"
                  onClick={() =>
                    router.push(
                      isValid ? "/tournaments/ludo-classic" : "/login"
                    )
                  }
                />
                <div className="blink_container">Live</div>
              </div>
            </div>
            <div className="mt-24">
              <p className="about_heading"> About Us</p>
              <p className="about_desc">
                {`WAVEGAME is a skill based gaming product owned and operated by
                STARVISTAR GAMING LLP ("STARVISTAR GAMING LLP" or "We" or "Us" or
                "Our").`}
              </p>
              <p className="about_heading">Our Business & Products</p>
              <p className="about_desc">
                We are an HTML5 game-publishing company and our mission is to
                make accessing games fast and easy by removing the friction of
                app-installs.
              </p>{" "}
              <p className="about_desc">
                WAVEGAME is a skill based gaming platform accessible only for
                our users in India. It is accessible on
                <a href="https://starludo.club/">https://starludo.club/</a>. On
                WAVEGAME, users can compete for real cash in Tournaments and
                Battles. They can encash their winnings via popular options such
                as Paytm Wallet, Amazon Pay, Bank Transfer, Mobile Recharges
                etc.
              </p>
              <p className="about_heading">Our Games</p>
              <p className="about_desc">
                WAVEGAME has a wide-variety of high-quality, premium HTML5
                games. Our games are especially compressed and optimised to work
                on low-end devices, uncommon browsers, and patchy internet
                speeds.
              </p>
              <p className="about_desc">
                We have games across several popular categories: Arcade, Action,
                Adventure, Sports & Racing, Strategy, Puzzle & Logic. We also
                have a strong portfolio of multiplayer games such as Ludo,
                Chess, 8 Ball Pool, Carrom, Tic Tac Toe, Archery, Quiz, Chinese
                Checkers and more! Some of our popular titles are: Escape Run,
                Bubble Wipeout, Tower Twist, Cricket Gunda, Ludo With Friends.
                If you have any suggestions around new games that we should add
                or if you are a game developer yourself and want to work with
                us, don't hesitate to drop in a line at{" "}
                <a href="mailto:mskanwar5604@gmail.com">
                  mskanwar5604@gmail.com
                </a>
                !
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
