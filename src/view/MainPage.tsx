import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import InfoPanel from "../components/InfoPanel";
import * as WalletStore from "../store/wallet.store";
import { TokenType, TokenSymbol } from "../constants/constants";
import "../style/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false);
  const [isBalanceError, setIsBalanceError] = useState<boolean>(false);

  const fetchBalance = useCallback(async () => {
    setIsBalanceLoading(true);
    try {
      await WalletStore.fetchBalance(TokenType.Ethereum);
      await WalletStore.fetchBalance(TokenType.GCRE);
    } catch (err) {
      console.error("Error getting balance", err);
      setIsBalanceError(true);
    }
    setIsBalanceLoading(false);
  }, [setIsBalanceLoading, setIsBalanceError]);

  useEffect(() => {
    const walletInfo = WalletStore.getWalletInfo();
    if (!walletInfo.address) {
      navigate("/");
      return;
    }
    fetchBalance();
  }, []);

  const getBalanceDisplayText = useCallback(
    (tokenType: TokenType) => {
      if (isBalanceLoading) return "Loading...";
      if (isBalanceError) return "Error";
      const balanceInfo = WalletStore.getBalanceInfo();
      if (!balanceInfo[tokenType]) return null;
      return `${balanceInfo[tokenType]} ${TokenSymbol[tokenType]}`;
    },
    [isBalanceLoading, isBalanceError]
  );
  const ethereumBalanceInfo = useMemo(
    () => getBalanceDisplayText(TokenType.Ethereum),
    [getBalanceDisplayText]
  );
  const gcreBalanceInfo = useMemo(
    () => getBalanceDisplayText(TokenType.GCRE),
    [getBalanceDisplayText]
  );

  return (
    <div className="main-page">
      <NavigationBar />
      <div className="main-page__content">
        <section className="main-page__section">
          <label className="main-page__section-label">Balance</label>
          <div className="main-page__section-content main-page__section-content--balance">
            <InfoPanel
              label="Ethereum"
              info={ethereumBalanceInfo}
              isCentered={true}
              isLarge={true}
            />
            <InfoPanel
              label="G-CRE"
              info={gcreBalanceInfo}
              isCentered={true}
              isLarge={true}
            />
          </div>
        </section>
        <section className="main-page__section">
          <label className="main-page__section-label">About Wallet</label>
          <div className="main-page__section-content main-page__section-content--wallet">
            <InfoPanel
              label="Address"
              info={WalletStore.getWalletInfo().address}
            />
            <InfoPanel
              label="Private Key"
              info={WalletStore.getWalletInfo().privateKey}
              visibilityToggleable={true}
            />
            <InfoPanel
              label="Mnemonic"
              info={WalletStore.getWalletInfo().mnemonic}
              visibilityToggleable={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
