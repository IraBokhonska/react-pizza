import React from "react";
import debounce from "lodash.debounce";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
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
