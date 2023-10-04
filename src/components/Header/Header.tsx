import { ChatDots } from "react-bootstrap-icons";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={"/"} className="header">
      <ChatDots /> Replies
    </Link>
  );
};

export default Header;
