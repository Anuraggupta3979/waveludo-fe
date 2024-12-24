import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import API_MANAGER, { HELPERS } from "./api";
import { Row, Col, message, Form, Input, Button } from "antd";
import Image from "next/image";
import UpiIcon from "../Assets/upi.svg";
import BankImg from "../Assets/bank1.png";
import { useRouter } from "next/router";
function Withdraw() {
  const [user, setUser] = useState({});
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [siteSetting, setSiteSettings] = useState({});
  const [form] = Form.useForm();
  const [formBank] = Form.useForm();
  const router = useRouter();
  const userDetail = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);
      setUser(decryptedData);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const getSiteSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setSiteSettings(decryptedData);
    } catch (e) {}
  };
  const withdrawRequest = async (data, amount) => {
    let payment_gatway = "manualupi";
    try {
      const params = {
        ...data,
        amount,
        type,
        payment_gatway,
      };
      const response = await API_MANAGER.withdrawRequest(params);
      if (
        response?.data?.data?.msg ===
        "You have not sufficient balance for withdrawal."
      ) {
        message.error("You have not sufficient balance for withdrawal.");
      } else if (response?.data?.data?.msg) {
        message.success(response?.data?.data?.msg);
      } else {
        message.success("Withdraw request submitted successfully!");
      }
      setLoading(false);
      form.resetFields();
      formBank.resetFields();
      setType(null);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        bankDetails: true,
      };
      // await API_MANAGER.updateUser(params);

      withdrawRequest(params, values?.amount);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
    // message.error("Withdraw not working for some time.");
  };
  useEffect(() => {
    userDetail();
    getSiteSettings();
  }, []);
  return (
    <Layout page={""}>
      <div className="withdraw_container">
        {siteSetting?.withdrawMsg && (
          <div className="notification_alert_container">
            ◉ {siteSetting?.withdrawMsg}
          </div>
        )}
        {user && user.verified === "verified" && (
          <div>
            <p className="optionTitle">Choose withdrawal option.</p>
            <div
              className="chooseOption"
              onClick={() => {
                if (!loading) {
                  setType("upi");
                }
              }}
            >
              <Row gutter={24} align={"middle"}>
                <Col>
                  <Image src={UpiIcon} alt="UPI" />
                </Col>
                <Col className="title">
                  Withdraw through UPI
                  <span>Withdrawal amount ₹200 - ₹2,00,000 </span>
                </Col>
              </Row>
            </div>
            {/* <div
              className="chooseOption"
              onClick={() => {
                if (!loading) {
                  setType("banktransfer");
                }
              }}
            >
              <Row gutter={24} align={"middle"}>
                <Col>
                  <Image src={BankImg} alt="UPI" height={50} />
                </Col>
                <Col className="title">
                  Bank Transfer
                  <span>Minimum withdrawal amount ₹200</span>
                </Col>
              </Row>
            </div> */}
            {type === "upi" && (
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "12px" }}>
                  {siteSetting?.manualWithdrawalAMount - 1} से ऊपर की Withdrawal
                  लेने पर 1-60 मिनट तक का समय लग सकता है तो थोड़ा धैर्य बनाए
                  रखें, धन्यवाद | {siteSetting?.manualWithdrawalAMount - 1} से
                  कम की निकासी तुरंत हो जाती है |
                </p>
                <Form
                  form={form}
                  requiredMark={false}
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name={"amount"}
                    label="Amount*"
                    rules={[
                      {
                        required: true,
                        message: "Amount required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter amount"
                      className="inputBox"
                      type="number"
                      min={200}
                      max={200000}
                      onChange={(e) => setAmount(e?.target?.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"holder_name"}
                    label="Account holder name*"
                    rules={[
                      {
                        required: true,
                        message: "Account holder name required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter account holder name"
                      className="inputBox"
                    />
                  </Form.Item>

                  <Form.Item
                    name={"upi_id"}
                    label="UPI Id*"
                    rules={[
                      {
                        required: true,
                        message: "UPI Id required!",
                      },
                      {
                        pattern: /^[\w.-]+@[\w.-]+$/,
                        message: "Invalid UPI ID",
                      },
                    ]}
                  >
                    <Input placeholder="9999999999@xyz" className="inputBox" />
                  </Form.Item>

                  {amount >= siteSetting?.manualWithdrawalAMount && (
                    <>
                      <Form.Item
                        name={"bank_name"}
                        label="Bank Name*"
                        rules={[
                          {
                            required: true,
                            message: "Bank name required!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your bank name"
                          className="inputBox"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"account_number"}
                        label="Account number*"
                        rules={[
                          {
                            required: true,
                            message: "Account number required!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your bank account number"
                          className="inputBox"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"ifsc_code"}
                        label="IFSC CODE*"
                        rules={[
                          {
                            required: true,
                            message: "IFSC code required!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your IFSC code"
                          className="inputBox"
                        />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item>
                    <Button
                      loading={loading}
                      htmlType="submit"
                      className="primary_button3"
                    >
                      Withdraw
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
            {type === "banktransfer" && (
              <div>
                <Form
                  form={formBank}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name={"holder_name"}
                    label="Account holder name*"
                    rules={[
                      {
                        required: true,
                        message: "Account holder name required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter account holder name"
                      className="inputBox"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"bank_name"}
                    label="Bank Name*"
                    rules={[
                      {
                        required: true,
                        message: "Bank name required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your bank name"
                      className="inputBox"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"account_number"}
                    label="Account number*"
                    rules={[
                      {
                        required: true,
                        message: "Account number required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your bank account number"
                      className="inputBox"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"ifsc_code"}
                    label="IFSC CODE*"
                    rules={[
                      {
                        required: true,
                        message: "IFSC code required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your IFSC code"
                      className="inputBox"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"amount"}
                    label="Amount*"
                    rules={[
                      {
                        required: true,
                        message: "Amount required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter amount"
                      className="inputBox"
                      type="number"
                      min={200}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={loading}
                      htmlType="submit"
                      className="primary_button"
                    >
                      Withdraw
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
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
                <p>Complete KYC to take Withdrawals</p>
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
      </div>
    </Layout>
  );
}

export default Withdraw;
