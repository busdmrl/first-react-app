import React from "react";
import "./App.css";

const Discount = () => {
    return (
        <div className="tax">
            <label className="base-label">İskonto Yüzdesi : </label><select id="percentage" className="percentage" type="number" ></select>
            <br/>
            <label className="base-label">İskonto Tutarı : </label><input id="amount" className="amount" type="number" ></input>
            <br/>
        </div>
    );
};

export default Discount;

