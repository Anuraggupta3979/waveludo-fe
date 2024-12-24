import React, { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, message, Drawer } from "antd";
import Logo from "../../Assets/layout/wavelogo.png";
import Image from "next/image";
import MoreIcon from "../../Assets/layout/sidebar.png";
import ProfileIcon from "../../Assets/layout/profile.svg";
import WinCashIcon from "../../Assets/layout/win_cash.svg";
import WalletIcon from "../../Assets/layout/Wallet.svg";
import GameHistoryIcon from "../../Assets/layout/game.svg";
import TransactionHistoryIcon from "../../Assets/layout/transaction.svg";
import ReferHistoryIcon from "../../Assets/layout/refer-history.svg";
import LogoutIcon from "../../Assets/layout/logout.svg";
import NotificationIcon from "../../Assets/layout/Notification.svg";
import ReferIcon from "../../Assets/layout/refer.svg";
import SupportIcon from "../../Assets/layout/support.svg";
import PrivacyIcon from "../../Assets/layout/privacy.svg";
import TermsIcon from "../../Assets/layout/terms.svg";
import ResponsibleIcon from "../../Assets/layout/responsible.svg";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
// import API_MANAGER from "@/pages/api";
import API_MANAGER, { HELPERS } from "../../pages/api";
import { UserOutlined, WalletFilled } from "@ant-design/icons";

