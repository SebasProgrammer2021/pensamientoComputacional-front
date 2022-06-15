import config from "../../config";
const axios = require("axios");

const getTestAverage = async (testId) => {
  return axios
    .get(`${config().SERVER_URL}/respuesta/promedio`)
    .then((response) => response.data);
};

export default getTestAverage;
