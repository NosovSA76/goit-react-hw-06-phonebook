import React from "react";
import PropTypes from "prop-types";
import { SearchName, SearchInput, SearhField } from "./search.styled";

export const Search = ({ text, valueSearch, onChange }) => {
  return (
    <SearhField>
      <SearchName>
        {text}
        <SearchInput value={valueSearch} onChange={onChange}></SearchInput>
      </SearchName>
    </SearhField>
  );
};

Search.propTypes = {
  text: PropTypes.string.isRequired,
  valueSearch: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
