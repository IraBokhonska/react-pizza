import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../scss/pages/_full-pizza.scss";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();
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
    return <div className="full-pizza__loading">Завантаження...</div>;
  }

  return (
    <div className="container full-pizza">
      <div className="full-pizza__img">
        <img src={pizza.imageUrl} alt="pizzaItem" />
      </div>
      <div className="full-pizza__content">
        <h2 className="full-pizza__title">{pizza.title}</h2>
        <p className="full-pizza__description">{pizza.description}</p>
        <h4 className="full-pizza__price">від {pizza.price} грн</h4>
      </div>
    </div>
  );
};

export default FullPizza;
