import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import API_MANAGER, { HELPERS } from "./api";
import OrderHistoryImage from "../Assets/order-history.png";
import Head from "next/head";
import Image from "next/image";
import RupeeIcon from "../Assets/rupeeIcon.gif";
function MyWallet() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const numberWithCommas = (number) => {
    var parts = number.toString().split(".");
    if (parts?.length > 0) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return number;
  };
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
        <meta property="og:title" content="Wallet" />
        <title>Wallet</title>
        <meta
          name="keywords"
          content="Wave Game Wallet | Ludo Wallet | Gaming | Wave Game.in Wallet | wavegame.in Wallet| Wave Game Jaipur Wallet"
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
        <meta name="url" content={`https://starludo.club/wallet`} />
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
        <div className="walletContainer">
          <Row justify={"end"} className="mb-24">
            <Col span={24}>
              <Button
                className="primary_button3 w-100"
                onClick={() => router.push("/transaction-history")}
              >
                <Row align={"middle"} gutter={8} justify={"center"}>
                  <Col>
                    <Image src={OrderHistoryImage} width={24} />
                  </Col>
                  <Col>Order History</Col>
                </Row>
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <div className="walletCard cashCard">
                <Row
                  justify={"space-between"}
                  // align={"middle"}
                  className=""
                >
                  <Col span={24}>
                    <p className="amount">
                      <Image
                        src={RupeeIcon}
                        alt="rupee"
                        width={28}
                        style={{ marginTop: "-4px" }}
                      />
                      {numberWithCommas(
                        user?.Wallet_balance
                          ? user?.Wallet_balance?.toFixed(2)
                          : 0
                      )}
                    </p>
                    <p className="title">Deposit Cash</p>
                  </Col>
                  <p className="desc">
                    Can be used to play Tournaments & Battles. Cannot be
                    withdrawn to Paytm or Bank.
                  </p>
                  {/* <Row justify={"center"}> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: "24px",
                    }}
                  >
                    <Button
                      className="primary_button2"
                      onClick={() => router.push("/addcash")}
                    >
                      ADD CASH
                    </Button>
                  </div>
                  {/* </Row> */}
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="walletCard withDrawCard">
                <Row justify={"space-between"} align={"middle"}>
                  <Col span={24}>
                    <p className="amount">
                      <Image
                        src={RupeeIcon}
                        alt="rupee"
                        width={28}
                        style={{ marginTop: "-4px" }}
                      />
                      {numberWithCommas(
                        user?.withdrawAmount
                          ? user?.withdrawAmount?.toFixed(2)
                          : 0
                      )}
                    </p>
                    <p className="title">Winning Cash</p>
                  </Col>
                  <p className="desc">
                    Can be withdrawn to Paytm or Bank. Can be used to play
                    Tournaments & Battles.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: "24px",
                    }}
                  >
                    <Button
                      className="primary_button2 "
                      onClick={() => router.push("/withdraw")}
                    >
                      WITHDRAW
                    </Button>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

export default MyWallet;
