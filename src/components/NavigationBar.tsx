import { useNavigate } from "react-router-dom";
import "../style/NavigationBar.css";
import backIcon from "../assets/icons/back-arrow.svg";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <header className="navigation-bar">
      <button
        className="navigation-bar__back-button"
        onClick={() => navigate("/")}
        aria-label="back"
      >
        <img src={backIcon} aria-hidden={true} />
      </button>
      <div className="navigation-bar__title">Rowoon Wallet</div>
    </header>
  );
};

export default NavigationBar;
