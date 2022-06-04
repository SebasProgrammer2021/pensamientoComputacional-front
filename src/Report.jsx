import React from "react";
import { Link } from "react-router-dom";

const Report = () => {
  return (
    <div>
      <h1>Reporte</h1>
      <button>
        <Link to="/">Volver a la página de inicio</Link>
      </button>
      <p>dato 1</p>
      <p>dato 2</p>
      <p>dato 3</p>
      <p>dato 4</p>
      <p>dato 5</p>
    </div>
  );
};

export default Report;
