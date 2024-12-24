import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import {
  Input,
  Row,
  Col,
  Form,
  Button,
  Divider,
  message,
  Spin,
  Modal,
} from "antd";
import Image from "next/image";
import MoneyIcon from "../Assets/rupeeIcon.gif";
import UpiIcon from "../Assets/upi.svg";
import API_MANAGER, { HELPERS } from "./api";
import Head from "next/head";
import { useRouter } from "next/router";

function AddCash() {
  const [form] = Form.useForm();
  const [state, setState] = useState("initial");
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [process, setProcess] = useState(false);
  const [tmpayScanner, setTmapayScanner] = useState();
  const [msPayUrl, setMsPayUrl] = useState();
  const [siteSetting, setSiteSettings] = useState({});
  const [amount, setAmount] = useState(0);
  const router = useRouter();

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

  const handleSubmit = (values) => {
    setData(values);
    setState("upi");
  };

  const getSiteSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      const decryptedData = HELPERS.decrypt(response?.data?.data);
      setSiteSettings(decryptedData);
    } catch (e) {}
  };
  const checkmypaydeposit = async (order_id, order_token, mytoken) => {
    try {
      const params = {
        order_id,
        order_token,
        mytoken,
      };

      const response = await API_MANAGER.checkmypaydeposit(params);
      if (response?.data?.data?.status === "Pending") {
        message.success("Deposit request is under processing.");
        // checkmypaydeposit(order_id, order_token, mytoken);
      }
      // setTimeout(() => {
      //   if (response?.data?.data?.status === "Pending") {
      //     message.success("Deposit request is under processing.");
      //     checkmypaydeposit(order_id, order_token, mytoken);
      //   }
      // }, 5000);
    } catch (error) {
      message.error("Something went wrong, please try again later");
    }
  };

  const depositUpiGateway = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "upi",
      };

      const response = await API_MANAGER.depositUPI(params);
      if (response?.data?.data?.data?.payment_url) {
        setProcess(false);
        router?.push(response.data?.data?.data?.payment_url);
      } else {
        setProcess(false);

        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  const depositPhonePeGateway = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "upi",
      };

      const response = await API_MANAGER.depositPhonePeUPI(params);
      if (response?.data?.data?.data?.instrumentResponse?.redirectInfo?.url) {
        setProcess(false);
        router?.push(
          response?.data?.data?.data?.instrumentResponse?.redirectInfo?.url
        );
      } else {
        setProcess(false);

        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  const depositMSUpiGateway = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "upi",
      };

      const response = await API_MANAGER.depositMSUPI(params);
      if (response?.data?.data?.data?.url) {
        setProcess(false);
        setMsPayUrl(response.data?.data?.data?.url);
        // router?.push(response.data?.data?.data?.url);
      } else {
        setProcess(false);

        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  const depositTMPAYUPI = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "upi",
      };

      const response = await API_MANAGER.depositTMPAYUPI(params);
      if (response?.data?.data?.data?.details?.qrimage) {
        setProcess(false);

        setTmapayScanner(response?.data?.data?.data?.details?.qrimage);

        // want to call an api here
        // callApi(id)
        const callApiRepeatedly = async (id) => {
          const intervalId = setInterval(async () => {
            try {
              const apiResponse = await API_MANAGER.getTxnDetailAPi(id);

              // Check if amount is 200 in the response
              if (apiResponse?.data?.data?.status === "PAID") {
                setTmapayScanner(null);
                clearInterval(intervalId); // Stop further calls
                clearTimeout(timeoutId); // Stop the timeout as well
                message.success("Payment successful!");
              }
            } catch (error) {
              console.error("Error in checking payment status:", error);
            }
          }, 3000); // Call every 3 seconds

          // Stop calling after 3 minutes
          const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
          }, 180000); // 3 minutes = 180,000 milliseconds
        };

        // Start calling the API repeatedly
        callApiRepeatedly(response?.data?.data?.txnID);
      } else {
        setProcess(false);

        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  const depositKortyaPAYUPI = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "upi",
      };

      const response = await API_MANAGER.depositKortyaPAYUPI(params);
      if (response?.data?.data?.data?.data?.payment_url) {
        setProcess(false);
        router?.push(response.data?.data?.data?.data?.payment_url);
      } else {
        setProcess(false);

        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  const depositUpiGatewayKVMPay = async (gateWay) => {
    setProcess(true);
    try {
      const params = {
        account_name: user?.holder_name, //
        customer_name: user?.holder_name, //
        amount: data?.amount?.toString(),
        account_mail_id: user?.Email, //
        payment_gateway: gateWay,
        bankCode: 3003,
        provider: "airtel",
        channel: "link",
        payment_method: "mypay",
      };

      const response = await API_MANAGER.depositUPIKVMPay(params);

      if (response.data?.data?.data?.qrcodE_STRING) {
        setProcess(false);
        // router?.push(response.data?.data?.data?.qrcodE_STRING);
        window.open(response.data?.data?.data?.qrcodE_STRING, "_self");
        let mytoken = response.data?.data?.mytoken;
        let order_id = response.data?.data?.data?.clientReferenceId;
        let order_token = response.data?.data?.data?.paymentReferenceId;
        //setProcess(false);
        setTimeout(() => {
          checkmypaydeposit(order_id, order_token, mytoken);
          setProcess(false);
        }, 1000);
      } else {
        setProcess(false);
        message.error("Something went wrong.");
      }
    } catch (error) {
      setProcess(false);
      message.error(
        error?.response?.data?.message || "Something went wrong!!!!"
      );
      setProcess(false);
    }
  };
  // const checkDepositTMPAYUPI = async () => {
  //   try {
  //     const response = await API_MANAGER.checkDepositTMPAYUPI({
  //       utr: "673894a8328fa6b55d406423",
  //     });
  //   } catch (error) {
  //   }
  // };
  const getTxnDetailAPi = async () => {
    try {
      const response = await API_MANAGER.getTxnDetailAPi(
        "673894a8328fa6b55d406423"
      );
    } catch (error) {}
  };

  useEffect(() => {
    userDetail();
    let hashcode = localStorage.getItem("hashcode");
    if (hashcode) getSiteSettings(); // checkDepositTMPAYUPI();
    getTxnDetailAPi();
  }, []);
  return (
    <>
      <Head>
        <title content={"Add Cash"} />
        <title>Add Cash</title>
        <meta
          name="keywords"
          content="Wave Game Add Cash | Ludo Add Cash | Gaming | Wave Game.in  Add Cash | wavegame.in  Add Cash| Wave Game Jaipur  Add Cash"
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
        <meta name="url" content={`https://starludo.club/addcash`} />
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
      <Layout page="">
        <div className="addCashContainer">
          {/* {process ? (
            <div className="loaderReturn" style={{ zIndex: "99" }}>
              <img
                src={"https://starludo.club/Images/LandingPage_img/loader1.gif"}
                style={{ width: "100%" }}
                alt="img"
              />
            </div>
          ) : ( */}
          {siteSetting?.addCashMsg && (
            <div className="notification_alert_container">
              ◉ {siteSetting?.addCashMsg}
            </div>
          )}
          {user && user.verified === "verified" && (
            <Form
              layout="vertical"
              form={form}
              requiredMark={false}
              onFinish={handleSubmit}
            >
              <Spin spinning={process}>
                <div
                  style={{ display: state === "initial" ? "block" : "none" }}
                >
                  <p className="title">Enter Amount to Add</p>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Amount is required!",
                          },
                        ]}
                        name="amount"
                      >
                        <Input
                          className="inputBox"
                          placeholder="Enter amount between 10-10000"
                          type="number"
                          min={10}
                          onChange={(e) => setAmount(e?.target?.value)}
                          max={siteSetting?.isUPIGateway ? 10000 : 3000}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="amountContainer" gutter={[24, 24]}>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 50 });
                        setAmount(50);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">50</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 100 });
                        setAmount(100);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">100</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 200 });
                        setAmount(200);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">200</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 250 });
                        setAmount(250);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">250</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 350 });
                        setAmount(350);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">350</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      md={8}
                      onClick={() => {
                        form.setFieldsValue({ amount: 500 });
                        setAmount(500);
                      }}
                    >
                      <div className="amountBox">
                        <Row align={"middle"} gutter={8} justify={"center"}>
                          <Col>
                            <Image height={42} src={MoneyIcon} alt="rs" />
                          </Col>
                          <Col className="amount">500</Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row justify={"center"} className="btnContainer">
                    <Form.Item>
                      {siteSetting?.isDeposit ? (
                        <Button htmlType="submit" className="primary_button3">
                          Next
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            message.error(
                              siteSetting?.depositErrorMsg ||
                                "Deposit अभी 1-2 घंटे के लिए बंद है, पेमेंट करने के लिए सपोर्ट पर बात करें| धन्यवाद"
                            )
                          }
                          className="primary_button3"
                        >
                          Next
                        </Button>
                      )}
                    </Form.Item>
                  </Row>
                </div>

                {state === "upi" && (
                  <div className="toBeAddedContainer">
                    <Row justify={"space-between"} align={"middle"}>
                      <Col className="heading">
                        Amount to be added ₹
                        {numberWithCommas(data?.amount ? data?.amount : 0)}
                      </Col>
                      <Col>
                        <Button
                          className="primary_button2"
                          onClick={() => setState("initial")}
                        >
                          EDIT
                        </Button>
                      </Col>
                    </Row>
                    {siteSetting?.isDeposit && siteSetting?.isTMPay && (
                      <>
                        <Divider className="hDivider" />
                        <p className="paymentThrough">
                          Pay Through UPI TM Pay
                        </p>{" "}
                        {/* <p style={{ fontSize: "10px" }}>
                          iphone or 2000 से ऊपर पेमेंट करने के लिए UPI KVM Pay
                          का इस्तेमाल करें|
                        </p> */}
                        <div
                          className="payNow"
                          onClick={() => {
                            depositTMPAYUPI("depositTMPAYUPI");
                          }}
                        >
                          <Row gutter={24} align={"middle"}>
                            <Col>
                              <Image src={UpiIcon} alt="UPI" />
                            </Col>
                            <Col className="title">Pay Now</Col>
                          </Row>
                        </div>
                      </>
                    )}
                    {/* {siteSetting?.isDeposit && true && (
                      <>
                        <Divider className="hDivider" />
                        <p className="paymentThrough">Pay Through UPI 2</p>{" "}
                        <p style={{ fontSize: "10px" }}>
                          iphone or 2000 से ऊपर पेमेंट करने के लिए UPI KVM Pay
                          का इस्तेमाल करें|
                        </p>
                        <div
                          className="payNow"
                          onClick={() => {
                            depositKortyaPAYUPI("kortyapay");
                          }}
                        >
                          <Row gutter={24} align={"middle"}>
                            <Col>
                              <Image src={UpiIcon} alt="UPI" />
                            </Col>
                            <Col className="title">Pay Now</Col>
                          </Row>
                        </div>
                      </>
                    )} */}
                    {siteSetting.isKVMPay && amount <= 3000 && (
                      <>
                        <Divider className="hDivider" />
                        <p className="paymentThrough">
                          Pay Through UPI App
                        </p>{" "}
                        <p style={{ fontSize: "10px" }}>
                          Iphone or 3000 से ऊपर पेमेंट करने के लिए UPI Scanner
                          का इस्तेमाल करें|
                        </p>
                        <div
                          className="payNow"
                          onClick={() => {
                            depositUpiGatewayKVMPay("kvmgateway");
                          }}
                        >
                          <Row gutter={24} align={"middle"}>
                            <Col>
                              <Image src={UpiIcon} alt="UPI" />
                            </Col>
                            <Col className="title">Pay Now</Col>
                          </Row>
                        </div>
                      </>
                    )}

                    {siteSetting?.isDeposit && siteSetting?.isUPIGateway && (
                      <>
                        <Divider className="hDivider" />
                        <p className="paymentThrough">
                          Pay Through UPI Scanner{" "}
                        </p>
                        <div
                          className="payNow"
                          onClick={() => {
                            depositUpiGateway("upigateway");
                          }}
                        >
                          <Row gutter={24} align={"middle"}>
                            <Col>
                              <Image src={UpiIcon} alt="UPI" />
                            </Col>
                            <Col className="title">Pay Now</Col>
                          </Row>
                        </div>
                      </>
                    )}
                    {siteSetting?.isDeposit &&
                      siteSetting?.isPhonePe &&
                      amount <= 5000 && (
                        <>
                          <Divider className="hDivider" />
                          <p className="paymentThrough">Pay Through UPI APP </p>
                          <div
                            className="payNow"
                            onClick={() => {
                              depositPhonePeGateway("phonepegateway");
                            }}
                          >
                            <Row gutter={24} align={"middle"}>
                              <Col>
                                <Image src={UpiIcon} alt="UPI" />
                              </Col>
                              <Col className="title">Pay Now</Col>
                            </Row>
                          </div>
                        </>
                      )}
                    {siteSetting?.isDeposit &&
                      siteSetting?.isMSPay &&
                      data?.amount >= 100 && (
                        <>
                          <Divider className="hDivider" />
                          <p className="paymentThrough">
                            {`Pay Through UPI App (Direct)`}
                          </p>
                          <div
                            className="payNow"
                            onClick={() => {
                              depositMSUpiGateway("msupigateway");
                            }}
                          >
                            <Row gutter={24} align={"middle"}>
                              <Col>
                                <Image src={UpiIcon} alt="UPI" />
                              </Col>
                              <Col className="title">Pay Now</Col>
                            </Row>
                          </div>
                        </>
                      )}
                  </div>
                )}
                {/* {UTRform && (
                <div>
                  <Divider className="hDivider" />
                  <p className="paymentThrough mt-10">
                    Pay Through UTR Method (Copy UPI ID)
                  </p>

                  <Row justify={"center"}>
                    <Input
                      className="roomCodeInputBox"
                      placeholder="IN2312XXX"
                      value={siteSetting?.upi_id}
                      disabled={true}
                      suffix={
                        <Button
                          onClick={() => handleCopy(siteSetting?.upi_id)}
                          className="referSubmitBtn"
                        >
                          COPY
                        </Button>
                      }
                    />
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "UTR Number is required for making request",
                          },
                        ]}
                        label="Enter UTR Number"
                        name="UTR_number"
                      >
                        <Input
                          className="inputBox"
                          placeholder="Enter You transaction UTR Number"
                          type="number"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label="Upload Screenshot of Payment"
                        name="txn_screenshot"
                        rules={[
                          {
                            required: true,
                            message: "Payment Screenshot is required",
                          },
                        ]}
                      >
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {fileList?.length >= 1 ? null : uploadButton}
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify={"center"} className="btnContainer">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="primary_button2 next_button"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Row>
                </div>
              )} */}

                {/* {state == "upi" && !UTRform && (
                <div className="toBeAddedContainer">
                  <Divider className="hDivider" />
                  <p className="paymentThrough mt-10">Pay Through UTR Method</p>
                  <div
                    className="payNow"
                    onClick={() => {
                      setUTRForm(true);
                    }}
                  >
                    <Row gutter={24} align={"middle"}>
                      <Col>
                        <Image src={UpiIcon} alt="UPI" />
                      </Col>
                      <Col className="title">Pay Now</Col>
                    </Row>
                  </div>
                </div>
              )} */}
              </Spin>
            </Form>
          )}
          {user &&
            (user?.verified === "unverified" ||
              user?.verified === "autopending" ||
              user.verified === "reject") && (
              <div
                className="completeKycContainer"
                onClick={() => router.push("/kyc")}
              >
                <Row justify={"center"}>
                  <p>Complete KYC to add deposit.</p>
                </Row>
              </div>
            )}
          {user && user.verified === "pending" && (
            <div
              className="completeKycContainer"
              onClick={() => router.push("/kyc")}
            >
              <Row justify={"center"}>
                <p> Please wait your kyc under process</p>
              </Row>
            </div>
          )}
          <Modal
            // title="Add Deposit"
            closable={false}
            onCancel={() => {
              setMsPayUrl(false);
              window.location.reload();
            }}
            onOk={() => {
              setMsPayUrl(false);
              window.location.reload();
            }}
            onClick={() => {
              setMsPayUrl(false);
              window.location.reload();
            }}
            centered
            open={msPayUrl}
          >
            <p style={{ fontSize: "8px", margin: "0" }}>
              Enter your name, email and 10 digit mobile number and click on
              "Procedd To Payment" then choose your payment method and complete
              payment, after payment completion Click on Ok button.
            </p>

            {msPayUrl && (
              <iframe
                src={msPayUrl}
                // title="Dynamic Iframe"
                width="100%"
                height="370"
                style={{ border: "none", margin: "0" }}
              />
            )}
          </Modal>
          <Modal
            // title="Add Deposit"
            closable={false}
            onCancel={() => {
              setTmapayScanner(false);
              window.location.reload();
            }}
            onOk={() => {
              setTmapayScanner(false);
              window.location.reload();
            }}
            onClick={() => {
              setTmapayScanner(false);
              window.location.reload();
            }}
            centered
            open={tmpayScanner}
          >
            <p style={{ fontSize: "14px", margin: "0" }}>
              Scan QR and complete payment of Rs {amount}
            </p>
            <img style={{ width: "100%", height: "auto" }} src={tmpayScanner} />
          </Modal>
        </div>
      </Layout>
    </>
  );
}

export default AddCash;
