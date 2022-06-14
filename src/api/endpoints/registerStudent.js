import config from "../../config";
const axios = require("axios");

const registerStudent = async (params) => {
  return axios
    .post(`${config().SERVER_URL}/estudiante/crear`, params)
    .then((response) => response.data);
};

export default registerStudent;
