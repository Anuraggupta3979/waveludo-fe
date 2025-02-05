import React, { useState, useEffect } from "react";
import { Row, Form, Input, Button, Col, message } from "antd";
import Logo from "../../Assets/layout/wavelogo.png";
import CallIcon from "../../Assets/layout/call.svg";
import OTPICon from "../../Assets/layout/otp.svg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import API_MANAGER from "../api";
import Cookies from "js-cookie";
import Head from "next/head";
import Layout from "@/components/layout";
function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [secretCode, setSecretCode] = useState(null);
  const [counter, setCounter] = useState(0);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleNumberSubmit = async (values) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (re.test(values?.number)) {
      setLoading(true);
      try {
        setPhone(values?.number);
        let param = {
          phone: values?.number,
        };
        if (router?.query?.referral_code) {
          param["referral"] = router?.query?.referral_code;
        }
        const response = await API_MANAGER.login(param);
        setShowOtp(true);
        setCounter(15);
        const binaryData = Buffer.from(response?.data?.data, "base64"); // Decode Base64 to Buffer
        const jsonData = JSON.parse(binaryData.toString());
        setSecretCode(jsonData?.secret);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Something went wrong!");
      }
    } else {
      message.error("Please enter a valid number.");
    }
  };
  const handleVerifyOTP = async (values) => {
    if (values?.otp) {
      try {
        const param = {
          phone: phone,
          twofactor_code: values?.otp,
          secretCode,
        };
        const response = await API_MANAGER.verifyOtp(param);
        setShowOtp(true);

        const binaryData = Buffer.from(response?.data?.data, "base64"); // Decode Base64 to Buffer
        const jsonData = JSON.parse(binaryData.toString());
        localStorage.setItem("hashcode", jsonData?.token?.accessToken);
        router.push("/tournaments");
      } catch (error) {
        message.error("Something went wrong!");
      }
    } else {
      message.error("Please enter a valid OTP!");
    }
  };
  const resendOtp = async () => {
    try {
      let param = {
        phone: phone,
      };
      if (router?.query?.referral_code) {
        param["referral"] = router?.query?.referral_code;
      }
      const response = await API_MANAGER.login(param);
      setCounter(15);
      setSecretCode(response.data.secret);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <>
      <Head>
        <meta property="og:title" content="Login" />
        <title>Login</title>
        <meta
          name="keywords"
          content="Wave Game Login | Ludo Login | Gaming | Wave Game.in Login | wavegame.in Login| Wave Game Jaipur Login"
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
        <meta name="url" content={`https://wavegame.in`} />
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
      <Layout>
        <div className="loginContainer">
          <div className="loginContentContainer">
            <div className="loginCard">
              <Row justify={"center"}>
                <p className="title">
                  Sign In
                  {router?.query?.referral_code && (
                    <p className="referCode">
                      Referral code : {router?.query?.referral_code}
                    </p>
                  )}
                </p>
              </Row>
              <Row justify={"center"}>
                <Image
                  src={Logo}
                  alt="Wave Game"
                  // height={250}
                  style={{ width: "200px", height: "auto", marginTop: "20px" }}
                  onClick={() => router.push("/")}
                />
              </Row>
              <div>
                {!showOtp ? (
                  <Form onFinish={handleNumberSubmit}>
                    <Form.Item
                      name="number"
                      rules={[
                        {
                          required: true,
                          message: "Mobile number is required!",
                        },
                        {
                          length: 10,
                          message: "please enter valid number!",
                        },
                      ]}
                    >
                      <Input
                        className="inputBox"
                        minLength={10}
                        maxLength={10}
                        placeholder="Enter your mobile number"
                        prefix={
                          <div className="mobilePrefix">
                            {/* <Image src={CallIcon} width={20} height={24} /> */}
                            +91 |
                          </div>
                        }
                      />
                    </Form.Item>
                    {/* <Form.Item
                  name="referra"
                  rules={[
                    {
                      required: true,
                      message: "Mobile number is required!",
                    },
                    {
                      length: 10,
                      message: "please enter valid number!",
                    },
                  ]}
                >
                  <Input
                    className="inputBox"
                    minLength={10}
                    placeholder="Enter your mobile number"
                    prefix={<span className="mobilePrefix">+91 |</span>}
                  />
                </Form.Item> */}

                    <Form.Item>
                      <Row justify={"center"}>
                        <Button
                          htmlType="submit"
                          className="primary_button2 login_btn"
                          placeholder="Enter your mobile number"
                          loading={loading}
                        >
                          CONTINUE
                        </Button>
                      </Row>
                    </Form.Item>
                  </Form>
                ) : (
                  <Form onFinish={handleVerifyOTP}>
                    <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "OTP is required!",
                        },
                      ]}
                    >
                      <Input
                        className="inputBox"
                        placeholder="Enter OTP"
                        prefix={
                          <div className="mobilePrefix">
                            {/* <Image src={OTPICon} width={20} height={24} /> | */}
                            OTP |
                          </div>
                        }
                      />
                    </Form.Item>
                    <Row justify={"end"}>
                      <Col>
                        <p
                          className="resendOtp"
                          onClick={() => {
                            if (counter === 0) {
                              resendOtp();
                            }
                          }}
                          style={{
                            cursor: counter === 0 ? "pointer" : "not-allowed",
                          }}
                        >
                          Resend OTP{" "}
                          <span>{(counter != 0 && counter) || ""}</span>
                        </p>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Row justify={"center"}>
                        <Button
                          htmlType="submit"
                          className="primary_button2 login_btn"
                          placeholder="Enter your mobile number"
                          prefix={
                            <span className="mobilePrefix">
                              <Image src={CallIcon} /> |
                            </span>
                          }
                        >
                          VERIFY
                        </Button>
                      </Row>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
