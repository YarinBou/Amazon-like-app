import React from "react";
const SearchBox = ({ placeholder, handleChange }) => {
  return (
    <form action="" className="search-bar">
      <div className="box">
        <input
          type="search"
          className="search"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBox;
