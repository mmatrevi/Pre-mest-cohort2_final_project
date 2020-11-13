import React, { useState } from "react";
import Nav from "./Nav";
import "./callRequest.css";

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  function addItemToCart(e) {
    e.preventDefault();
    const item = e.target.value;
    console.log(item);
    setCart((cart) => [...cart, item]);
  }

  function submit(e) {
    e.preventDefault();
  }

  return (
    <div className="container">
      <Nav />
      <form className="formpage">
        <div className="items">
          <button value="Time: 8am - 9am" onClick={addItemToCart}>
            Time: 8am - 9am
          </button>
          <button value=" Time: 10am - 2pm" onClick={addItemToCart}>
            Time: 10am - 2pm
          </button>
          <button value="Time: 2pm - 5pm" onClick={addItemToCart}>
            Time: 2pm - 5pm
          </button>
          <button value="Time: 5pm - 7pm" onClick={addItemToCart}>
            Time: 5pm - 7pm
          </button>
        </div>
      </form>
      <div className="callList">
        Scheduled Time:
        <ul>
          {cart.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <button className="submit" value="one" onClick={submit}>
        submit
      </button>
    </div>
  );
}

export default ShoppingCart;
