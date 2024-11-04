import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { shearched } from "../../features/filter/filterSlice";
export default function Search() {
  const { search } = useSelector((state) => state.filters);
  const [text, setText] = useState(search);
  const dispatch = useDispatch();

  const match = useMatch("/");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(shearched(text));

    // if user is not home page,redirect to home page
    if (!match) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="outline-none border-none mr-2"
        type="search"
        name="search"
        placeholder="Search"
        onChange={handleChange}
        value={text}
      />
    </form>
  );
}
