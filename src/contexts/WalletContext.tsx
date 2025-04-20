import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface WalletInfo {
  address: string | null;
  publicKey: string | null;
  privateKey: string | null;
  mnemonic: string | null;
}

interface WalletContextType {
  walletInfo: WalletInfo;
  setWalletInfo: React.Dispatch<React.SetStateAction<WalletInfo>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    publicKey: null,
    privateKey: null,
    mnemonic: null,
  });

  return (
    <WalletContext.Provider value={{ walletInfo, setWalletInfo }}>
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
