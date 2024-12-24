import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Row, Col } from "antd";
import Image from "next/image";
import Logo from "../../Assets/layout/wavelogo.png";

import { useRouter } from "next/router";
import { UserFooterBar } from "./Footer";
function Layout({ page, children, isTournament = false }) {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const routes = [
    "privacy-policy",
    "terms-conditions",
    "responsible-gaming",
    "support",
    "refund-policy",
    "404",
    "login",
  ];
  const IsTokenValid = () => {
    const path = router?.pathname?.split("/");
    let hashcode = localStorage.getItem("hashcode");
    if (!hashcode) {
      if (!routes?.includes(path[1])) {
        router.push("/");
      }
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    IsTokenValid();
  }, []);
  return (
    <Row>
      <Col xs={24} md={12} lg={8} className="common_layout">
        {!isTournament && <Header isValid={isValid} />}
        <div className="layout_content_container">
          <div
            className={`content_box ${
              isTournament ? "tournament-content-box" : ""
            }`}
          >
            <div className="content_container">
              <div className="pageContent">
                {page && <div className="pageTitle">{page}</div>}
                {children}
              </div>
            </div>
          </div>
        </div>
        {isValid && (
          <div id="userFooterBar">{!isTournament && <UserFooterBar />}</div>
        )}
      </Col>
      <Col xs={0} md={12} lg={16}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#dce8ff",
            borderLeft: "10px solid #e0e0e0",
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontSize: "32px",
            flexDirection: "column",
          }}
        >
          <div>
            <Image style={{ width: "100%", height: "auto" }} src={Logo} />
          </div>
          <p>
            <span style={{ fontWeight: "bold" }}>Wave Game</span> Win Real Cash
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default Layout;
