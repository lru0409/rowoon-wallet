import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import InfoPanel from "../components/InfoPanel";
import "../style/MainPage.css";
import useWalletContext from "../contexts/WalletContext";
import { ethers, Contract } from "ethers";
import GCRE_ABI from "../abi/GCRE_ABI.json";
import { GCRE_CONTRACT_ADDRESS } from "../constants/constants";

const MainPage = () => {
  const navigate = useNavigate();
  const {
    provider,
    walletInfo,
    balanceInfo,
    setBalanceInfo,
    isBalanceLoading,
    setIsBalanceLoading,
    TOKEN_SYMBOLS,
  } = useWalletContext();

  const fetchBalance = useCallback(
    async (address: string) => {
      setIsBalanceLoading(true);
      try {
        const gcreContract = new Contract(
          GCRE_CONTRACT_ADDRESS,
          GCRE_ABI,
          provider
        );
        const [ethRaw, gcreRaw, gcreDecimals] = await Promise.all([
          provider.getBalance(address),
          gcreContract.balanceOf(address),
          gcreContract.decimals(),
        ]);
        setBalanceInfo({
          ethereum: ethers.formatUnits(ethRaw, 18),
          gcre: ethers.formatUnits(gcreRaw, gcreDecimals),
        });
      } catch (err) {
        console.error("Error getting balance", err);
        setBalanceInfo({
          ethereum: "Error",
          gcre: "Error",
        });
      }
      setIsBalanceLoading(false);
    },
    [setIsBalanceLoading, provider, setBalanceInfo]
  );

  useEffect(() => {
    if (!walletInfo.address) {
      navigate("/");
      return;
    }
    fetchBalance(walletInfo.address);
  }, [walletInfo]);

  return (
    <div className="main-page">
      <NavigationBar />
      <div className="main-page__content">
        <section className="main-page__section">
          <label className="main-page__section-label">Balance</label>
          <div className="main-page__section-content main-page__section-content--balance">
            <InfoPanel
              label="Ethereum"
              info={
                isBalanceLoading
                  ? "Loading..."
                  : balanceInfo.ethereum
                  ? balanceInfo.ethereum + " " + TOKEN_SYMBOLS.ethereum
                  : null
              }
              isCentered={true}
              isLarge={true}
            />
            <InfoPanel
              label="G-CRE"
              info={
                isBalanceLoading
                  ? "Loading..."
                  : balanceInfo.gcre
                  ? balanceInfo.gcre + " " + TOKEN_SYMBOLS.gcre
                  : null
              }
              isCentered={true}
              isLarge={true}
            />
          </div>
        </section>
        <section className="main-page__section">
          <label className="main-page__section-label">About Wallet</label>
          <div className="main-page__section-content main-page__section-content--wallet">
            <InfoPanel label="Address" info={walletInfo.address} />
            <InfoPanel
              label="Private Key"
              info={walletInfo.privateKey}
              visibilityToggleable={true}
            />
            <InfoPanel
              label="Mnemonic"
              info={walletInfo.mnemonic}
              visibilityToggleable={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
