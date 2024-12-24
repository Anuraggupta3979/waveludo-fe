import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomPagination from "../common/CustomPagination";
import axios from "axios";
import { Row, Col, Table, Input, message } from "antd";
import moment from "moment";
import NoDataImage from "../../Assets/noData.svg";
import SearchIcon from "../../Assets/search.svg";
import wrongIcon from "../../Assets/wrong.svg";
import RightIcon from "../../Assets/right.svg";
import API_MANAGER, { HELPERS } from "../../pages/api";
function GameHistory({ user }) {
  const [page, setPage] = useState(1);
  const [game, setGame] = useState([]);

  const [numberOfPages, setNumberOfPages] = useState(0);

  const numberWithCommas = (number) => {
    if (number) {
      var parts = number.toString().split(".");
      if (parts?.length > 0) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
    return number;
  };
  const getAGmeHistory = async (id) => {
    try {
      const response = await API_MANAGER.getGameHistory(user?._id, page);
      // let gameHistory = [];
      // response?.data?.data?.result.forEach((ele) => {
      //   if (
      //     ele.Status == "completed" ||
      //     ele.Status == "cancelled" ||
      //     ele.Status == "conflict"
      //   ) {
      //     gameHistory.push(response?.data?.data?.result);
      //   }
      // });
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setGame(decryptedData?.result);
      setNumberOfPages(decryptedData?.totalCount);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getAGmeHistory();
    }
  }, [page, user]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //   fixed: "left",
      render: (item, row) => (
        <span>
          {row?.Status === "completed"
            ? row?.Winner && row?.Winner?._id === user?._id
              ? "Win Against"
              : "Lost Against"
            : row?.Status}
          {row?.Created_by?.Name && row?.Accepetd_By?.Name && (
            <>
              <br />
              <b>
                {row?.Accepetd_By && row?.Accepetd_By?._id === user?._id
                  ? row?.Created_by?.Name
                  : row?.Accepetd_By && row?.Accepetd_By?.Name}
              </b>
            </>
          )}
          <br />
          <span style={{ fontSize: "10px" }}>Room Code: {row?.Room_code}</span>
        </span>
      ),
    },
    // {
    //   title: "Room Code",
    //   dataIndex: "Room_code",
    //   align: "center",
    // },
    // {
    //   title: "Game Type",
    //   dataIndex: "Game_type",
    //   align: "center",
    // },
    {
      title: "Date | Time",
      dataIndex: "date",
      align: "center",
      width: 137,
      render: (item, row) => (
        <span style={{ fontSize: "12px" }}>
          {moment(row?.createdAt).format("DD/MM/YYYY")}
          <br /> {moment(row?.createdAt).format("h:mm a")}{" "}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (item, row) => (
        <span>
          <b>
            {row?.Status === "completed"
              ? row?.Winner?._id === user?._id
                ? `+${numberWithCommas(row?.winnAmount ? row?.winnAmount : 0)}`
                : `-${numberWithCommas(
                    row?.loseAmount
                      ? row?.loseAmount
                      : row?.Game_Ammount
                      ? row?.Game_Ammount
                      : 0
                  )}`
              : `${numberWithCommas(
                  row?.loseAmount
                    ? row?.loseAmount
                    : row?.Game_Ammount
                    ? row?.Game_Ammount
                    : 0
                )}`}
          </b>
          <br />
          <span style={{ fontSize: "10px" }}>
            Game Amount : {row?.Game_Ammount}
            {row?.Status !== "cancelled" && (
              <>
                <br />
                Closing Balance:{" "}
                {row?.Status === "completed" &&
                  numberWithCommas(
                    row?.Winner?._id === user?._id
                      ? row?.Winner_closingbalance
                      : row?.Loser_closingbalance
                  )}
              </>
            )}
          </span>
        </span>
      ),
    },
    // {
    //   title: "Closing Balance",
    //   dataIndex: "closing_date",
    //   align: "center",
    //   render: (item, row) => (
    //     <span>
    //       {row?.Status === "completed" &&
    //         numberWithCommas(
    //           row?.Winner?._id === user?._id
    //             ? row?.Winner_closingbalance
    //             : row?.Loser_closingbalance
    //         )}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Result",
    //   dataIndex: "status",
    //   render: (item, row) => (
    //     <div>
    //       {row?.Status === "completed" && row?.Winner?._id === user?._id ? (
    //         <Image src={RightIcon} alt="Pass" />
    //       ) : row?.Status === "completed" && row?.Winner?._id != user?._id ? (
    //         <Image src={wrongIcon} alt="Pass" />
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   ),
    //   align: "center",
    // },
  ];
  return (
    <div style={{ height: "100%" }}>
      {game?.length > 0 ? (
        <>
          <Table
            pagination={false}
            dataSource={game}
            columns={columns}
            scroll={{ x: "calc(350px + 60%)" }}
            // className="mt-24"
          />
          <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            total={numberOfPages}
            itemPerPage={10}
          />
        </>
      ) : (
        <div className="noDataContainer">
          <div>
            <Row justify={"center"} align={"middle"}>
              <Image src={NoDataImage} alt="No Data" />
            </Row>
            <Row justify={"center"}>
              <p className="desc">No Game History !</p>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameHistory;
