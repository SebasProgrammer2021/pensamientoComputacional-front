/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "./components/Modal";
import getCoordinates from "./api/endpoints/gestTest";

const Tests = () => {
  let navigate = useNavigate();
  const [ordersa, setOrdersa] = useState([]);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [startTest, setStartTest] = useState();
  const [anserwesSent, setAnserwesSent] = useState(false);
  const [showTrace, setShowTrace] = useState();
  let modifier = 38;
  const block = document.getElementById("block");
  const [displayArray, setDisplayArray] = useState([]);
  const [displayEl, setDisplayEl] = useState();
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const [currentTest, setCurrentTest] = useState(1);
  let instructionsList = document.querySelector(".ordersView");
  let { id } = useParams();
  const [test, setTest] = useState({});
  const [blockRoute, setBlockRoute] = useState([]);

  useEffect(() => {
    getCoordinates(id)
      .then(function (response) {
        if (response) {
          let data = response[0];
          setTest({
            startPostion: { top: data[1], left: data[0] },
            goalPosition: { top: data[3], left: data[2] },
          });

          // setAlert({
          //   show: true,
          //   title: "Genial",
          //   message: response,
          // });
        }
      })
      .catch(function (error) {
        // setAlert({
        //   show: true,
        //   title: "oh oh",
        //   message: error?.response?.data?.Mensaje,
        // });
      });
  }, [id]);

  const { goalPosition, startPostion } = test || {};

  const handleDirectionClick = (e) => {
    if (startTest && !anserwesSent) {
      instructionsList.innerHTML += e.target.name + "\n";
      setOrdersa((oldArray) => [...ordersa, e.target.name]);
      const { style } = block;

      switch (e.target.name) {
        case "arriba":
          if (`${parseInt(style.top) + modifier}` >= 207) {
            style.top = `${parseInt(style.top) - modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "abajo":
          if (`${parseInt(style.top) + modifier}` <= 433) {
            style.top = `${parseInt(style.top) + modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "izquierda":
          if (`${parseInt(style.left) + modifier}` >= 350) {
            style.left = `${parseInt(style.left) - modifier}px`;
          } else {
            alert("estas en el borde");
          }

          break;
        case "derecha":
          if (`${parseInt(style.left) + modifier}` <= 581) {
            style.left = `${parseInt(style.left) + modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        default:
          break;
      }
      setPositionTop(style.top);
      setPositionLeft(style.left);
      setBlockRoute(blockRoute.concat({ top: style.top, left: style.left }));
    } else {
      return;
    }
  };

  const handleStartTest = (e) => {
    let canvasObject = document.createElement("CANVAS");
    let canvasBg = document.querySelector(".imgBg");
    let containerTestView = document.querySelector(".testView");
    let ctx = canvasObject.getContext("2d");
    setStartTest(true);

    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    ctx.drawImage(canvasBg, 2, 2);
    containerTestView.appendChild(canvasObject);
    document.getElementById("start").style.display = "flex";
    document.getElementById("goal").style.display = "flex";
    handleDirectionClick(e);
  };

  const handleNextTest = () => {
    setStartTest(false);
    setAnserwesSent(false);
    let container = document.querySelector(".testView");
    var child = container.firstElementChild;
    container.removeChild(child);
    setBlockRoute([]);
    setDisplayArray([]);
    setShowTrace(false);
    block.style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("goal").style.display = "none";
    instructionsList.innerHTML = "";
    navigate(`/test/${currentTest}`);
  };

  const revealBlock = () => {
    setShowTrace(true);
    block.style.zIndex = 10;
    block.style.display = "flex";
  };

  const validateSequence = () => {
    if (startTest) {
      setCurrentTest(currentTest <= 4 ? currentTest + 1 : null);
      setAnserwesSent(true);
      // let data = {
      // };
      const { top, left } = goalPosition;
      if (top === positionTop && left === positionLeft) {
        setAlert({
          show: true,
          title: "Genial",
          message: "Lo has logrado, llegase al objetivo.",
        });
        revealBlock();
      } else {
        revealBlock();
        setAlert({
          show: true,
          title: "Mala suerte",
          message: "Casi lo logras, cierra este modal para continuar.",
        });
        return;
      }
    } else {
      return;
    }
  };

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });

  useEffect(() => {
    (async function () {
      for (let el of blockRoute) {
        await delay(700);
        setDisplayEl(el);
      }
      setDisplayEl(undefined);
    })();
  }, [blockRoute]);

  useEffect(() => {
    displayEl && setDisplayArray((prev) => [...prev, displayEl]);
  }, [displayEl]);

  return (
    <div className="App">
      {alert.show && <Modal config={alert} setAlert={setAlert} />}
      <div className="fatherTitle">
        <div className="headerTitle">
          <h1 className="">Pruebas de Pensamiento Computacional</h1>
        </div>
        <div></div>
      </div>
      <img src="" alt="" />
      <img
        className="imgBg"
        src="https://i.imgur.com/LayNEQc.png"
        style={{ display: "none", height: "100px" }}
        alt="grid img"
      />
      <img
        id="start"
        style={{
          display: "none",
          width: "83px",
          height: "63px",
          position: "absolute",
          top: startPostion?.top,
          left: startPostion?.left,
        }}
        src="https://gurutecno.com/wp-content/uploads/2016/12/Mario-Run.png"
        alt="start"
      />
      <img
        id="block"
        style={{
          display: "none",
          width: "83px",
          height: "63px",
          position: "absolute",
          top: startPostion?.top,
          left: startPostion?.left,
        }}
        src="https://gurutecno.com/wp-content/uploads/2016/12/Mario-Run.png"
        alt="start"
      />
      {showTrace &&
        displayArray.map((coodinates, index) => (
          <img
            key={index}
            id="block"
            style={{
              display: showTrace ? "flex" : "none",
              width: "83px",
              height: "63px",
              position: "absolute",
              top: coodinates.top,
              left: coodinates.left,
            }}
            src="https://gurutecno.com/wp-content/uploads/2016/12/Mario-Run.png"
            alt="start"
          />
        ))}
      <img
        id="goal"
        style={{
          display: "none",
          width: "45px",
          height: "45px",
          position: "absolute",
          top: goalPosition?.top,
          left: goalPosition?.left,
        }}
        src={require("./images/test3.png")}
        alt="goal"
      />
      <div className="test">
        <div className="testView">
          {/* <span className="testTitle">Prueba 1</span> */}
        </div>
        <div className="controls">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handleDirectionClick} className="buttonStyle">
              <img
                name="arriba"
                className="imgSize button"
                src="https://img.icons8.com/stickers/100/000000/thick-arrow-pointing-up.png"
                alt="up icon"
              />
            </button>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 7 }}>
            <button className="buttonLeftStyles" onClick={handleDirectionClick}>
              <img
                name="izquierda"
                className="imgSize"
                alt="left icon button"
                src="https://img.icons8.com/stickers/100/undefined/arrow-pointing-left.png"
              />
            </button>
            <button className="buttonStyle" onClick={handleDirectionClick}>
              <img
                name="abajo"
                className="imgSize"
                src="https://img.icons8.com/stickers/100/000000/thick-arrow-pointing-down.png"
                alt="down icon"
              />
            </button>
            <button
              className="buttonRightStyles"
              onClick={handleDirectionClick}
            >
              <img
                name="derecha"
                className="imgSize"
                alt="right icon button"
                src="https://img.icons8.com/stickers/100/undefined/right.png"
              />
            </button>
          </div>
          <div className="ordersView"></div>
        </div>
        <div
          id="actions"
          style={{
            width: "20rem",
          }}
        >
          <button
            className="button-73"
            onClick={handleStartTest}
            disabled={startTest}
          >
            iniciar test
          </button>
          <button
            className="button-29"
            disabled={anserwesSent}
            onClick={validateSequence}
          >
            Enviar respuestas
          </button>
        </div>
      </div>
      {anserwesSent && (
        <aside style={{ position: "absolute", right: "0", top: "50%" }}>
          siguite test
          <button onClick={handleNextTest}>test {currentTest}</button>
        </aside>
      )}
      <button style={{ marginLeft: 60 }}>
        <Link to="/report">Ver reporte</Link>
      </button>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://icons8.com/icon/o3EJ3VrJkeY4/gruesa-flecha-apuntando-hacia-arriba"
            rel="noreferrer"
          >
            Gruesa flecha apuntando hacia arriba icon by Icons8
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://icons8.com/icon/eXJY0kFTvF4f/gruesa-flecha-apuntando-hacia-abajo"
            rel="noreferrer"
          >
            Gruesa flecha apuntando hacia abajo icon by Icons8
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://icons8.com/icon/SSQknWWyQFW8/flecha-apuntando-hacia-la-izquierda"
          >
            Flecha apuntando hacia la izquierda icon by Icons8
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://icons8.com/icon/lx6QKDKp28mI/derecha"
          >
            Derecha icon by Icons8
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tests;
