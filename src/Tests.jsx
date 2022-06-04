/* eslint-disable no-undef */
import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Tests = () => {
  const [ordersa, setOrdersa] = useState([]);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [startTest, setStartTest] = useState();
  let modifier = 38;
  const block = document.getElementById("block");

  let goalPositions = { top: 362, left: 242 };
  let startPostions = { top: 134, left: 14 };

  const handleDirectionClick = (e) => {
    let instructionsList = document.querySelector(".ordersView");
    if (startTest) {
      instructionsList.innerHTML += e.target.name + "\n";
      setOrdersa((oldArray) => [...ordersa, e.target.name]);
      const { style } = block;

      switch (e.target.name) {
        case "arriba":
          if (`${parseInt(style.top) + modifier}` >= 210) {
            style.top = `${parseInt(style.top) - modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "abajo":
          if (`${parseInt(style.top) + modifier}` <= 400) {
            style.top = `${parseInt(style.top) + modifier}px`;
          } else {
            alert("estas en el borde");
          }
          break;
        case "izquierda":
          if (`${parseInt(style.left) + modifier}` >= 90) {
            style.left = `${parseInt(style.left) - modifier}px`;
          } else {
            alert("estas en el borde");
          }

          break;
        case "derecha":
          if (`${parseInt(style.left) + modifier}` <= 280) {
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
    ctx.drawImage(canvasBg, 6, 10);
    containerTestView.appendChild(canvasObject);
    document.getElementById("start").style.display = "flex";
    document.getElementById("goal").style.display = "flex";
    handleDirectionClick(e);
  };
  console.log(positionTop, "top");
  console.log(positionLeft, "left");

  const revealBlock = () => {
    document.getElementById("block").style.display = "flex";
    document.getElementById("goal").style.display = "none";
  };

  const validateSequence = () => {
    let data = {
      positionTop: positionTop,
      positionLeft: positionLeft,
    };

    if (startTest) {
      console.log("data respuesta usuario:>> ", data);
      revealBlock();
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <h1>Pruebas de Pensamiento Computacional</h1>
      <img
        className="imgBg"
        src="https://i.imgur.com/LayNEQc.png"
        style={{ display: "none", height: "100px" }}
        alt="grid img"
      />
      <div
        id="start"
        style={{
          display: "none",
          width: "23px",
          height: "23px",
          backgroundColor: "yellow",
          position: "absolute",
          top: startPostions.top,
          left: startPostions.left,
        }}
      ></div>
      <div
        id="block"
        style={{
          display: "none",
          width: "23px",
          height: "23px",
          backgroundColor: "mediumaquamarine",
          position: "absolute",
          top: 134,
          left: 14,
        }}
      ></div>
      <div
        id="goal"
        style={{
          display: "none",
          width: "23px",
          height: "23px",
          backgroundColor: "red",
          position: "absolute",
          top: goalPositions.top,
          left: goalPositions.left,
        }}
      ></div>
      <button onClick={handleStartTest}>iniciar test</button>
      <button onClick={validateSequence}>Enviar respuestas</button>
      <div className="test">
        <div className="testView">prueba 1</div>
        <div className="controls">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleDirectionClick} name="arriba">
              arriba
            </button>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 7 }}>
            <button onClick={handleDirectionClick} name="izquierda">
              izquierda
            </button>
            <button onClick={handleDirectionClick} name="abajo">
              abajo
            </button>
            <button onClick={handleDirectionClick} name="derecha">
              derecha
            </button>
          </div>
          <div className="ordersView"></div>
        </div>
      </div>
      <button style={{ marginLeft: 60 }}>
        <Link to="/report">Ver reporte</Link>
      </button>
    </div>
  );
};

export default Tests;
