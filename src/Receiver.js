import React from "react";
import "./App.css";

const Receiver = () => {
    return (
        <div className="receiver">
            <label className="base-label">Alıcı Adı : </label> <input id="rName" className="base-input" type="text" ></input>
            <br/>
            <label className="base-label">Alıcı Soyadı : </label> <input id="rSurname" className="base-input" type="text"></input>
            <br/>
            <label className="base-label">Vergi Kimlik Numarası : </label> <input id="rTaxNumber" className="base-input" type="text" minLength ="10" maxLength="11" ></input>
        </div>
    );
};

export default Receiver;