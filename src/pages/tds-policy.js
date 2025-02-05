import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import { Col, Row, Divider } from "antd";
import MoneyIcon from "../Assets/rupeeIcon.gif";
import Image from "next/image";

function TDSPolicy() {
  let amount = 100;
  return (
    <>
      <Head>
        <meta property="og:title" content="TDS Policy" />
        <title>TDS Policy</title>
        <meta
          name="keywords"
          content="WaveGame TDS Policy | Ludo  TDS Policy | Gaming | WaveGame.in  TDS Policy | WaveGame.club  TDS Policy| WaveGame Jaipur  TDS Policy"
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
        <meta name="url" content={`https://WaveGame.club/tds-policy`} />
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
      <Layout page="TDS Policy">
        <div className="rulesContainer">
          <p className="desc">
            In line with the provisions contained in{" "}
            <a
              target="_blank"
              href="https://incometaxindia.gov.in/news/finance-bill-2023-highlights.pdf"
            >
              Finance Act, 2023
            </a>
            , following TDS policy is applicable for all players on Wave Game
            from 1 Apr, 2023.
          </p>
          <ul>
            <li>
              <p className="desc">
                TDS is applicable at the time of withdrawal or deposit refund{" "}
              </p>
            </li>
            <li>
              <p className="desc">
                30% TDS is applicable on any positive net winnings at the time
                of withdrawal{" "}
              </p>
            </li>
            <li>
              <p className="desc">
                TDS is also applicable at the end of financial year on year end
                wallet balance by considering it as a withdrawal amount. Post
                applying TDS on the remaining balance (as per policy), the
                remaining amount will be carried forward to the next financial
                year as deposit balance. Carried forward balance will be
                considered as investment for next year and TDS would not be
                applicable for that amount.{" "}
              </p>
            </li>
          </ul>
          <p className="desc">
            Here, Net winnings = Total Withdrawals - Total Deposits (in a
            financial year). Apr 1 to Mar 31 duration is considered a financial
            year.
          </p>
          <h3 className="heading">How was TDS deducted before Apr 1, 2023 :</h3>
          <ul>
            <li>
              <p className="desc">
                Before Apr 1 2023, TDS was deducted at a game level when the
                winnings were greater than 10K.{" "}
              </p>
            </li>
          </ul>
          <p className="desc">
            Example : Previously if I won Rs 11000 in a game, then 30% TDS will
            be deducted i.e. 3300 and hence Rs 7700 will be credited in the
            withdrawal wallet.
          </p>
          <h3 className="heading">
            How is the current TDS policy different from the last TDS policy of
            FY 2022- 2023
          </h3>
          <ul>
            <li>
              <p className="desc">
                Post Apr 1, if I win some amount let's assume Rs 11000, NO TDS
                will be deducted while crediting that amount in the withdrawal
                wallet. Entire Rs 11000 will be transferred to the winnings
                wallet.
              </p>
            </li>
            <li>
              <p className="desc">
                Only when the user will try to withdraw any amount from the
                wallet, we will look at the net winnings and basis that
                calculate the TDS applicable.
              </p>
            </li>
            <li>
              <p className="desc">
                Hence we will deduct TDS only when the withdrawal running total
                is more than the Deposits. If the user is in loss, there will be
                no TDS. Hence this will be beneficial to the users.
              </p>
            </li>
          </ul>
          <p className="desc">
            Please note that the TDS Policy is based on the understanding of the
            provisions as introduced/ amended by Finance Act, 2023 and the
            Company reserves its right to modify/ change/ amend the TDS Policy
            basis law applicable at the relevant time. Attached is the finance
            bill amendment which says that the policy will be applicable from
            Apr 1, 2023 rather than July 1, 2023.
          </p>
          <h3 className="heading">What Does It Mean For Players?</h3>
          <p className="desc">
            Find below a few scenarios to understand the application of the
            aforementioned TDS Policy.
          </p>
          <p className="desc">
            <b>Scenario 1:</b> If your net winnings (including the withdrawal
            amount) is more than 0, then 30% TDS will be deducted on the net
            winnings at the time of withdrawal.
          </p>
          <h3 className="heading">Example:</h3>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year(A)
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
                    <p className="payment_desc ">5,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year(B)
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
                    <p className="payment_desc">10,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            In the above scenario, if you want to withdraw ₹7,000 , then the net
            winnings will be:
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Amount being withdrawn by the player(C){" "}
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
                    <p className="payment_desc ">7,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">Net winnings(A+C - B) </p>
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
                    <p className="payment_desc">2,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  30% TDS Applicable on Net Winnings(D)
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
                    <p className="payment_desc">600</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Amount to be credited in the bank account(C-D){" "}
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
                    <p className="payment_desc">64,00</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            <b>Zero TDS Withdrawal amount: </b> If you withdraw upto ₹5,000 ,
            then there will be zero TDS deducted as net winnings will be ₹0
            (₹5,000 + ₹5,000 - ₹10,000). See calculation below:
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year(A){" "}
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
                    <p className="payment_desc ">5,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year(B){" "}
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
                    <p className="payment_desc">10,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Amount being withdrawn by the player(C){" "}
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
                    <p className="payment_desc">5,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">Net winnings(A+C - B) </p>
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
                    <p className="payment_desc">0</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            <b>Scenario 2:</b> If you have paid TDS in previous withdrawals,
            then no TDS is applicable on withdrawals till your net winnings
            crosses the amount for which you have already paid TDS.
          </p>
          <p className="desc">
            <b>Example:</b>
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year{" "}
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
                    <p className="payment_desc">20,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year
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
                    <p className="payment_desc">20,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">TDS paid in the financial year </p>
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
                    <p className="payment_desc">1,800</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            In this scenario, No TDS applicable till your net winnings crosses
            ₹6,000 (winnings already taxed):
          </p>
          <ul>
            <li>
              <p className="desc">
                <b>Zero TDS Withdrawal amount:</b> If you withdraw up to ₹6,000,
                no TDS is applicable
              </p>
            </li>
            <li>
              <p className="desc">
                If you withdraw ₹10, 000, then 30% TDS is applicable only on
                ₹4,000 winnings i.e. ₹1,200.
              </p>
            </li>
          </ul>
          <p>
            <b>Scenario 3:</b> You have paid TDS on initial winnings during the
            financial year but your net winnings have reduced post that.
          </p>
          <p className="desc">
            <b>Example:</b>
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year(A){" "}
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
                    <p className="payment_desc ">40,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year(B){" "}
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
                    <p className="payment_desc">20,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Net winnings in the financial year(A-B){" "}
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
                    <p className="payment_desc">20,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">TDS paid till date </p>
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
                    <p className="payment_desc">6,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            Post this, if your net winnings reduces to ₹10,000, then, subject to
            applicable law, the excess TDS deducted can be claimed as refund in
            your annual income tax filing.
          </p>
          <p className="desc">
            <b>Scenario 4:</b> At the end of the financial year, if you have an
            amount in your account, then TDS will be calculated on that amount
            by considering it as a withdrawal of the financial year and
            remaining amount will be carried forward to next year as starting
            deposit amount. Withdrawal from the starting deposit amount will not
            be subject to TDS in the next year.
          </p>
          <p className="desc">
            <b>Example:</b>
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year(A){" "}
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
                    <p className="payment_desc ">40,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year(B){" "}
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
                    <p className="payment_desc">40,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">TDS paid till date(C) </p>
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
                    <p className="payment_desc">15,00</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Account balance at the end of Mar 31, 2024(D){" "}
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
                    <p className="payment_desc">30,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            In above scenario, following calculation is done:
          </p>
          <div className="payment_detail_box_container">
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total withdrawals in the financial year(A+D){" "}
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
                    <p className="payment_desc ">70,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  Total deposits in the financial year(B){" "}
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
                    <p className="payment_desc">40,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">Net winnings(A+D-B) </p>
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
                    <p className="payment_desc">30,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">
                  30% TDS Applicable on Net Winnings(E){" "}
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
                    <p className="payment_desc">9,000</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">TDS paid till date(C) </p>
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
                    <p className="payment_desc">15,00</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider className="main_divider" />
            <Row justify={"space-between"}>
              <Col>
                <p className="payment_desc">TDS Remaining to be paid(E-C) </p>
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
                    <p className="payment_desc">75,00</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <p className="desc mt-10">
            Thus, ₹7,500 TDS is deducted from your account balance at the end of
            Mar 31, 2024 and remaining balance of ₹22,500 will be carried
            forward to the next financial year as deposit amount. You will not
            have to pay TDS in the next financial year on withdrawal out of this
            amount.
          </p>
          <p className="desc">
            <b>Special Note:</b> In case you have an amount on the table at the
            end of the financial year, then it will not be considered in next
            year's starting balance.
          </p>
        </div>
      </Layout>
    </>
  );
}

export default TDSPolicy;
