import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import {
  Row,
  Form,
  Input,
  Button,
  Col,
  Divider,
  message,
  Tooltip,
  Spin,
} from "antd";
import Image from "next/image";
import BattleImage from "../../Assets/battleIcon.png";
import InfoIcon from "../../Assets/info.png";
import rsIcon from "../../Assets/rupeeIcon.gif";
import Player1 from "../../Assets/user.png";
import Player2 from "../../Assets/user.png";
import VsImage from "../../Assets/versus.png";
import axios from "axios";
import loadingImg from "../../Assets/loading_old.gif";
import API_MANAGER, { HELPERS } from "../api";
import Head from "next/head";

function LudoGame() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();
  const [allgame, setallgame] = useState([]);
  const [mount, setMount] = useState(false);
  const [userGame, setUserGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMatchMaking, setIsMatchMaking] = useState(false);
  let userID = useRef();
  const isMounted = useRef(true);
  const [status, setStatus] = useState("Click to find a match"); // Display match status
  const [matchData, setMatchData] = useState(null);

  const getAllGames = async () => {
    try {
      const response = await API_MANAGER.getAllStarLudoClassicGames();
      setallgame(response?.data?.data);
    } catch (e) {
      message.error("Something went wrongsdsad.");
    }
  };

  const getUserPlayingWaitingGame = async () => {
    try {
      const response = await API_MANAGER.getUserPlayingWaitingGame();
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setUserGame(decryptedData);
    } catch (e) {
      message.error("Something went wrongsdsad.");
    }
  };
  useEffect(() => {
    getAllGames();
    getUserPlayingWaitingGame();
  }, []);

  const role = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();
      const decryptedData = await HELPERS.decrypt(response?.data?.data);

      userID.current = decryptedData?._id;
      setUser(decryptedData?._id);
      setMount(true);
    } catch (err) {
      message.error("Something went wrongsd1!");
    }
  };

  useEffect(() => {
    WebSocket.prototype.emit = function (event, data) {
      if (this.readyState === WebSocket.OPEN)
        this.send(JSON.stringify({ event, data }));
    };
    WebSocket.prototype.listen = function (eventName, callback) {
      this._socketListeners = this._socketListeners || {};
      this._socketListeners[eventName] = callback;
    };
    let socket = new WebSocket(
      `wss://socket.starludo.club/server?hash_code=${localStorage.getItem(
        "hashcode"
      )}`
    );
    // let socket = new WebSocket("ws://157.173.218.246:6002/server");

    if (socket.readyState === 1) {
      // <-- This is important
      socket.close();
    }

    // let socket = new WebSocket("ws://13.126.138.251:6001/server");
    function openFunc() {
      socket.onopen = () => {
        console.log("websocket is connected 👍");
        setSocket(socket);
        socket.pingTimeout = setTimeout(() => {
          socket.close();
          setSocket(undefined);
        }, 50000 + 1000);
      };
    }

    function listenFunc() {
      socket.onmessage = function (e) {
        try {
          const { event, data } = JSON.parse(e.data);
          socket._socketListeners[event](data);
        } catch (error) {}
      };

      socket.listen("ping", (data) => {
        socket.emit("pong", 2);
        clearTimeout(socket.pingTimeout);
        socket.pingTimeout = setTimeout(() => {
          console.log("ping terminate works 🏩");
          socket.close();
          setSocket(undefined);
        }, 50000 + 1000);
      });

      socket.listen("waitingForMatch", (data) => {
        setallgame(data);
      });
      socket.listen("matchFound", (data) => {
        setStatus("Match found! Starting game...");
        setMatchData(data);
        setLoading(false);
        //check data?.Created_by and data?.Accepetd_By is eqaul to user
        // router.push(`/tournaments/starludo-classicgame?game_id=${JSON.parse(data)?.data?.game_id}`);
        JSON.parse(data)?.data?.aPlayer?.forEach((item) => {
          if (item?.user_id === userID?.current) {
            router.push(
              `/tournaments/ludo-classicgame?game_id=${
                JSON.parse(data)?.data?.game_id
              }&sToken=${item?.sUserToken}`
            );
          }
        });
      });
      socket.listen("startMatching", (data) => {
        setLoading(false);
        setallgame(data);
      });
    }
    function closeFunc() {
      socket.onclose = () => {
        console.log("socket disconnected wow 😡");
        if (isMounted?.current) {
          clearTimeout(socket?.pingTimeout);
          setSocket(undefined);
          let socket = new WebSocket(
            `wss://socket.starludo.club/server?hash_code=${localStorage.getItem(
              "hashcode"
            )}`
          );

          // socket = new WebSocket("ws://157.173.218.246:6002/server");
          openFunc();
          listenFunc();
          closeFunc();
        }
      };
    }
    openFunc();
    listenFunc();
    closeFunc();

    return () => {
      isMounted.current = false;
      clearTimeout(socket.pingTimeout);
      setSocket(undefined);
      socket.close();
    };
  }, []);

  useEffect(() => {
    role();
  }, []);

  const handleJoinGame = async (game_id, amount, prize) => {
    // Reset state
    if (!loading)
      try {
        setLoading(true);
        const response = await API_MANAGER.starLudoGameInit({
          game_amount: amount,
        });
        if (response?.data?.data?.message === "user is ready to play.") {
          setIsMatchMaking(true);
          setMatchData(null);
          setTimeout(() => {
            setIsMatchMaking(false);
          }, 60000);
          // Request to join the game type
          setStatus("Finding a match...");
          socket.emit("joinGame", {
            Game_type: "starludoclassic",
            userId: user,
            game_id: game_id,
            amount: amount,
            prize: prize,
          });
        }
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong."
        );
        setLoading(false);
      }
  };

  const handleReJoinGame = async (game) => {
    game?.aPlayer?.forEach((item) => {
      if (item?.user_id === userID?.current) {
        router.push(
          `/tournaments/ludo-classicgame?game_id=${game?.id}&sToken=${item?.sUserToken}`
        );
      }
    });
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Ludo 57" />
        <title>Wave Game</title>
        <meta
          name="keywords"
          content="Wave Game Ludo 57 | Ludo Ludo 57 | Gaming | Wave Game.in Ludo 57 | wavegame.in Ludo 57| Wave Game Jaipur Ludo 57"
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
        <meta name="url" content={`https://starludo.club/tournaments`} />
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

      <Layout page=" ">
        <div className="tournament_type_container">
          {/* <p>{status}</p> */}

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="battleContainer">
                {userGame?.length > 0 && (
                  <>
                    <div>
                      <h5 className="title" style={{ textAlign: "left" }}>
                        Ruuning Games
                      </h5>
                      {userGame?.map((item) => (
                        <div>
                          {item?.aPlayer?.length > 0 && (
                            <Row
                              justify={"space-between"}
                              className="openChallengeContainer"
                            >
                              <Col>
                                <Row gutter={24}>
                                  <Col>
                                    <p className="subTitle">Entry Fee</p>

                                    <Row gutter={4} align={"middle"}>
                                      <Col>
                                        <Image
                                          src={rsIcon}
                                          alt="rs"
                                          height={16}
                                          width={16}
                                        />
                                      </Col>
                                      <Col className="amount">
                                        {item?.Game_Ammount}
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col>
                                    <p className="subTitle">Prize</p>
                                    <Row gutter={4} align={"middle"}>
                                      <Col>
                                        <Image
                                          src={rsIcon}
                                          alt="rs"
                                          height={16}
                                        />
                                      </Col>
                                      <Col className="amount">
                                        {item?.prize}
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row gutter={8}>
                                  <Col>
                                    <Button
                                      onClick={() => handleReJoinGame(item)}
                                      className="primary_button2"
                                    >
                                      View
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          )}
                        </div>
                      ))}
                    </div>
                    <Divider />
                  </>
                )}
                <Row justify={"space-between"} align={"middle"}>
                  <Col>
                    <Row align={"top"} gutter={8}>
                      <Col>
                        <Image
                          src={BattleImage}
                          alt="battle"
                          width={20}
                          height={20}
                        />
                      </Col>
                      <Col className="title">Battles</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      gutter={4}
                      align={"middle"}
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push("/Rules")}
                    >
                      <Col className="rules">Rules</Col>
                      <Col>
                        <Image
                          src={InfoIcon}
                          width={20}
                          alt="info"
                          height={20}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div>
                  {allgame
                    ?.sort((a, b) => a?.Game_Ammount - b?.Game_Ammount)
                    ?.map((item) => (
                      <Row
                        justify={"space-between"}
                        className="openChallengeContainer"
                      >
                        <Col>
                          <Row gutter={24}>
                            <Col>
                              <p className="subTitle">Entry Fee</p>

                              <Row gutter={4} align={"middle"}>
                                <Col>
                                  <Image
                                    src={rsIcon}
                                    alt="rs"
                                    height={16}
                                    width={16}
                                  />
                                </Col>
                                <Col className="amount">
                                  {item?.Game_Ammount}
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <p className="subTitle">Prize</p>
                              <Row gutter={4} align={"middle"}>
                                <Col>
                                  <Image src={rsIcon} alt="rs" height={16} />
                                </Col>
                                <Col className="amount">{item?.prize}</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row gutter={8}>
                            <Col>
                              <Button
                                onClick={() =>
                                  handleJoinGame(
                                    item?._id,
                                    item?.Game_Ammount,
                                    item?.prize
                                  )
                                }
                                className="primary_button2"
                              >
                                Play
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Divider
                          style={{ background: "#fff", margin: "10px 0px" }}
                        />
                        <p className="subTitle">Running : {item?.running} </p>
                        <p className="subTitle">Waiting : {item?.waiting}</p>
                      </Row>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Spin
          size="large"
          spinning={isMatchMaking}
          tip=<>
            <p style={{ fontSize: "24px" }}>Finding Player</p>
          </>
          fullscreen
        ></Spin>
      </Layout>
    </>
  );
}

export default LudoGame;
