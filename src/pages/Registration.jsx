import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../formStyles.css";
import registerStudent from "../api/endpoints/registerStudent";

const Registration = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      localStorage.setItem("cedula", data?.cedula);
      registerStudent(data)
        .then(function (response) {
          if (response) {
            setAlert({
              show: true,
              title: "Genial",
              message:
                "Puedes continuar con la prueba, en instantes serás redirigido",
            });
            reset();
            setTimeout(() => {
              navigate("test/1");
            }, 2000);
          }
        })
        .catch(function (error) {
          setAlert({
            show: true,
            title: "oh oh",
            message: error?.response?.data?.Mensaje,
          });
        });
    } else {
      setAlert({
        show: true,
        title: "Advertencia",
        message: "Usuario ya registrado en el sistema.",
      });
    }
  };

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
              <h2
                className="card-title text-center"
                style={{
                  color: "black",
                }}
              >
                Formulario de Registro
              </h2>
              <div className="card-bo.dy py-md-4">
                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)} _lpchecked="1">
                  <div className="form-group">
                    <input
                      {...register("cedula", { required: true })}
                      autoComplete="1094666333"
                      type="number"
                      className="form-control"
                      id="cedula"
                      placeholder="Cedula"
                    />
                    {errors.cedula && (
                      <span style={{ color: "red" }}>
                        Este campo es requerido
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("nombre", { required: true })}
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Nombre"
                    />
                    {errors.nombre && (
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
