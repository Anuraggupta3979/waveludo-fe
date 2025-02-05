import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import { Col, Row, Divider } from "antd";
import MoneyIcon from "../Assets/rupeeIcon.gif";
import Image from "next/image";

function GSTPolicy() {
  let amount = 100;
  return (
    <>
      <Head>
        <meta property="og:title" content="GST Policy" />
        <title>GST Policy</title>
        <meta
          name="keywords"
          content="WaveGame GST Policy | Ludo  GST Policy | Gaming | WaveGame.in  GST Policy | WaveGame.club  GST Policy| WaveGame Jaipur  GST Policy"
        />
        <meta name="twitter:card" content="WaveGame" />
        <meta name="description" content={"WaveGame: a gaming platform."} />
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
        <meta name="url" content={`https://WaveGame.club/gst-policy`} />
        <meta property="og:image" content="/WaveGamelogo.png" />
        <meta property="og:url" content="https://WaveGame.club" />
        <meta name="twitter:url" content="https://WaveGame.club" />
        <link rel="canonical" href="https://WaveGame.club" />
        <meta name="author" content="WaveGame" />
        <meta property="og:type" content="website" />
        <meta name="twitter:type" content="summary" />
        <meta property="og:locale" content="English" />
        <meta property="og:site_name" content="WaveGame" />
        <meta name="og:email" content="msgurjar1992@gmail.com" />
        <meta name="og:phone_number" content="+91 9667175604" />
        <meta name="og:latitude" content="26.9124" />
        <meta name="og:longitude" content="75.7873" />
        <meta name="og:street-address" content="US" />
        <meta name="og:locality" content="IN" />
        <meta name="og:region" content="IN" />
        <meta name="og:postal-code" content="302001" />
        <meta name="og:country-name" content="IN" />
      </Head>
      <Layout page="GST Policy">
        <div className="rulesContainer">
          <p className="desc">
            From <b>1st October 2023</b>, New <b>28%</b> Government Tax (GST) is
            applicable on the deposits.
          </p>
          <h3 className="heading">Let's understand the new GST regime..</h3>
          <p className="desc">
            If a player deposits <b>Rs.100</b> to play a game, there will be
            inclusive
            <b>28%</b> GST levied on the deposit amount, and the user will need
            to complete a transaction of <b>Rs. 100</b>{" "}
            {`(Rs. 78.13 + 28% of Rs.
            78.13). Thus, Rs. 100 will be settled in the user’s deposit wallet
            and the Rs. 21.88 will be accounted for GST paid.`}{" "}
            Exact <b>GST amount</b> will be credited into user Bonus wallet. The
            details of GST paid by the user can be viewed in the View
            Transactions on the application.
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  {`Deposit Amount (excl. Govt. Tax)`}{" "}
                  <span className="payment_option_box">A</span>
                </p>
              </Col>
              <Col>
                <Row align={"middle"} gutter={4}>
                  <Col>
                    <Image
                      style={{ marginTop: "4px" }}
                      height={16}
                      src={MoneyIcon}
                      alt="rs"
                    />
                  </Col>
                  <Col>
                    <p className="payment_desc payment_desc_green">
                      {(Number(amount) / (1 + 0.28)).toFixed(2)}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">Govt. Tax. (28% GST)</p>
              </Col>
              <Col>
                <Row align={"middle"} gutter={4}>
                  <Col>
                    <Image
                      style={{ marginTop: "4px" }}
                      height={16}
                      src={MoneyIcon}
                      alt="rs"
                    />
                  </Col>
                  <Col>
                    <p className="payment_desc">
                      {(Number(amount) - Number(amount) / (1 + 0.28)).toFixed(
                        2
                      )}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">Total</p>
              </Col>
              <Col>
                <Row align={"middle"} gutter={4}>
                  <Col>
                    <Image
                      style={{ marginTop: "4px" }}
                      height={16}
                      src={MoneyIcon}
                      alt="rs"
                    />
                  </Col>
                  <Col>
                    <p className="payment_desc">{Number(amount)?.toFixed(2)}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Deposit Cashback Bonus{" "}
                  <span className="payment_option_box">B</span>
                </p>
              </Col>
              <Col>
                <Row align={"middle"} gutter={4}>
                  <Col>
                    <Image
                      style={{ marginTop: "4px" }}
                      height={16}
                      src={MoneyIcon}
                      alt="rs"
                    />
                  </Col>
                  <Col>
                    <p className="payment_desc payment_desc_green">
                      {(Number(amount) - Number(amount) / (1 + 0.28)).toFixed(
                        2
                      )}{" "}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Add To Wallet Balance{" "}
                  <span className="payment_option_box">A</span>
                  {" + "}
                  <span className="payment_option_box">B</span>{" "}
                </p>
              </Col>
              <Col>
                <Row align={"middle"} gutter={4}>
                  <Col>
                    <Image
                      style={{ marginTop: "4px" }}
                      height={16}
                      src={MoneyIcon}
                      alt="rs"
                    />
                  </Col>
                  <Col>
                    <p className="payment_desc payment_desc_green">
                      {Number(amount)?.toFixed(2)}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default GSTPolicy;
