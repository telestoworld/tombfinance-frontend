import { useEffect, useState } from 'react';
import useTeloFinance from './useTeloFinance';
import { TokenStat } from '../telo-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await tombFinance.getTombStatInEstimatedTWAP());
      }catch(err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, tombFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
