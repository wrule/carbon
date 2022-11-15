import { binance } from 'ccxt';
import { RealSpot } from './executor/real_spot';
import { DingTalk } from './notifier/dingtalk';
const secret = require('./.secret.json');
const dingtalk = require('./.dingtalk.json');

async function main() {
  const notifier = new DingTalk(dingtalk);
  const exchange = new binance({ ...secret, enableRateLimit: true });
  console.log('加载市场...');
  await exchange.loadMarkets();
  const spot = new RealSpot({ exchange, symbol: 'UNI/USDT', init_funds: 15, init_assets: 0, notifier });
  console.log('发起交易...');
  await spot.BuyAll(5);
  await spot.SellAll(5);
  console.log('结束交易');
}

main();
