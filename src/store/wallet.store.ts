import { JsonRpcProvider } from "ethers";
import Wallet from "../entity/wallet.entity";
import * as WalletService from "../service/wallet.service";
import { TokenType } from "../constants/constants";

const provider = new JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/VINrITPd341SRj_K90tO8_HjeCxAeUxj"
); // sepolia 테스트넷에 연결되는 Provider 생성
const walletEntity = new Wallet();

export const getWalletInfo = () => walletEntity.getWalletInfo();
export const getBalanceInfo = () => walletEntity.getBalanceInfo();

export const createRandomWallet = () => {
  const wallet = WalletService.createRandomWallet(provider);
  walletEntity.setWalletInfo({
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase ?? null,
  });
};

export const restoreWallet = (mnemonicStr: string) => {
  const wallet = WalletService.restoreWallet(mnemonicStr);
  walletEntity.setWalletInfo({
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase ?? null,
  });
};

export const fetchBalance = async (tokenType: TokenType) => {
  const address = walletEntity.getWalletInfo().address;
  if (!address) return;
  const balance = await WalletService.fetchBalance[tokenType](
    address,
    provider
  );
  walletEntity.setBalance(tokenType, balance);
};
