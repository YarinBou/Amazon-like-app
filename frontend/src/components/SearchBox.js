import React from "react";
const SearchBox = ({ placeholder, handleChange, style }) => {
  return (
    <div className="box">
      <form action="" className="search-bar">
        <input
          type="search"
          className="search"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBox;
