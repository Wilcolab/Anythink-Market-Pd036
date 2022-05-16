import React from "react";
import agentObj from "../../agent";
import logo from "../../imgs/logo.png";
import { ITEMS_LOADED } from "../../constants/actionTypes";
import { connect } from "react-redux";

function useSearchInput(initialValue, onItemsLoaded) {
  const [value, setValue] = React.useState(initialValue);
  const [visible, setVisible] = React.useState(false);

  async function searchByTitle(title) {
    const promise = title
      ? agentObj.Items.byTitle(title)
      : agentObj.Items.all();
    const result = await promise;
    onItemsLoaded(result.items, title);
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
    visible,
    setVisible,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onItemsLoaded: (items, searchTerm) =>
    dispatch({ type: ITEMS_LOADED, payload: { items, searchTerm } }),
});

const Banner = ({ onItemsLoaded }) => {
  const { value, onChange, visible, setVisible } = useSearchInput(
    "",
    onItemsLoaded
  );
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" className="banner-img" />
        <h2 className="search-title">
          A place to{" "}
          <span
            tabIndex={0}
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => setVisible(true)}
            onKeyDown={() => setVisible(true)}
          >
            get
          </span>
          {visible && (
            <input
              id="search-box"
              type="text"
              placeholder="What is it that you truly desire?"
              value={value}
              onChange={(e) => onChange(e)}
            />
          )}{" "}
          the cool stuff.
        </h2>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Banner);
