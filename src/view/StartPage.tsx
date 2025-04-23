import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "ethers";
import * as WalletStore from "../store/wallet.store";
import "../style/StartPage.css";
import "../style/common.css";

const StartPage = () => {
  const navigate = useNavigate();

  const onCreateWalletButtonClick = useCallback(() => {
    WalletStore.createRandomWallet();
    navigate("/main");
  }, [navigate]);

  return (
    <div className="start-page">
      <div className="start-page__title">
        Rowoon
        <br />
        Wallet
      </div>
      <div className="start-page__buttons">
        <button className="button" onClick={onCreateWalletButtonClick}>
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
