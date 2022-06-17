import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getStudents from "./api/endpoints/getStudents";
import getStudentTest from "./api/endpoints/getStudentTest";
import getCoefficient from "./api/endpoints/getCoefficient";
import getCorrectIncorrectTest from "./api/endpoints/getCorrectIncorrectTest";
import getTestAverage from "./api/endpoints/getTestAverage";
import registertestRating from "./api/endpoints/registertestRating";
import { RangeStepInput } from "react-range-step-input";
import Modal from "./components/Modal";
import "./styles/reportStyles.css";
import getAverageOpinion from "./api/endpoints/getAverageOpinion";

const Report = () => {
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const [students, setStudents] = useState();
  const [results, setResults] = useState();
  const [goodWrongTest, setGoodWrongTest] = useState();
  const [testsAverage, setTestsAverage] = useState();
  const [rangeValue1, setRangeValue1] = useState(0);
  const [rangeValue2, setRangeValue2] = useState(0);
  const [rangeValue3, setRangeValue3] = useState(0);
  let codigo = localStorage.getItem("cedula");
  const [setQuestion, setSetQuestion] = useState(1);
  const [setOpinion, setSetOpinion] = useState(1);
  const [resultCoefficient, setResultCoefficient] = useState();
  const [avgOpinion, setAvgOpinion] = useState();
  console.log(
    "🚀 ~ file: Report.jsx ~ line 28 ~ Report ~ avgOpinion",
    avgOpinion
  );

  const getStudentTestResults = () => {
    getStudentTest(codigo)
      .then(function (response) {
        if (response) {
          setResults(response);
          // setStudents(response);
        }
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: Report.jsx ~ line 20 ~ useEffect ~ error",
          error
        );
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });
  };

  const getCorrectIncorrectTestData = () => {
    getCorrectIncorrectTest()
      .then(function (response) {
        if (response) {
          setGoodWrongTest(response);
        }
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: Report.jsx ~ line 20 ~ useEffect ~ error",
          error
        );
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });
  };

  const getTestsAverageData = () => {
    getTestAverage()
      .then(function (response) {
        if (response) {
          setTestsAverage(response);
        }
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: Report.jsx ~ line 20 ~ useEffect ~ error",
          error
        );
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });
  };

  const handleTestRating = (questionId, rating) => {
    let data = {
      idPreguntaTest: questionId,
      idUsuario: codigo,
      valoracion: rating,
    };

    registertestRating(data)
      .then(function (response) {
        setAlert({
          show: true,
          title: "Enviada",
          message: "Gracias por tu retroalimentación",
        });
      })
      .catch(function (error) {
        // console.log("🚀 ~ file: Report.jsx ~ line 93 ~ handleTestRating ~ error", error)
      });
  };

  const handleGetCoefficient = () => {
    getCoefficient({ idPreguntaTest: setQuestion, idPregunta: setOpinion })
      .then((res) => {
        setResultCoefficient(res);
      })
      .catch((err) => {
        setResultCoefficient(err?.response?.data?.Mensaje);
      });
  };

  useEffect(() => {
    getStudents()
      .then(function (response) {
        if (response) {
          setStudents(response);
        }
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: Report.jsx ~ line 20 ~ useEffect ~ error",
          error
        );
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });

    getAverageOpinion()
      .then(function (response) {
        if (response) {
          setAvgOpinion(response);
        }
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: Report.jsx ~ line 20 ~ useEffect ~ error",
          error
        );
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });
    getStudentTestResults();
    getCorrectIncorrectTestData();
    getTestsAverageData();
    handleGetCoefficient();
  }, []);

  return (
    <>
      <button>
        <Link to="/">Volver a la página de inicio</Link>
      </button>
      {alert.show && <Modal config={alert} setAlert={setAlert} />}
      <section id="Resultados de las preguntas">
        <h2>Resultados de las preguntas</h2>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>Pregunta</th>
                <th>Nota</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {results?.map((result, index) => (
                <tr key={index}>
                  <td>{result[0]}</td>
                  <td>{result[1]}</td>
                  <td>{result[2]}</td>
                  <td>{result[3] === 1 ? "Acertada" : "Errada"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="Listado de estudiantes ordenados por la nota">
        <h2>Listado de estudiantes ordenados por la nota</h2>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>Nota</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {students?.map((student, index) => (
                <tr key={index}>
                  <td>{student[0]}</td>
                  <td>{student[1]}</td>
                  <td>{student[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="Listado pruebas correctas e incorrectas">
        <h2>Listado pruebas correctas e incorrectas</h2>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Prueba</th>
                <th>Correcta</th>
                <th>Incorrecta</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {goodWrongTest?.map((test, index) => (
                <tr key={index}>
                  <td>{test[0]}</td>
                  <td>{test[1] === 1 ? "Si" : "No"}</td>
                  <td>{test[2] === 1 ? "Si" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section
        id="Listado promedio global de cada una de las pruebas"
        style={{
          paddingBottom: "80px",
        }}
      >
        <h2>Listado promedio global de cada una de las pruebas</h2>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Pueba</th>
                <th>Promedio</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {testsAverage?.map((test, index) => (
                <tr key={index}>
                  <td>{test[0]}</td>
                  <td>{test[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="testRating">
        <div id="ratingQuestions">
          <h3
            style={{
              fontSize: "2rem",
              textDecoration: "underline",
            }}
          >
            Califica nuestras pruebas
          </h3>
          <p style={{ marginBottom: "4rem" }}>
            para calificar arrastra el selector del rango y seleccionar 1 para
            el menor valor y 5 el maximo valor
          </p>
          <div id="question1" style={{ marginBottom: "4rem" }}>
            <h3>¿Fue fácil para ti el manejo del programa?</h3>
            <div
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              <div style={{ width: "8rem" }}>
                <span
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  {rangeValue1}
                </span>
                <RangeStepInput
                  min={0}
                  max={5}
                  value={rangeValue1}
                  step={1}
                  onChange={(e) => {
                    setRangeValue1(e.target.value);
                  }}
                />
              </div>
              <button
                className="button-29"
                onClick={() => {
                  handleTestRating("1", rangeValue1);
                }}
              >
                Enviar respuesta
              </button>
            </div>
          </div>
          <div id="question3" style={{ marginBottom: "4rem" }}>
            <h3>¿Volverias a presentar el test?</h3>
            <div
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              <div style={{ width: "8rem" }}>
                <span
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  {rangeValue2}
                </span>
                <RangeStepInput
                  min={0}
                  max={5}
                  value={rangeValue2}
                  step={1}
                  onChange={(e) => {
                    setRangeValue2(e.target.value);
                  }}
                />
              </div>
              <button
                className="button-29"
                onClick={() => {
                  handleTestRating("2", rangeValue2);
                }}
              >
                Enviar respuesta
              </button>
            </div>
          </div>
          <div id="question4">
            <h3>¿Recomendarias esta prueba a un amigo?</h3>
            <div
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              <div style={{ width: "8rem" }}>
                <span
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  {rangeValue3}
                </span>
                <RangeStepInput
                  min={0}
                  max={5}
                  value={rangeValue3}
                  step={1}
                  onChange={(e) => {
                    setRangeValue3(e.target.value);
                  }}
                />
              </div>
              <button
                className="button-29"
                onClick={() => {
                  handleTestRating("3", rangeValue3);
                }}
              >
                Enviar respuesta
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="testRating">
        <div>
          <h3 className="text-2xl">
            Promedio global de cada pregunta de opinión (Encuesta de
            satisfacción)
          </h3>
          <div className="flex justify-between mt-10 capitalize font-bold">
            {avgOpinion.map((opinionData, index) => (
              <div
                key={index}
                className="border border-gray-800 p-4 bg-blue-600"
              >
                <p>{opinionData[0]}</p>
                <span>{opinionData[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="testRating" className="border border-stone-200 pt-10">
        <div>
          <div className="flex justify-center">
            <div>
              <h3 className="text-3xl font-bold underline mb-3 font-sans">
                Coeficiente de correlación
              </h3>
              <div className="flex gap-6 text-black mb-4">
                <select
                  id="preguntas"
                  className="p-2"
                  onChange={(e) => {
                    setSetQuestion(e.target.value);
                  }}
                  value={setQuestion}
                >
                  <option value={1}>Pregunta 1</option>
                  <option value={2}>Pregunta 2</option>
                  <option value={3}>Pregunta 3</option>
                  <option value={4}>Pregunta 4</option>
                  <option value={5}>Pregunta 5</option>
                </select>
                <select
                  id="opiniones"
                  className="p-2"
                  onChange={(e) => {
                    setSetOpinion(e.target.value);
                  }}
                  value={setOpinion}
                >
                  <option value={1}>Opinion 1</option>
                  <option value={2}>Opinion 2</option>
                  <option value={3}>Opinion 3</option>
                </select>
              </div>
              <button
                type="button"
                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                onClick={handleGetCoefficient}
              >
                Obtener
              </button>
            </div>
          </div>
          <div
            div
            class="mx-auto max-w-4xl rounded-3xl bg-[#092540] p-20 text-center mt-10"
          >
            Resultado Coeficiente de Correlación
            <h2 class="text-5xl font-bold leading-tight text-white break-words">
              {resultCoefficient}
            </h2>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default Report;
