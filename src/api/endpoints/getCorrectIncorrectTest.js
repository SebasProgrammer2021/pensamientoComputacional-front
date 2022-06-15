import config from "../../config";
const axios = require("axios");

const getCorrectIncorrectTest = async () => {
  return axios
    .get(`${config().SERVER_URL}/respuesta/listar`)
    .then((response) => response.data);
};

export default getCorrectIncorrectTest;
