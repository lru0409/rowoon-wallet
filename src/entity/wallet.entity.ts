import { TokenType } from "../constants/constants";

interface WalletInfo {
  address: string | null;
  publicKey: string | null;
  privateKey: string | null;
  mnemonic: string | null;
}

type BalanceInfo = Record<TokenType, string | null>;

class Wallet {
  private walletInfo: WalletInfo = {
    address: null,
    publicKey: null,
    privateKey: null,
    mnemonic: null,
  };
  private balanceInfo: BalanceInfo = {
    ethereum: null,
    gcre: null,
  };

  getWalletInfo() {
    return this.walletInfo;
  }
  setWalletInfo(info: WalletInfo) {
    this.walletInfo = info;
  }
  getBalanceInfo() {
    return this.balanceInfo;
  }
  setBalance(tokenType: TokenType, balance: string) {
    this.balanceInfo[tokenType] = balance;
  }
}

export default Wallet;
