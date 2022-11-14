import { Exchange } from 'ccxt';

export
class KLineWatcher {
  public async Start(
    exchange: Exchange,
    symbol: string,
    timeframe: string,
    limit = 2,
    interval = 1000,
  ) {
    try {
      const kline = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
      console.log(kline);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.Start(exchange, symbol, timeframe, limit, interval);
      }, interval);
    }
  }
}