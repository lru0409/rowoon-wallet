import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/StartPage.css";
import "../style/common.css";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div className="start-page__title">
        Rowoon
        <br />
        Wallet
      </div>
      <div className="start-page__buttons">
        <button className="button" onClick={() => navigate("/main")}>
          Create New Wallet
        </button>
        <button className="button" onClick={() => navigate("/import")}>
          Import Existing Wallet
        </button>
      </div>
    </div>
  );
};

export default StartPage;
