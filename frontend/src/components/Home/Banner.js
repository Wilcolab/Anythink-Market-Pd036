import React from "react";
import agentObj from "../../agent";
import logo from "../../imgs/logo.png";
import { ITEMS_LOADED } from "../../constants/actionTypes";
import { connect } from "react-redux";

function useSearchInput(initialValue, onItemsLoaded) {
  const [value, setValue] = React.useState(initialValue);
  async function searchByTitle(title) {
    const promise = title
      ? agentObj.Items.byTitle(title)
      : agentObj.Items.all();
    const result = await promise;
    onItemsLoaded(result.items, value);
  }

  function handleChange(e) {
    const { value } = e.target;
    setValue(value);
    if (value.length >= 3) {
      searchByTitle(value);
    } else if (!value.length) {
      searchByTitle("");
    }
  }

  return {
    value,
    onChange: handleChange,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onItemsLoaded: (items, searchTerm) => dispatch({ type: ITEMS_LOADED, payload: {items,searchTerm} }),
});

const Banner = ({ onItemsLoaded }) => {
  const { value, onChange } = useSearchInput("", onItemsLoaded);
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" className="banner-img" />
        <h2 className="search-title">
          A place to get
          <input
            id="search-box"
            type="text"
            placeholder="What is it that you truly desire?"
            value={value}
            onChange={(e) => onChange(e)}
          />{" "}
          the cool stuff.
        </h2>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Banner);
