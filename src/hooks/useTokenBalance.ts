import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../telo-finance/ERC20';
import useTeloFinance from './useTeloFinance';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const teloFinance = useTeloFinance();
  const isUnlocked = teloFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(teloFinance.myAccount));
  }, [token, teloFinance.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, token, fetchBalance, teloFinance]);

  return balance;
};

export default useTokenBalance;
