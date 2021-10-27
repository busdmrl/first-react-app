import React from "react";
import "./App.css";

const Tax = () => {
    return (
        <div className="tax">
            <label className="base-label">Vergi Yüzdesi : </label>
            <select id="percentage" className="percentage" type="number" >
                <option value="0">%0</option>
                <option value="1">%1</option>
                <option value="8">%8</option>
                <option value="18">%18</option>
            </select>
            <label className="base-label">Vergi Tutarı : </label>
            <input id="amount" className="amount" type="number" ></input>
        </div>
    );
};

export default Tax;

