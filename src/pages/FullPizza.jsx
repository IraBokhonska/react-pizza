import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://651c28bf194f77f2a5af7c4f.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Помилка при отриманні піци");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nulla
        incidunt modi reprehenderit quia ea excepturi commodi qui nam.
        Architecto quam quisquam omnis sunt velit voluptate fugit nesciunt
        accusamus expedita?
      </p>
      <h4>{pizza.price} грн</h4>
    </div>
  );
};

export default FullPizza;
