import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { Avatar, Row, Col, Button, Form, Input, message } from "antd";
import {
  UserOutlined,
  EditFilled,
  EditOutlined,
  UsergroupAddOutlined,
  CreditCardFilled,
  RightOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import KycImage from "../Assets/kyc.png";
import WalletImage from "../Assets/layout/Wallet.svg";
import rsImage from "../Assets/rs.png";
import BattelImage from "../Assets/battel.png";
import penaltyImage from "../Assets/layout/penalty.png";
import referImage from "../Assets/refer.png";
import UserIcon from "../Assets/user.png";
import RightIcon from "../Assets/right.svg";
import ErrorModal from "../components/common/ErrorModal";
import API_MANAGER, { HELPERS } from "./api";
import { useRouter } from "next/router";
import Head from "next/head";
function Profile() {
  const [errorModal, setErrorModal] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const router = useRouter();
  const handleSubmit = async (values) => {
    const param = {
      referral: values?.referral,
    };
    try {
      const response = await API_MANAGER.updateUser(param);
      message.success("Updated Successfully!");
      form.resetFields();
      getUserProfile();
    } catch (error) {
      // message.error("Something went wrong!");
      setErrorModal(true);
    }
  };
  const handleNameEdit = async (values) => {
    try {
      const response = await API_MANAGER.updateUser(values);
      message.success("Updated Successfully!");
      form.resetFields();
      getUserProfile();
      setShowNameEdit(false);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const numberWithCommas = (number) => {
    var parts = number.toString().split(".");
    if (parts?.length > 0) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return number;
  };

  const getUserProfile = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);
      setUser(decryptedData);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const getAllUser = async () => {
    try {
      const response = await API_MANAGER.getAllUser(user?._id);
      setTotal(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  useEffect(() => {
    if (user?._id) {
      form2.setFieldsValue({ Name: user?.Name });
      getAllUser();
    }
    if (user?.referral_code) {
      form.setFieldsValue({ referral: user?.referral_code });
    }
  }, [user]);
  const handleCopy = () => {
    navigator.clipboard.writeText(user?.referral_code);
    message.success("Referral code copied!");
  };
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta property="og:title" content={"Profile"} />
        <meta
          name="keywords"
          content="Wave Game profile | Ludo profile | Gaming | Wave Game.in profile | wavegame.in profile| Wave Game Jaipur profile"
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
        <meta name="url" content={`https://starludo.club/profile`} />
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
        <div className="profileContainer">
          <Row justify={"center"}>
            <Avatar src={<Image src={UserIcon} />} size={100} />
          </Row>
          {!showNameEdit && user?.Name ? (
            <Row justify={"center"} align={"middle"} gutter={8}>
              <Col>
                <p className="name">{user?.Name}</p>
              </Col>
              <Col>
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => setShowNameEdit(true)}
                />
              </Col>
            </Row>
          ) : (
            <Row justify={"center"} align={"middle"} gutter={8}>
              <Form form={form2} onFinish={(e) => handleNameEdit(e)}>
                <Form.Item name="Name">
                  <Input
                    placeholder="Enter Your Name"
                    className="name_input_box"
                    maxLength={15}
                    suffix={
                      <span
                        className="cursor-pointer"
                        // style={{ marginTop: "4px" }}
                        onClick={() => form2.submit()}
                      >
                        {/* <Image height={20} src={RightIcon} /> */}
                        {/* <RightIcon /> */}
                        <ArrowRightOutlined />
                      </span>
                    }
                  />
                </Form.Item>
              </Form>
            </Row>
          )}

          <Row justify={"center"}>
            <p className="number">{user?.Phone}</p>
          </Row>
          <Row justify={"center"} gutter={[20, 20]}>
            <Col>
              <Button className="btn" onClick={() => router.push("/wallet")}>
                <Row gutter={8} align={"middle"}>
                  <Col>
                    <Image
                      width={18}
                      height={18}
                      src={WalletImage}
                      alt="Wallet"
                    />
                  </Col>
                  <Col className="text">My Wallet</Col>
                </Row>
              </Button>
            </Col>
            <Col>
              <Button className="btn">
                <Row
                  gutter={8}
                  align={"middle"}
                  onClick={() => {
                    if (
                      user?.verified === "unverified" ||
                      user?.verified === "autopending"
                    ) {
                      router.push("/kyc");
                    }
                  }}
                >
                  <Col>
                    {/* <Image width={26} height={28} src={KycImage} alt="kyc" /> */}
                    <CreditCardFilled
                      color="white"
                      style={{ color: "white", height: "28px" }}
                    />
                  </Col>
                  <Col className="text">
                    {user?.verified === `unverified` ||
                    user?.verified === "autopending"
                      ? "Complete KYC"
                      : user?.verified === "pending"
                      ? "In Process"
                      : user?.verified === "verified"
                      ? "Completed KYC"
                      : "Complete KYC"}
                  </Col>
                </Row>
              </Button>
            </Col>
          </Row>
          <div className="referal_box_container">
            <Row justify={"center"}>
              <p className="referCode">USE REFER CODE</p>
            </Row>
            <Row justify={"center"}>
              <Form onFinish={handleSubmit} form={form}>
                <Form.Item
                  name="referral"
                  rules={[{ required: true, message: "Refer code required!" }]}
                >
                  <Input
                    className="referInputBox"
                    placeholder="IN2312XXX"
                    disabled={user?.referral_code}
                    suffix={
                      user?.referral_code ? (
                        <Button
                          onClick={() => handleCopy()}
                          loading={loading}
                          className="referSubmitBtn"
                        >
                          Copy
                        </Button>
                      ) : (
                        <Button
                          htmlType="submit"
                          loading={loading}
                          className="referSubmitBtn"
                        >
                          Submit
                        </Button>
                      )
                    }
                  />
                </Form.Item>
              </Form>
            </Row>
          </div>
          <div className="profileCards">
            <Row justify={"center"} gutter={32}>
              <Col span={24}>
                <div className="profile_card">
                  <Row gutter={24} align={"middle"}>
                    <Col>
                      <Image width={24} height={24} src={rsImage} alt="rs" />
                    </Col>
                    <Col className="title">
                      Cash Won
                      <p className="resultNumber">
                        {numberWithCommas(
                          user?.wonAmount ? user?.wonAmount?.toFixed(2) : 0
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <div className="profile_card">
                  <Row gutter={24} align={"middle"}>
                    <Col>
                      <Image
                        width={24}
                        height={24}
                        src={BattelImage}
                        alt="rs"
                      />
                    </Col>
                    <Col className="title">
                      Battle Played
                      <p className="resultNumber">
                        {numberWithCommas(total ? total : 0)}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <div className="profile_card">
                  <Row gutter={24} align={"middle"}>
                    <Col>
                      {/* <Image width={24} height={24} src={referImage} alt="rs" /> */}
                      <UsergroupAddOutlined
                        style={{ color: "#fff", width: "24px", height: "auto" }}
                      />
                    </Col>
                    <Col className="title">
                      Referral Earning
                      <p className="resultNumber">
                        {numberWithCommas(
                          user?.referral_earning
                            ? user?.referral_earning?.toFixed(2)
                            : 0
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <div className="profile_card">
                  <Row gutter={24} align={"middle"}>
                    <Col>
                      <Image
                        width={24}
                        height={24}
                        src={penaltyImage}
                        alt="rs"
                      />
                    </Col>
                    <Col className="title">
                      Penalty
                      <p className="resultNumber">
                        {numberWithCommas(
                          user?.totalPenalty
                            ? user?.totalPenalty?.toFixed(2)
                            : 0
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <ErrorModal
          title="Invalid referral code or referral code already exist!"
          visible={errorModal}
          setVisible={setErrorModal}
        />
      </Layout>
    </>
  );
}

export default Profile;
