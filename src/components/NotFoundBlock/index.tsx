import React from "react";
import "./not-found-block.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="not-found-block">
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className="not-found-block__description">
        На жаль дана сторінка відсутня у нашому інтернет-магазині
      </p>
    </div>
  );
};

export default NotFoundBlock;
