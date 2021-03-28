import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onToggle, isAddTask }) => {
  const onClick = (e) => {
    onToggle();
  };
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={isAddTask ? "red" : "green"}
          text={isAddTask ? "Close" : "Add"}
          onClick={onClick}
        />
      )}
    </header>
  );
};

Header.defaultProps = { title: "Task Tracker" };
Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
