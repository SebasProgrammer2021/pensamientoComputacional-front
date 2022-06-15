import config from "../../config";
const axios = require("axios");

const getStudents = async (testId) => {
  return axios
    .get(`${config().SERVER_URL}/usuario/listar`)
    .then((response) => response.data);
};

export default getStudents;
