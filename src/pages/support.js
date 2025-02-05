import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Row, Col, Form, Input, Button, message } from "antd";
import Image from "next/image";
import contactImg from "../Assets/contact.png";
import PhoneIcon from "../Assets/phone.png";
import GmailIcon from "../Assets/gmail.png";
import WhatsappIcon from "../Assets/whatsapp.svg";
import API_MANAGER, { HELPERS } from "./api";
import { useRouter } from "next/router";
import Head from "next/head";
import ChatWidget from "@/components/common/ChatWidget";
function ContactUs() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [siteSetting, setSiteSettings] = useState({});

  const handleSubmit = async (values) => {
    try {
      const response = await API_MANAGER.contactUs(values);
      message.success("Your query sent successfully!");
      form.resetFields();
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const getSiteSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setSiteSettings(decryptedData);
    } catch (e) {}
  };
  useEffect(() => {
    let hashcode = localStorage.getItem("hashcode");
    if (hashcode) getSiteSettings();
  }, []);
  return (
    <>
      <Head>
        <title content={"Contact US"} />
        <title>Contact US</title>
        <meta
          name="keywords"
          content="Wave Game Contact US | Ludo Contact US | Gaming | Wave Game.in  Contact US | wavegame.in  Contact US| Wave Game Jaipur  Contact US"
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
        <meta name="url" content={`https://wavegame.in/contact us`} />
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
      <Layout page={"Contact us"}>
        <Image
          height={350}
          src={contactImg}
          style={{ maxWidth: "100%" }}
          alt="rs"
        />
        <div className="h-100 contactContainer">
          <Row className="mainRow">
            <Col xs={24} md={24}>
              <Form
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
                form={form}
              >
                {/* <Form.Item
                  name="name"
                  label="Name*"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name!",
                    },
                  ]}
                >
                  <Input
                    className="inputBox"
                    placeholder="Please enter your name"
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your number!",
                    },
                  ]}
                  name="number"
                  label="Contact Number*"
                >
                  <Input
                    className="inputBox"
                    placeholder="Please enter your number"
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                    {
                      type: "email",
                      message: "Please enter valid email!",
                    },
                  ]}
                  name="email"
                  label="Email*"
                >
                  <Input
                    type="email"
                    className="inputBox"
                    placeholder="Please enter your email"
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message!",
                    },
                  ]}
                  name="message"
                  label="Message*"
                >
                  <Input.TextArea
                    className="inputTextArea"
                    placeholder="Please enter your message"
                  />
                </Form.Item> */}
                <Row justify={"center"} align={"middle"} className="mt-24">
                  <Col>
                    <ChatWidget />
                  </Col>
                </Row>
                <Row justify={"center"} className="mt-24">
                  <Col>
                    {/* <WhatsAppOutlined /> */}
                    <Button className="whatsappBtn">
                      <a
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=+91${siteSetting?.whatsappNumber}&text=Hello`}
                      >
                        Whatsapp Call Support
                      </a>
                    </Button>
                  </Col>
                </Row>
                <Row justify={"space-between"} align={""} className="mt-48">
                  <Col span={24} className="mb-24">
                    <p className="address_title">Call: </p>
                    <a
                      href={`tel:+91${siteSetting?.whatsappNumber}`}
                      className="address_desc"
                    >
                      +91{siteSetting?.whatsappNumber}
                    </a>
                  </Col>
                  {/* <Col span={24}>
                    <Form.Item>
                      <Button
                        className="primary_button2 submit_btn"
                        htmlType="submit"
                      >
                        SUBMIT
                      </Button>
                    </Form.Item>
                  </Col> */}
                  <Col>
                    <Row align={"middle"} gutter={8}>
                      <Col>
                        {/* <WhatsAppOutlined /> */}
                        {/* <Button>
                          <a
                            target="_blank"
                            href="https://api.whatsapp.com/send?phone=+919216126998&amp;text=Hello , I Need Some Support"
                          >
                            Call Support
                          </a>
                        </Button> */}
                      </Col>
                      {/* <Col>
                        <a href="tel:9216126998">
                          <Image
                            src={PhoneIcon}
                            alt="instagram"
                            width={32}
                            className="cursor-pointer"
                          />
                        </a>
                      </Col> */}
                      {/* <Col>
                        <a href="mailto:mskanwar5604@gmail.com">
                          <Image
                            className="cursor-pointer"
                            src={GmailIcon}
                            width={32}
                            alt="FB"
                          />
                        </a>
                      </Col> */}
                    </Row>
                  </Col>
                  <Col span={24}>
                    <p className="address_title">Address: </p>
                    <p className="address_desc">
                      STARVISTAR GAMING LLP, Building No./Flat No. PLOT NO.28
                      Road/Street: TONK ROAD Nearby Landmark: NEARBY RAILWAY
                      PHATAK Locality/Sub Locality: GOVERDHAN VIHAR
                      City/Town/Village: Jaipur District: Jaipur State:
                      Rajasthan PIN Code:303903
                    </p>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

export default ContactUs;
