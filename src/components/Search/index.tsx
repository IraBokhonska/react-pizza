import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <BsSearchHeart className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Пошук піци..."
      />
      {value && (
        <AiOutlineClose onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;
