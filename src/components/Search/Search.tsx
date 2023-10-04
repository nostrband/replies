import { InputGroup, Button, Form } from "react-bootstrap";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("id") ? searchParams.get("id") : "",
  );

  const searchHandleByEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "/",
        search: inputValue
          ? createSearchParams({ id: inputValue }).toString()
          : "",
      });
    }
  };

  const searchHandle = () => {
    navigate({
      pathname: "/",
      search: inputValue
        ? createSearchParams({ id: inputValue }).toString()
        : "",
    });
  };

  return (
    <InputGroup className="mb-3" id="search-input">
      <Form.Control
        value={inputValue ? inputValue : ""}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={"Enter noteid or naddr to view replies..."}
        onKeyDown={searchHandleByEnter}
      />
      <Button
        className="btn"
        id="search-btn"
        variant="outline-secondary"
        onClick={searchHandle}
      >
        <SearchIcon />
      </Button>
    </InputGroup>
  );
};

export default Search;
