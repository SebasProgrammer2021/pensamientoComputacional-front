import config from "../../config";
const axios = require("axios");

const getStudentTest = async (id) => {
  return axios
    .get(`${config().SERVER_URL}/usuario/test/${id}`)
    .then((response) => response.data);
};

export default getStudentTest;
