import React from "react";
const SearchBar = (props) => {
  return (
   <div>
       <input className="search" 
       type="text" 
       placeholder="Search..."
       onChange = {props.handleChange}>  
       </input>
   </div>
  )
}

export default SearchBar;