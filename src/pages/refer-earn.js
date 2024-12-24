import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { Row, Col, Button, Form, Input, message, Tooltip } from "antd";
import API_MANAGER, { HELPERS } from "./api";
import Image from "next/image";
import InfoIcon from "../Assets/info.png";
import { CopyOutlined } from "@ant-design/icons";
import Head from "next/head";
import EarnIcon from "../Assets/earn.gif";
function ReferEarn() {
  const [user, setUser] = useState({});
  const [referralTotalCount, setReferralTotalCount] = useState(0);
  const numberWithCommas = (number) => {
    var parts = number.toString().split(".");
    if (parts?.length > 0) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return number;
  };
  const referralCount = async (referral_code) => {
    try {
      const response = await API_MANAGER.referralCount(referral_code);
      // setUser(response?.data?.data);
      setReferralTotalCount(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const userDetail = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);
      setUser(decryptedData);
      if (decryptedData?.referral_code) {
        referralCount(decryptedData?.referral_code);
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    userDetail();
  }, []);
  const handleSubmit = async (value) => {
    if (value?.amount >= 95 && value?.amount <= 10000) {
      const params = {
        amount: parseInt(value?.amount),
      };
      try {
        const response = await API_MANAGER.postRedeem(params);
        message.success("Redeem successfully!");
      } catch (error) {
        message.error(
          "You don't have sufficient amount or something went wrong!"
        );
      }
    } else if (value?.amount < 95) {
      message.error("Minimum withdrawal amount ₹95");
    } else if (value?.amount > 10000) {
      message.error("Maximum withdrawal amount ₹10,000");
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Play Ludo and earn *₹10000* daily. *5% commission for all game (referral bonus 2%)* . https://starludo.club/login?referral_code=${user?.referral_code}  Register Now, My refer code is ${user?.referral_code}`
    );
    message.success("Referral code copied!");
  };
  const [copied, setCopied] = useState(false);
  const link = `Play Ludo and earn *₹10000* daily. *5% commission for all game (referral bonus 2%)* . https://starludo.club/login?referral_code=${user?.referral_code}  Register Now, My refer code is ${user?.referral_code}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <>
      <Head>
        <meta property="og:title" content="Refer Earn" />
        <title>Refer Earn</title>
        <meta
          name="keywords"
          content="Wave Game Refer Earn | Ludo Refer Earn | Gaming | Wave Game.in Refer Earn | wavegame.in Refer Earn| Wave Game Jaipur Refer Earn"
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
        <meta name="url" content={`https://starludo.club/refer-earn`} />
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
      <Layout page={""}>
        <div className="refer_container">
          <div className="refer_card card1">
            <Row justify={"center"}>
              <Col>
                <Image src={EarnIcon} alt="earn" width={100} />
              </Col>
            </Row>
            <p className="earn_heading">Earn Now Unlimited 🥳</p>

            <p className="desc" style={{ fontWeight: 700 }}>
              Refer & Earn 2%
            </p>
            {/* <Row
              justify={"center"}
              align={"middle"}
              className="mb-24"
              gutter={8}
            >
              <Col className="rules">Rules</Col>
              <Col>
                <Tooltip title="You get 4% Commission your referral's winnings.">
                  <Image src={InfoIcon} alt="info" />
                </Tooltip>
              </Col>
            </Row> */}
            <Row justify={"center"} align={"middle"} gutter={4}>
              <Col className="subDesc">Your Refer Code: </Col>
              <Col className="subDesc">
                <span>
                  {user?.referral_code}{" "}
                  <CopyOutlined
                    className="cursor-pointer"
                    onClick={handleCopy}
                  />
                </span>
              </Col>
            </Row>
            <Row justify={"center"} align={"middle"} gutter={4}>
              <Col className="subDesc">Total Refers: </Col>
              <Col className="subDesc">
                <span>
                  {numberWithCommas(
                    referralTotalCount ? referralTotalCount : 0
                  )}
                </span>
              </Col>
            </Row>
            <Row justify={"center"} align={"middle"} gutter={4}>
              <Col className="subDesc">Total Earnings: </Col>
              <Col className="subDesc">
                <span>
                  {numberWithCommas(
                    user?.referral_earning
                      ? user?.referral_earning?.toFixed(2)
                      : 0
                  )}
                </span>
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Col>
                <a
                  href={`whatsapp://send?text=Play Ludo and earn *₹10000* daily. *5% commission for all game (referral bonus 2%)* . https://starludo.club/login?referral_code=${user?.referral_code} Register Now, My refer code is ${user?.referral_code}.`}
                >
                  <Button className="whatsappBtn">SHARE ON WHATSAPP</Button>
                </a>
              </Col>
            </Row>
          </div>
          <div className="refer_card">
            <p className="redeem_heading">Redeem Your Refer Balance!</p>
            <p className="desc">
              TDS (0%) will be deducted after annual referral earning of
              ₹15,000.
            </p>
            <Row className="w-100" justify={"center"}>
              <Form className="w-100" onFinish={handleSubmit}>
                <Row justify={"center"} className="w-100">
                  <Col xs={24} md={20} className="w-100">
                    <Form.Item
                      name="amount"
                      rules={[
                        {
                          required: true,
                          message: "Amount is required!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Amount (Min: 100, Max: 10,000)"
                        className="w-100 inputBox"
                        min={100}
                        max={10000}
                        type="number"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"center"} className="w-100">
                  <Form.Item>
                    <Button className="primary_button2" htmlType="submit">
                      REDEEM
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            </Row>
          </div>{" "}
          <div className="refer_card mt-24">
            <p className="redeem_heading">Refer & Earn Rules</p>
            <p className="desc">
              When your friend signs up on Our website or App from your referral
              link.
            </p>
            <p className="commission_title">
              You get 2 % Commission on your referral's winnings.
            </p>
            <p className="commission_desc">
              Suppose your referral plays a battle for ₹10000 Cash, <br />{" "}
              <span>You get ₹200 Cash </span>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ReferEarn;
