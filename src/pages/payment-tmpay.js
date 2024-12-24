import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import paymentImg from "../Assets/loader.gif";
import Image from "next/image";
import { Row, Button, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import API_MANAGER from "./api";
import Head from "next/head";
function Payment() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const checkUPIDeposit = async () => {
    var url_string = window && window?.location?.href; //window.location.href
    var url = new URL(url_string);
    var client_txn_id = url.searchParams.get("client_txn_id");
    var txn_id = url.searchParams.get("txn_id");
    // let order_id;
    // let order_token;
    // if (client_txn_id && txn_id) {
    //   order_id = client_txn_id;
    //   order_token = txn_id;
    // } else {
    //   order_id = url.searchParams.get("order_id");
    //   // order_token = url.searchParams.get("order_token");
    // }
    try {
      const params = {
        order_id: client_txn_id,
      };
      const response = await API_MANAGER.checkUPITMPAYDeposit(params);
      if (response?.data?.data?.status === "PAID") {
        setTitle("Deposit submitted successfully.");
      } else {
        setTitle("Transaction Failed.");
      }
      setVisible(true);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
      setTitle("Transaction Failed.");
      setVisible(true);
    }
  };

  const handleOkay = () => {
    setVisible(false);
    router.push("/tournaments");
  };
  useEffect(() => {
    checkUPIDeposit();
  }, []);
  return (
    <>
      <Head>
        <meta property="og:title" content="Payment" />
        <title>Payment</title>
        <meta
          name="keywords"
          content="Wave Game Payment | Ludo Payment | Gaming | Wave Game.in Payment | wavegame.in Payment| Wave Game Jaipur Payment"
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
        <meta name="url" content={`https://starludo.club/payment`} />
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
        <Row justify={"center"}>
          <Image src={paymentImg} alt="payment" />
        </Row>
        <Modal
          footer={false}
          centered
          wrapClassName="errorModal"
          open={visible}
          closeIcon={false}
          closable={false}
        >
          <div>
            <Row justify={"center"} className="title">
              {title}
            </Row>
            <Row justify={"center"}>
              <Button className="btn" onClick={() => handleOkay()}>
                Okay
              </Button>
            </Row>
          </div>
        </Modal>
      </Layout>
    </>
  );
}

export default Payment;
