import React from "react";
import styles from "./Search.module.scss";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <BsSearchHeart className={styles.icon} />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Пошук піци..."
      />
      {searchValue && (
        <AiOutlineClose
          onClick={() => setSearchValue("")}
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};

export default Search;
