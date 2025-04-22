import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "ethers";
import "../style/StartPage.css";
import "../style/common.css";
import useWalletContext from "../contexts/WalletContext";

const StartPage = () => {
  const navigate = useNavigate();
  const { provider, setWalletInfo } = useWalletContext();

  // 지갑 생성 & 생성된 지갑 정보 저장
  const createWallet = useCallback(() => {
    const wallet = Wallet.createRandom(provider);
    setWalletInfo({
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase ?? null,
    });
  }, [setWalletInfo]);

  const onCreateWalletButtonClick = useCallback(() => {
    createWallet();
    navigate("/main");
  }, [createWallet, navigate]);

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
