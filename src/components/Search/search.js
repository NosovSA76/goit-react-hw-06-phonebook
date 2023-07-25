import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filter/filter-slice";
import { getFilter } from "../../redux/filter/filter-selector";
import { SearchName, SearchInput, SearhField } from "./search.styled";

export const Search = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = (e) => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <SearhField>
      <SearchName>
        Find contacts by name
        <SearchInput value={filter} onChange={changeFilter}></SearchInput>
      </SearchName>
    </SearhField>
  );
};
