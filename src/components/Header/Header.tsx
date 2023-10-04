import { ReplyAllFill } from "react-bootstrap-icons";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={"/"} className="header">
      <ReplyAllFill color="#ffc107" stroke="#fd7e14" />
      &nbsp;Replies
    </Link>
  );
};

export default Header;
