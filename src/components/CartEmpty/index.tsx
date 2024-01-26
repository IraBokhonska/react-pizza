import React from "react";
import { Link } from "react-router-dom";

import "./cart-empty.scss";
import cartEmptyImg from "../../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty container">
    <h2>Корзина порожня</h2>
    <span>😕</span>
    <p>
      Скоріше всого ви ще не замовили піцу.
      <br />
      Для того, щоб замовити піцу, перейдіть на головну сторінку.
    </p>
    <img src={cartEmptyImg} alt="cartEmptyImg" />
    <Link to="/" className="button button--black">
      <span>Повернутися назад</span>
    </Link>
  </div>
);

export default CartEmpty;
