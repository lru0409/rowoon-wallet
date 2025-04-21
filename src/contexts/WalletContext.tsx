import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
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
  isBalanceLoading: boolean;
  setIsBalanceLoading: React.Dispatch<React.SetStateAction<boolean>>;
  TOKEN_SYMBOLS: TokenSymbols;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const provider = useMemo(
    () =>
      new JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/VINrITPd341SRj_K90tO8_HjeCxAeUxj"
      ),
    []
  ); // sepolia 테스트넷에 연결되는 Provider 생성
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
  const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false);

  return (
    <WalletContext.Provider
      value={{
        provider,
        walletInfo,
        setWalletInfo,
        balanceInfo,
        setBalanceInfo,
        isBalanceLoading,
        setIsBalanceLoading,
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
