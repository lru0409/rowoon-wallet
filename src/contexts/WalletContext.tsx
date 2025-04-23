import { createContext, useContext, useState, ReactNode } from "react";
import { Provider, JsonRpcProvider } from "ethers";

interface WalletInfo {
  address: string | null;
  publicKey: string | null;
  privateKey: string | null;
  mnemonic: string | null;
}

interface BalanceInfo {
  ethereum: string | null;
  gcre: string | null;
}

interface TokenSymbols {
  ethereum: "ETH";
  gcre: "G-CRE";
}

interface WalletContextType {
  provider: Provider;
  walletInfo: WalletInfo;
  setWalletInfo: React.Dispatch<React.SetStateAction<WalletInfo>>;
  balanceInfo: BalanceInfo;
  setBalanceInfo: React.Dispatch<React.SetStateAction<BalanceInfo>>;
  TOKEN_SYMBOLS: TokenSymbols;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const provider = new JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/VINrITPd341SRj_K90tO8_HjeCxAeUxj"
); // sepolia 테스트넷에 연결되는 Provider 생성

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const TOKEN_SYMBOLS: TokenSymbols = { ethereum: "ETH", gcre: "G-CRE" };

  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    publicKey: null,
    privateKey: null,
    mnemonic: null,
  });
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({
    ethereum: null,
    gcre: null,
  });

  return (
    <WalletContext.Provider
      value={{
        provider,
        walletInfo,
        setWalletInfo,
        balanceInfo,
        setBalanceInfo,
        TOKEN_SYMBOLS,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export default useWalletContext;
