import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getStudents from "./api/endpoints/getStudents";
import getStudentTest from "./api/endpoints/getStudentTest";
import getCorrectIncorrectTest from "./api/endpoints/getCorrectIncorrectTest";
import getTestAverage from "./api/endpoints/getTestAverage";
import registertestRating from "./api/endpoints/registertestRating";
import { RangeStepInput } from "react-range-step-input";

const Report = () => {
  const [students, setStudents] = useState();
  const [results, setResults] = useState();
  const [goodWrongTest, setGoodWrongTest] = useState();
  const [testsAverage, setTestsAverage] = useState();
  const [rangeValue1, setRangeValue1] = useState(0);
  const [rangeValue2, setRangeValue2] = useState(0);
  const [rangeValue3, setRangeValue3] = useState(0);
  let codigo = localStorage.getItem("cedula");

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
          console.log("🚀 ~ file: Report.jsx ~ line 90 ~ response", response);
      })
      .catch(function (error) {
        // console.log("🚀 ~ file: Report.jsx ~ line 93 ~ handleTestRating ~ error", error)
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
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
    getStudentTestResults();
    getCorrectIncorrectTestData();
    getTestsAverageData();
  }, []);

  return (
    <>
      <button>
        <Link to="/">Volver a la página de inicio</Link>
      </button>
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
                  <td>{result[3]}</td>
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
                <th>Buena</th>
                <th>Mala</th>
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
    </>
  );
};

export default Report;
