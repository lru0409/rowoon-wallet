import {
  Wallet,
  HDNodeWallet,
  Provider,
  Mnemonic,
  Contract,
  formatUnits,
} from "ethers";
import { GCRE_CONTRACT_ADDRESS } from "../constants/constants";
import GCRE_ABI from "../abi/GCRE_ABI.json";

export const createRandomWallet = (provider: Provider) =>
  Wallet.createRandom(provider);

export const restoreWallet = (mnemonicStr: string) => {
  const mnemonic = Mnemonic.fromPhrase(
    mnemonicStr.trim().toLowerCase().replace(/\s+/g, " ")
  );
  return HDNodeWallet.fromMnemonic(mnemonic);
};

export const fetchBalance = {
  ethereum: async (address: string, provider: Provider) => {
    const balanceRaw = await provider.getBalance(address);
    return formatUnits(balanceRaw, 18);
  },
  gcre: async (address: string, provider: Provider) => {
    const gcreContract = new Contract(
      GCRE_CONTRACT_ADDRESS,
      GCRE_ABI,
      provider
    );
    const [balanceRaw, decimals] = await Promise.all([
      gcreContract.balanceOf(address),
      gcreContract.decimals(),
    ]);
    return formatUnits(balanceRaw, decimals);
  },
};
