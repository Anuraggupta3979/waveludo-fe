import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const baseURL = `https://api.starludo.club/api/v1/`;
// const baseURL = `http://157.173.218.246:5011/api/v1/`;
let HELPERS = {
  getCookie: (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          // break;
        }
      }
    }
    return cookieValue;
  },

  request: (config) => {
    config.headers = config.headers ? config.headers : {};

    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  decrypt: (data) => {
    const binaryData = Buffer.from(data, "base64"); // Decode Base64 to Buffer
    const jsonData = JSON.parse(binaryData?.toString());
    return jsonData;
  },
  secureRequest: async (config) => {
    config.headers = config.headers ? config.headers : {};
    let hashcode = localStorage.getItem("hashcode");
    if (!hashcode) {
      // message.error("Your session is expired, please login again.");
      if (
        window?.location?.pathname !== "/" &&
        !window?.location?.pathname?.includes("login") &&
        // window?.location?.pathname !== "/login/:refferal_code" &&
        window?.location?.pathname !== "/privacy-policy" &&
        window?.location?.pathname !== "/terms-conditions" &&
        window?.location?.pathname !== "/support" &&
        window?.location?.pathname !== "/refund-policy" &&
        window?.location?.pathname !== "/responsible-gaming"
      ) {
        message.error("Your session is expired, please login again.");
        window.open("/login", "_self");
      }
      return;
    }
    config.headers["Authorization"] = `Bearer ${hashcode} `;
    try {
      const response = await HELPERS.request(config);
      return response;
    } catch (err) {
      if (err?.response && err?.response?.status === 401) {
        localStorage.clear(); // Clear local storage
        message.error("Your session is expired, please login again.");
        window.open("/login", "_self"); // Redirect to login page
      } else {
        throw err;
      }
    }
  },
  converToFormData: (obj, rootName, ignoreList) => {
    var formData = new FormData();
    function appendFormData(data, root) {
      if (!ignore(root)) {
        root = root || "";
        if (data instanceof File) {
          formData.append(root, data);
        } else if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            appendFormData(data[i], root + "[" + i + "]");
          }
        } else if (typeof data === "object" && data) {
          for (var key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              if (root === "") {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], root + "." + key);
              }
            }
          }
        } else {
          if (data !== null && typeof data !== "undefined") {
            formData.append(root, data);
          }
        }
      }
    }
    function ignore(root) {
      return (
        Array.isArray(ignoreList) &&
        ignoreList.some(function (x) {
          return x === root;
        })
      );
    }
    appendFormData(obj, rootName);
    return formData;
  },
};
const API_MANAGER = {
  login: (data) => {
    return HELPERS.request({
      baseURL,
      url: "user/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  verifyOtp: (data) => {
    return HELPERS.request({
      baseURL,
      url: "user/login/finish",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserDetail: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: "user/user",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllUser: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/total/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateUser: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/update-user`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getGameHistory: (id, page) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/game-history/${id}?limit=10&page=${page}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getReferralHistory: (id, page) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/referral/code/winn/${id}`,
      method: "GET",
      params: { page: page, limit: 20 },
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTransactionHistory: (id, page) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/temp-deposit/${id}?limit=10&page=${page}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getReferHistory: (id, page) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/temp-deposit/${id}?limit=10&page=${page}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  postRedeem: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/referral-to-wallet`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  createChallenge: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/create`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  starLudoClassicCreateChallenge: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/starludo-classsic-create`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  allGames: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/all-some`,
      method: "GET",
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  acceptChallenge: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/accept/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  rejectChallenge: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/reject/${id}`,
      method: "PUT",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  cancelChallenge: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/cancel/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteChallenge: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/delete/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateChallenge: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/update/running/${id}`,
      method: "PUT",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  requestKYC: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `kyc/aadhar/auto`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  verifyAadharOtp: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `kyc/aadhar/auto-verify`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  contactUs: (data) => {
    return HELPERS.request({
      baseURL,
      url: `contact`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  fileUpload: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "user/upload-file-url",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/deposit-upi",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositMSUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/deposit-msupi",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositTMPAYUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/deposit-tmpay2-upi",

      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositPhonePeUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/phonepe-deposit-upi",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkDepositTMPAYUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/check-deposit-tmpay2-upi/response",

      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTxnDetailAPi: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/temp-deposit-detail/${id}`,

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositKortyaPAYUPI: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/deposit-kortyapay-upi",

      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositUPIKVMPay: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/kvmpaydeposit-upi",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkmypaydeposit: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/mypaystatus-response",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositUPIWithUTR: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/deposit-with-utr",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkUPIDeposit: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/deposit-upi/response",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkUPITMPAYDeposit: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/tmpay-upi/response",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  withdrawRequest: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "/transaction/withdraw",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  viewGame: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange/update-room-code/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  updateLudoKingName: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange/update-ludoking-name/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getCode: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/game-room-code/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getChallenge: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange-by-id/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  submitGameResult: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange/update/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  referralCount: (referral_code) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/user/referral-count/${referral_code}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getNotification: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `notification`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllSettings: () => {
    return HELPERS.request({
      baseURL,
      url: `settings`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllStarLudoClassicGames: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/starludoclassic`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserPlayingWaitingGame: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/star-ludo-classic-running-waiting-challange`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  starLudoGameInit: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/games/starludo-challange/init`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default API_MANAGER;
export { HELPERS };
