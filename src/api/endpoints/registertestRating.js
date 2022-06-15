import config from "../../config";
const axios = require("axios");

const registertestRating = async (params) => {
  return axios
    .post(`${config().SERVER_URL}/opinion/crear`, params)
    .then((response) => response.data);
};

export default registertestRating;
