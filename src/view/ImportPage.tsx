import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import * as WalletStore from "../store/wallet.store";
import "../style/common.css";
import "../style/ImportPage.css";

const ImportPage = () => {
  const navigate = useNavigate();
  const [mnemonicInput, setMnemonicInput] = useState("");

  const onRestoreButtonClick = useCallback(() => {
    try {
      WalletStore.restoreWallet(mnemonicInput);
    } catch (err) {
      console.log("Error restore wallet", err);
    }
    navigate("/main");
  }, [mnemonicInput, navigate]);

  return (
    <div className="import-page">
      <NavigationBar />
      <div className="import-page__content">
        <div className="import-page__field">
          <label className="import-page__field-label">Recovery Phrase</label>
          <textarea
            className="import-page__field-textarea"
            value={mnemonicInput}
            onChange={(e) => {
              setMnemonicInput(e.target.value);
            }}
          />
        </div>
        <button
          className="button import-page__button"
          onClick={onRestoreButtonClick}
        >
          Restore
        </button>
      </div>
    </div>
  );
};

export default ImportPage;
