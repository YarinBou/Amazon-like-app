import React from "react";
const SearchBox = ({ placeholder, handleChange }) => {
  return (
    <form action="" class="search-bar">
      <div className="box">
        <i class="fa fa-search"></i>
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
