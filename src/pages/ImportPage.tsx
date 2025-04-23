import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, Mnemonic } from "ethers";
import NavigationBar from "../components/NavigationBar";
import "../style/common.css";
import "../style/ImportPage.css";
import useWalletContext from "../contexts/WalletContext";

const ImportPage = () => {
  const navigate = useNavigate();
  const [mnemonicInput, setMnemonicInput] = useState("");
  const { setWalletInfo } = useWalletContext();

  const restoreWallet = useCallback(() => {
    try {
      const mnemonic = Mnemonic.fromPhrase(
        mnemonicInput.trim().toLowerCase().replace(/\s+/g, " ")
      );
      const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
      setWalletInfo({
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase ?? null,
      });
    } catch (err) {
      console.log("Error restore wallet", err);
    }
  }, [mnemonicInput, setWalletInfo]);

  const onRestoreButtonClick = () => {
    restoreWallet();
    navigate("/main");
  };

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
