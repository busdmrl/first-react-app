import React, { useState, useEffect } from "react";
import "./App.css";
import Tax from "./Tax";

const Product = () => {
    const [taxes, setTaxes] = useState([{}]);

    return (
        <div className="product">
            <label className="base-label">Adet : </label><input id="quantity" className="quantity" type="number" ></input>
            <label className="base-label">Birim Fiyat : </label><input id="unitPrice" className="unit-price" type="number" ></input>
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

export default Product;