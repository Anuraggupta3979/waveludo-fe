import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomPagination from "../common/CustomPagination";
import { Row, Col, Table, Input, message } from "antd";
import moment from "moment";
import NoDataImage from "../../Assets/noData.svg";
import SearchIcon from "../../Assets/search.svg";
import wrongIcon from "../../Assets/wrong.svg";
import RightIcon from "../../Assets/right.svg";
import API_MANAGER, { HELPERS } from "../../pages/api";
function TransactionHistory({ user }) {
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [data, setData] = useState([]);

  const numberWithCommas = (number) => {
    var parts = number.toString().split(".");
    if (parts?.length > 0) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return number;
  };

  const getTransactionHistory = async (id) => {
    try {
      const response = await API_MANAGER.getTransactionHistory(user?._id, page);
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setData(decryptedData?.result);
      setNumberOfPages(decryptedData?.totalCount);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getTransactionHistory();
    }
  }, [page, user]);

  const columns = [
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   //   fixed: "left",
    //   render: (item, row) => {
    //     let titleMsg = "";
    //     if (
    //       (row?.Req_type === "deposit" || row?.Req_type === "bonus") &&
    //       row?.status != "FAILED"
    //     ) {
    //       titleMsg = "Cash added";
    //     } else if (row?.Req_type === "withdraw" && row?.status != "FAILED") {
    //       titleMsg = "Withdraw using " + row?.Withdraw_type;
    //     } else if (row?.Req_type === "penalty" && row?.status != "FAILED") {
    //       titleMsg = "Penalty";
    //     } else if (row?.status === "Pending" || row?.status === "FAILED") {
    //       titleMsg = "FAILED";
    //     }
    //     return <span>{titleMsg}</span>;
    //   },
    // },
    {
      title: "Description",
      dataIndex: "txn_msg",
      // align: "center",
      width: 200,
      render: (item, row) => {
        return (
          <div>
            <b>
              <span style={{ textTransform: "uppercase" }}>
                {" "}
                {row?.Req_type}
              </span>{" "}
              {row?.Req_type !== "bonus" && (
                <>
                  {row?.status === "none" ||
                  (row?.status === "Pending" &&
                    (row?.Req_type === "withdraw" ||
                      row?.Req_type === "manualwithdraw"))
                    ? "Processing"
                    : row?.status === "Pending" && row?.Req_type === "deposit"
                    ? "Cancelled"
                    : row?.status}
                </>
              )}
            </b>
            <br />
            <span style={{ fontSize: "10px" }}>
              {row?.txn_msg ? row?.txn_msg : ""}
            </span>
          </div>
        );
      },
    },

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
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (item, row) => {
        let signIcon = "";
        if (
          (row?.Req_type === "deposit" ||
            row?.Req_type === "bonus" ||
            row?.Req_type === "redeem") &&
          row?.status != "FAILED"
        ) {
          if (row?.status === "Pending" && row?.Req_type === "deposit") {
            signIcon = "X";
          } else {
            signIcon = "+";
          }
        } else if (
          (row?.Req_type === "withdraw" ||
            row?.Req_type === "manualwithdraw") &&
          row?.status != "FAILED"
        ) {
          signIcon = "-";
        } else if (row?.Req_type === "penalty" && row?.status != "FAILED") {
          signIcon = "-";
        } else if (row?.status === "Pending" || row?.status === "FAILED") {
          signIcon = "X";
        }
        return (
          <span>
            <b style={{ color: "red" }}>{signIcon}</b>
            <b> {` ${numberWithCommas(row?.amount)}`}</b>
            <br />
            <span style={{ fontSize: "10px" }}>
              Closing Balance:{" "}
              {numberWithCommas(
                row?.closing_balance ? row?.closing_balance : 0
              )}
            </span>
          </span>
        );
      },
    },
    // {
    //   title: "Closing Balance",
    //   dataIndex: "closing_balance",
    //   align: "center",
    //   render: (item) => <span>{numberWithCommas(item ? item : 0)}</span>,
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (item, row) => (
    //     <div>
    //       {row?.status === "PAID" && <Image src={RightIcon} alt="Pass" />}
    //       {row?.status === "FAILED" && <Image src={wrongIcon} alt="Pass" />}
    //     </div>
    //   ),
    //   align: "center",
    // },
  ];
  return (
    <div style={{ height: "100%" }}>
      {data?.length > 0 ? (
        <>
          <Table
            pagination={false}
            dataSource={data}
            columns={columns}
            // scroll={{ x: "calc(450px + 60%)" }}
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
              <p className="desc">No Transaction History !</p>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
