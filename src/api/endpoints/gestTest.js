import config from "../../config";
const axios = require("axios");

const getCoordinates = async (testId) => {
  return axios
    .get(`${config().SERVER_URL}/puntoDto/obtenerPuntos/${testId}`)
    .then((response) => response.data);
};

export default getCoordinates;
