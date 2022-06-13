import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../formStyles.css";
const Registration = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let ansok = false;
    if (data) {
      console.log(JSON.stringify(data));
      navigate("/test/1");
    } else {
      setAlert({
        show: true,
        title: "Advertencia",
        message: "Usuario ya registrado en el sistema.",
      });
    }
  };
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      <div className="fatherTitle">
        <div className="headerTitle">
          <h1 className="">Pruebas de Pensamiento Computacional</h1>
        </div>
        <div></div>
      </div>
      {alert.show && <Modal config={alert} setAlert={setAlert} />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Formulario de Registro</h2>
              <div className="card-bo.dy py-md-4">
                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)} _lpchecked="1">
                  <div className="form-group">
                    <input
                      {...register("identification", { required: true })}
                      type="number"
                      className="form-control"
                      id="identification"
                      placeholder="Cedula"
                    />
                    {errors.identification && (
                      <span style={{ color: "red" }}>
                        Este campo es requerido
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Nombre"
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        Este campo es requerido
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Correo electrónico"
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        Este campo es requerido
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
