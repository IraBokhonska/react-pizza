import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { setSearchValue } from "../../redux/filter/slice";

import "./search.scss";

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
    <div className="search">
      <div className="search__wrapper ">
        <BsSearchHeart className="icon" />
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className="input"
          placeholder="Пошук піци..."
        />
        {value && (
          <AiOutlineClose onClick={onClickClear} className="clearIcon" />
        )}
      </div>
    </div>
  );
};

export default Search;
