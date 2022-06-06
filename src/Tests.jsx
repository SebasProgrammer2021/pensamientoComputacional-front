/* eslint-disable no-undef */
import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Tests = () => {
  const [ordersa, setOrdersa] = useState([]);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);
  const [startTest, setStartTest] = useState();
  const [blockRoute, setBlockRoute] = useState([
    { top: "134px", left: "14px" },
  ]);
  const [showTrace, setShowTrace] = useState();
  let modifier = 38;
  const block = document.getElementById("block");

  let test = {
    goalPosition: { top: 362, left: 242 },
    startPostion: { top: 134, left: 14 },
    obstacles: [
      { top: 286, left: 14 },
      { top: 248, left: 128 },
      { top: 324, left: 166 },
      { top: 286, left: 280 },
    ],
  };

  const { goalPosition, startPostion, obstacles } = test;

  const handleBlockedByBug = (nextTop, nextLeft) => {
    let availableToMove = true;
    // console.log(nextTop, nextLeft);
    obstacles.map((obstacle) => {
      if (`${obstacle.top}px` === nextTop) {
        console.log(nextTop, nextLeft);
        console.log(`${obstacle.top}px`);
        console.log(nextTop);

        // document.getElementById("block").style.top = `${
        //   parseInt(nextTop) - modifier
        // }px`;

        // availableToMove = false;
      }
      // else if (`${obstacle.left}px` === nextLeft) {
      //   document.getElementById("block").style.left = `${
      //     parseInt(nextLeft) + modifier
      //   }px`;
      // } else {
      //   return;
      // }
    });
    // return availableToMove;
  };

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
      handleBlockedByBug(style.top, style.left);
      setBlockRoute(blockRoute.concat({ top: style.top, left: style.left }));
      // console.log(style.top, style.left, "actual");
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

  const revealBlock = () => {
    let block = document.getElementById("block");
    block.style.display = "flex";
    block.style.zIndex = 10;
    setShowTrace(true);
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
          top: startPostion.top,
          left: startPostion.left,
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
          top: "134px",
          left: "14px",
        }}
      ></div>
      {showTrace &&
        blockRoute.map((coodinates, index) => (
          <div
            key={index}
            id="block"
            style={{
              display: showTrace ? "flex" : "none",
              width: "23px",
              height: "23px",
              backgroundColor: "mediumaquamarine",
              position: "absolute",
              top: coodinates.top,
              left: coodinates.left,
            }}
          ></div>
        ))}
      <div
        id="goal"
        style={{
          display: "none",
          width: "23px",
          height: "23px",
          backgroundColor: "red",
          position: "absolute",
          top: goalPosition.top,
          left: goalPosition.left,
        }}
      ></div>
      {/* {obstacles.map((obstacle, index) => (
        <div
          key={index}
          id="obstacle"
          style={{
            display: "flex",

            width: "23px",
            height: "23px",
            position: "absolute",
            top: obstacle.top,
            left: obstacle.left,
          }}
        >
          <img
            src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/undefined/external-bug-coding-kiranshastry-lineal-color-kiranshastry.png"
            alt="bug"
          />
        </div>
      ))} */}

      <button onClick={handleStartTest}>iniciar test</button>
      <button onClick={validateSequence}>Enviar respuestas</button>
      <div className="test">
        <div className="testView">prueba 1</div>
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
                className="imgSize"
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
      </div>
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
            target="_blank"
            rel="noreferrer"
            href="https://icons8.com/icon/uauxHDCVDyl8/bug"
          >
            Bug icon by Icons8
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
