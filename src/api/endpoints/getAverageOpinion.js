import config from "../../config";
const axios = require("axios");

const getAverageOpinion = async () => {
  return axios
    .get(`${config().SERVER_URL}/opinion/listar`)
    .then((response) => response.data);
};

export default getAverageOpinion;
