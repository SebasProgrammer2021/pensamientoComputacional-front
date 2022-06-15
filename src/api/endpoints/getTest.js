import config from "../../config";
const axios = require("axios");

const getCoordinates = async (testId) => {
  return axios
    .get(`${config().SERVER_URL}/eje/obtenerEjes/${testId}`)
    .then((response) => response.data);
};

export default getCoordinates;
