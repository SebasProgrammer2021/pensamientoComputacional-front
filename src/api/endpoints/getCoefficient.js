import config from "../../config";
const axios = require("axios");

const getCoefficient = async (data) => {
  return axios
    .get(
      `${config().SERVER_URL}/coeficienteCorrelacion/calcular?idPreguntaTest=${
        data?.idPreguntaTest
      }&idPregunta=${data?.idPregunta}`
    )
    .then((response) => response.data);
};

export default getCoefficient;
