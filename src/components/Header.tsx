import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logoSvg from "../assets/img/pizza-logo.svg";
import Search from "./Search";
import { selectCart } from "../redux/cart/selectors";

import { FiShoppingCart } from "react-icons/fi";

function Header() {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>неймовірно смачна піца тільки у нас</p>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" &&
          !location.pathname.startsWith("/pizza/") && <Search />}
        <div className="header__cart">
          {location.pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} грн</span>
              <div className="button__delimiter"></div>
              <FiShoppingCart className="shopping" />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
