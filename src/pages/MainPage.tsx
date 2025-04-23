import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import InfoPanel from "../components/InfoPanel";
import "../style/MainPage.css";
import useWalletContext from "../contexts/WalletContext";
import { ethers, Contract } from "ethers";
import GCRE_ABI from "../abi/GCRE_ABI.json";
import { GCRE_CONTRACT_ADDRESS, TokenType } from "../constants/constants";

const MainPage = () => {
  const navigate = useNavigate();
  const { provider, walletInfo, balanceInfo, setBalanceInfo, TOKEN_SYMBOLS } =
    useWalletContext();
  const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false);
  const [isBalanceError, setIsBalanceError] = useState<boolean>(false);

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
        setIsBalanceError(true);
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

  const getBalanceDisplayText = useCallback(
    (tokenType: TokenType) => {
      if (isBalanceLoading) return "Loading...";
      if (isBalanceError) return "Error";
      if (!balanceInfo[tokenType]) return null;
      return `${balanceInfo[tokenType]} ${TOKEN_SYMBOLS[tokenType]}`;
    },
    [isBalanceLoading, isBalanceError, balanceInfo]
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
