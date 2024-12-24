import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
function RefundPolicy() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Refund Policy" />
        <title>Refund Policy</title>
        <meta
          name="keywords"
          content="Wave Game Refund Policy | Ludo Refund Policy | Gaming | starludoclub Refund Policy | wavegame.in Refund Policy| Wave Game Jaipur Refund Policy"
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
        <meta name="url" content={`https://starludo.club/refund-policy`} />
        <meta property="og:image" content="/wavelogo.png" />
        <meta property="og:url" content="https://starludo.club" />
        <meta name="twitter:url" content="https://starludo.club" />
        <link rel="canonical" href="https://starludo.club" />
        <meta name="author" content="Wave Game" />
        <meta property="og:type" content="website" />
        <meta name="twitter:type" content="summary" />
        <meta property="og:locale" content="English" />
        <meta property="og:site_name" content="Wave Game" />
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
      <Layout page="Refund/Cancellation Policy">
        <div className="rulesContainer">
          <p className="desc">
            {`Thanks for being a patron with Wave Game (referred as
          "Wave Game"). If you are not entirely satisfied with your subscription,
          we are here to help.`}
          </p>
          <p className="heading">Refund</p>
          <p className="desc">
            Once we receive your Refund request, we will inspect it and notify
            you on the status of your refund.
          </p>
          <p className="desc">
            {`  If your refund request is approved, we will initiate a refund to your
          credit card (or original method of payment) within 7 working days. You
          will receive the credit within a certain amount of days, depending on
          your card issuer's policies.`}
          </p>
          <p className="desc">
            In case of unforeseen technical glitch, Wave Game would refund
            subscription upon reviewing the complaint. Final decision lies with
            the company.
          </p>
        </div>
      </Layout>
    </>
  );
}

export default RefundPolicy;
