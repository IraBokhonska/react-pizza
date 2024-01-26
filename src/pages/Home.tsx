import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";

import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";

import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch]
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    const params = {
      categoryId: categoryId > 0 ? categoryId : null,
      sortProperty: sort.sortProperty,
      currentPage,
    };

    const queryString = qs.stringify(params);
    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Сталася помилка 😕</h2>
          <p>На жаль нам не вдалося отримати піци. Спробуйте знову пізніше.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