const numberWithCommas = (number) => {
  var parts = number.toString().split(".");
  if (parts?.length > 0) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  return number;
};
function Header({ isValid }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const userDetail = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);
      setUser(decryptedData);
      // if (typeof window != undefined && decryptedData?.Phone) {
      //   window?.fcWidget?.setExternalId(decryptedData?.Phone);

      //   // To set user name
      //   window.fcWidget.user.setFirstName(
      //     `${decryptedData?.Phone} - ${decryptedData?.Name}`
      //   );

      //   // To set user email
      //   window.fcWidget.user.setEmail("john.doe@gmail.com");

      //   // To set user properties
      //   // Note that any other fields passed as properties which are not in the CRM Contact properties already, they will be ignored.
      //   window.fcWidget.user.setProperties({
      //     cf_plan: "Pro", // meta property 1
      //     cf_status: "Active", // meta property 2
      //   });
      // }
    } catch (error) {
      // message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (isValid) userDetail();
  }, [isValid]);
  return (
    <div className="header_main_container">
      <div className="headerContent">
        {/* <div className="w3-teal ">
          <div className="w3-container ">
            <div className={`${css.headerContainer} justify-content-between`}>
              <Link to="/">
                <picture className={`ml-2 ${css.navLogo} d-flex`}>
                  <img
                    src="/Images/LandingPage_img/Header_profile.jpg"
                    className="snip-img"
                    alt="Logo"
                  />
                </picture>
              </Link>

              <div className={`ml-5`}>
                <Link type="button" className="login-btn" to="/login">
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <Image
              src={Logo}
              alt="logo"
              className="logo"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            />
          </Col>
          <Col>
            <Row align={"middle"} gutter={10}>
              {!isValid && (
                <Col>
                  <Button
                    className="primary_button2"
                    onClick={() => router.push("/login")}
                  >
                    LOGIN
                  </Button>
                </Col>
              )}
              {isValid && (
                <Col>
                  <Row>
                    <Col>
                      <Button
                        className="cashBtn addCashBtn"
                        onClick={() => router.push("/wallet")}
                      >
                        <Row
                          align={"middle"}
                          gutter={[4, 4]}
                          className="headerRow"
                        >
                          <Col className="font-12">Cash</Col>
                          <Col className="amount font-12">
                            {numberWithCommas(
                              user?.Wallet_balance
                                ? user?.Wallet_balance.toFixed(2)
                                : 0
                            )}
                          </Col>
                        </Row>

                        {/* <span className="plusIcon"></span> */}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="plusButton"
                        onClick={() => router.push("/addcash")}
                      >
                        <Row className="font-12">+</Row>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              )}
              {isValid && (
                <Col className="earningBtn">
                  <Button
                    className="cashBtn"
                    onClick={() => router.push("/refer-earn")}
                  >
                    <Row align={"middle"} gutter={[4, 4]} className="headerRow">
                      <Col className="font-12">Earning</Col>
                      <Col className="amount font-12">
                        {numberWithCommas(
                          user?.referral_wallet
                            ? user?.referral_wallet?.toFixed(2)
                            : 0
                        )}
                      </Col>
                    </Row>
                    {/* <span>Earning </span> */}
                  </Button>
                </Col>
              )}
              {/* <Col>
                
              </Col> */}

              <Col>
                <Image
                  src={MoreIcon}
                  alt="more"
                  className="moreIcon"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                />
              </Col>

              <Drawer
                title="Wave Game"
                placement={"left"}
                width={500}
                onClose={() => setOpen(false)}
                open={open}
                // closeIcon="asda"
                rootClassName="menu_drawer_container"
              >
                {isValid && (
                  <>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/profile")}
                    >
                      <Col className="menuLink">
                        {/* <Image src={ProfileIcon} alt="profile" height={24} /> */}
                        <UserOutlined />
                      </Col>
                      <Col className="menuLink">My Profile</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/tournaments")}
                    >
                      <Col className="menuLink">
                        <Image src={WinCashIcon} alt="profile" height={24} />
                      </Col>
                      <Col className="menuLink">Win Cash</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/wallet")}
                    >
                      <Col className="menuLink">
                        {/* <Image src={WalletIcon} alt="profile" height={24} /> */}
                        <WalletFilled />
                      </Col>
                      <Col className="menuLink">My Wallet</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/Gamehistory")}
                    >
                      <Col>
                        <Image
                          src={GameHistoryIcon}
                          alt="profile"
                          height={24}
                        />
                      </Col>
                      <Col className="menuLink">Game History</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/transaction-history")}
                    >
                      <Col>
                        <Image
                          src={TransactionHistoryIcon}
                          alt="profile"
                          height={24}
                        />
                        {/* <MonitorOutlined /> */}
                      </Col>
                      <Col className="menuLink">Transaction History</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/Referral-history")}
                    >
                      <Col>
                        <Image
                          src={ReferHistoryIcon}
                          alt="profile"
                          height={24}
                        />
                      </Col>
                      <Col className="menuLink">Refer History</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/refer-earn")}
                    >
                      <Col>
                        <Image src={ReferIcon} alt="profile" height={24} />
                      </Col>
                      <Col className="menuLink">Refer & Earn</Col>
                    </Row>
                    <Row
                      gutter={16}
                      className="headerMenuItem"
                      onClick={() => router.push("/Notification")}
                    >
                      <Col>
                        <Image
                          src={NotificationIcon}
                          alt="profile"
                          height={24}
                        />
                      </Col>
                      <Col className="menuLink">Notification</Col>
                    </Row>
                  </>
                )}

                <Row
                  gutter={16}
                  className="headerMenuItem"
                  onClick={() => router.push("/support")}
                >
                  <Col>
                    <Image src={SupportIcon} alt="profile" height={24} />
                  </Col>
                  <Col className="menuLink">Help & Support</Col>
                </Row>
                <Row
                  gutter={16}
                  className="headerMenuItem"
                  onClick={() => router.push("/privacy-policy")}
                >
                  <Col>
                    <Image src={PrivacyIcon} alt="profile" height={24} />
                  </Col>
                  <Col className="menuLink">Privacy Policy</Col>
                </Row>

                <Row
                  gutter={16}
                  className="headerMenuItem"
                  onClick={() => router.push("/terms-conditions")}
                >
                  <Col>
                    <Image src={TermsIcon} alt="profile" height={24} />
                  </Col>
                  <Col className="menuLink">Terms & Conditions</Col>
                </Row>

                <Row
                  gutter={16}
                  className="headerMenuItem"
                  onClick={() => router.push("/responsible-gaming")}
                >
                  <Col>
                    <Image src={ResponsibleIcon} alt="profile" height={24} />
                  </Col>
                  <Col className="menuLink">Responsible Gaming</Col>
                </Row>

                <Row
                  gutter={16}
                  className="headerMenuItem"
                  onClick={() => {
                    Cookies.remove("expireTime");
                    localStorage.clear();
                    router.push("/login");
                  }}
                >
                  {isValid && (
                    <>
                      <Col>
                        <Image src={LogoutIcon} alt="profile" height={24} />
                      </Col>
                      <Col
                        className="logoutLink"
                        // style={{ color: "B60000 !important" }}
                      >
                        Logout
                      </Col>
                    </>
                  )}
                </Row>
              </Drawer>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Header;
