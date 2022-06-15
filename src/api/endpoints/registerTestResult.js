import config from "../../config";
const axios = require("axios");

const registerTestResult = async (params) => {
  return axios
    .post(`${config().SERVER_URL}/respuesta/crear`, params)
    .then((response) => response.data);
};

export default registerTestResult;
