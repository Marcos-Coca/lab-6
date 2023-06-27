import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const value = {
      nombres: target.nombres.value,
      apellidos: target.apellidos.value,
      cedula: target.cedula.value,
      concepto: target.concepto.value,
      monto: target.monto.value,
      fecha: new Date(target.fecha.value).toJSON(),
    };

    fetch("https://localhost:7040/api/Viajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-12">
          <h1 className="my-4 text-center">Registro en Viaje Pico Duarte </h1>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" className="form-control" id="nombres" />
          </div>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" className="form-control" id="apellidos" />
          </div>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              className="form-control"
              id="cedula"
              placeholder="000-0000000-0"
            />
          </div>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="concepto">Concepto:</label>
            <input type="text" className="form-control" id="concepto" />
          </div>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="Monto">Monto:</label>
            <input type="number" className="form-control" id="monto" />
          </div>
        </div>

        <div className="col-md-12 mx-auto">
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input type="date" className="form-control" id="fecha" />
          </div>
        </div>

        <div className="col-md-12 mx-auto text-right">
          <button className="btn btn-primary mt-4 w-100" type="submit">
            Generar Comprobante
          </button>
        </div>
      </form>
    </div>
  );
}
