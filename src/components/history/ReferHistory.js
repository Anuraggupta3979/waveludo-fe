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
import API_MANAGER, { HELPERS } from "@/pages/api";
function ReferHistory({ user }) {
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

  const getReferHistory = async (id) => {
    try {
      const response = await API_MANAGER.getReferralHistory(
        user?.referral_code,
        page
      );
      const decryptedData = HELPERS.decrypt(response?.data?.data);

      setData(decryptedData);
      setNumberOfPages(decryptedData?.totalCount);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getReferHistory();
    }
  }, [page, user]);
  const columns = [
    {
      title: "Earned By",
      dataIndex: "name",
      //   fixed: "left",
      render: (item, row) => <span>{row?.earned_from?.Name}</span>,
    },
    // {
    //   title: "Referral Code",
    //   dataIndex: "referral_code",
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
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (item, row) => (
        <span>
          <b>{numberWithCommas(row?.amount ? row?.amount : 0)}</b>
          <br />
          <span style={{ fontSize: "10px" }}>
            Closing Balance:{" "}
            {numberWithCommas(row?.closing_balance ? row?.closing_balance : 0)}
          </span>
        </span>
      ),
    },
    // {
    //   title: "Closing Balance",
    //   dataIndex: "closing_balance",
    //   align: "center",
    //   render: (item, row) => (
    //     <span>
    //       {numberWithCommas(row?.closing_balance ? row?.closing_balance : 0)}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (item, row) => (
    //     <div>
    //       <Image src={RightIcon} alt="Pass" />
    //     </div>
    //   ),
    //   align: "center",
    // },
  ];
  return (
    <div style={{ height: "100%" }}>
      {data?.result?.length > 0 ? (
        <>
          <Table
            pagination={false}
            dataSource={data?.result}
            columns={columns}
            // scroll={{ x: "calc(750px + 60%)" }}
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
              <p className="desc">No Refer History !</p>
              {/* <p className="desc">Coming Soon !</p> */}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReferHistory;
