console.log(`BINANCE.JS LOADED`);

const EventEmitter = require(`events`);
export var mainEmitter = new EventEmitter();

let deleted = false;

export async function DeleteModule() {
  if (deleted) return;
  mainEmitter.removeAllListeners();
  deleted = true;
  started = false;
}

// function customLog() {
//   if(deleted) return
//   for (let i = 0; i < arguments.length; i++) {
//     console.log(arguments[i]);
//   }
//   mainEmitter.emit(`console-log`, arguments);
// }

function customLog(text, color) {
  if (deleted) return;
  console.log(text);
  mainEmitter.emit(`console-log`, { text, color });
}

let frontendLoaded = false;

mainEmitter.on(`did-finish-load`, function(data) {
  if (deleted) return;
  frontendLoaded = true;
  Initialize();
});

export let started = false;

export function StartBot() {
  if (deleted) return;
  started = true;
  console.log(`binance.StartBot()`);
}

export function StopBot() {
  started = false;
}

export let apiKey =
  "Vlc3bFEQshjgzIPx1s2gcmgtJ3Jtv3XDMkQYu7BbzWBX1eEODw7nbJ0OL9mGq0ty";
export let apiSecret =
  "uuHt0ftjBm1C1qRVM9hDqeqEnciGOgNhJl1PpiaeoCoTb4lkqUlkB7tzufGgCy3H";

// changing variables in the module from other scripts doesnt seem to work, says its read only, idk why, so i made setter functions
export function setApiKey(value) {
  if (deleted) return;
  apiKey = value;
}
export function setApiSecret(value) {
  apiSecret = value;
  if (deleted) return;
}

/*
TODO: TO SELL THE BOT: (this guy sells his bot on fiverr and makes a lot of money: https://www.fiverr.com/onfqzmpgvr/provide-my-cryptocurrency-trading-bot)
the bot needs a UI in electron or something

we need to get rid of the giant pairs list and have it retrieve all the pairs from binance itself, so that even a year from now all its pairs are up to date

right now our "master pair" is USDT but we should allow the user to use any master pair they desire

our 'Total profit this session' output needs changed, it doesnt consider we are currently stuck holding something that is going down, meaning it shows more profit than reality. 'total profit this session' could be displaying a positive value when in reality your account balance on binance is going down

obfuscate the code
*/

//* the 2nd part of the pair is the 'buy' pair meaning to place a buy order of say, $80, you need $80 in the THAT coin. even though you would think its the first one you need money in.
//. the only reason all of these end in USDT right now is for my own convenience, so that i only ever have to throw all my money into USDT to be able to buy any of the pairs listed here
//. it is very important that no duplicate pairs are added to this list by accident
//. WE REMOVED BTC_USDT FROM THE LIST BECAUSE IT CAN ONLY BE TRADED IN UNITS OF 0.001 AND WE DO NOT HAVE ENOUGH FUNDS IN OUR ACCOUNT TO GO BY MULTIPLES OF THAT UNIT SO BETTER TO JUST SKIP IT BECAUSE ITS NOT LETTING US BUY IT LIKE THIS
export let pairs = [
  "PAXG_USDT",
  "STRAT_USDT",
  "AUD_USDT",
  "CTXC_USDT",
  "GBP_USDT",
  "GXS_USDT",
  "NMR_USDT",
  "MDT_USDT",
  "IOTX_USDT",
  "GTO_USDT",
  "SC_USDT",
  "BLZ_USDT",
  "IRIS_USDT",
  "LUNA_USDT",
  "MKR_USDT",
  "OCEAN_USDT",
  "STORJ_USDT",
  "WAN_USDT",
  "BTS_USDT",
  "ANT_USDT",
  "SOL_USDT",
  "BAL_USDT",
  "TRB_USDT",
  "BZRX_USDT",
  "SAND_USDT",
  "WNXM_USDT",
  "JST_USDT",
  "SRM_USDT",
  "DOT_USDT",
  "CRV_USDT",
  "SUSHI_USDT",
  "YFII_USDT",
  "YFI_USDT",
  "ETH_USDT",
  "BNB_USDT",
  "XRP_USDT",
  "TRX_USDT",
  "LTC_USDT",
  "EOS_USDT",
  "LINK_USDT",
  "BTT_USDT",
  "ICX_USDT",
  "ERD_USDT",
  "ADA_USDT",
  "NEO_USDT",
  "WAVES_USDT",
  "CELR_USDT",
  "MATIC_USDT",
  "ONE_USDT",
  "VET_USDT",
  "XMR_USDT",
  "ALGO_USDT",
  "BAT_USDT",
  "QTUM_USDT",
  "NANO_USDT",
  "ETC_USDT",
  "XLM_USDT",
  "FTM_USDT",
  "IOTA_USDT",
  "FET_USDT",
  "ZIL_USDT",
  "ONT_USDT",
  "OMG_USDT",
  "ATOM_USDT",
  "HOT_USDT",
  "ZEC_USDT",
  "DOGE_USDT",
  "DASH_USDT",
  "ZRX_USDT",
  "BUSD_USDT",
  "XTZ_USDT",
  "USDC_USDT",
  "CTSI_USDT",
  "PAX_USDT",
  "TUSD_USDT",
  "WRX_USDT",
  "IOST_USDT",
  "WTC_USDT",
  "KAVA_USDT",
  "ENJ_USDT",
  "HBAR_USDT",
  "BAND_USDT",
  "WIN_USDT",
  "RVN_USDT",
  "OGN_USDT",
  "COTI_USDT",
  "MTL_USDT",
  "PERL_USDT",
  "THETA_USDT",
  "TOMO_USDT",
  "ANKR_USDT",
  "ARPA_USDT",
  "DATA_USDT",
  "KEY_USDT",
  "AION_USDT",
  "DENT_USDT",
  "BEAM_USDT",
  "EUR_USDT",
  "MBL_USDT",
  "NPXS_USDT",
  "COCOS_USDT",
  "STORM_USDT",
  "RLC_USDT",
  "LSK_USDT",
  "FTT_USDT",
  "LTO_USDT",
  "SXP_USDT",
  "TCT_USDT",
  "LEND_USDT",
  "KNC_USDT",
  "COMP_USDT",
  "BNT_USDT",
  "DOCK_USDT",
  "DUSK_USDT",
  "VITE_USDT",
  "TFUEL_USDT",
  "MANA_USDT",
  "CHR_USDT",
  "LINKUP_USDT",
  "STX_USDT",
  "BTCUP_USDT",
  "LINKDOWN_USDT",
  "PNT_USDT",
  "SNX_USDT",
  "ETHDOWN_USDT",
  "ETHUP_USDT",
  "BTCDOWN_USDT",
  "REN_USDT",
  "HIVE_USDT",
  "VTHO_USDT",
  "REP_USDT",
  "XZC_USDT",
  "CHZ_USDT",
  "MITH_USDT",
  "TROY_USDT",
  "DREP_USDT",
  "DAI_USDT",
  "ONG_USDT",
  "NKN_USDT",
  "NULS_USDT",
  "STPT_USDT",
  "DGB_USDT",
  "LRC_USDT",
  `BCH_USDT`
];

//* we should perhaps make it so that if a sell order is not filled within 5 hours or so, just sell it off, to keep things flowing. this would replace stop loss. it keeps things flowing. it sucks when we get locked into a position for 12 hours because it refuses to reach our target price. just sell it off and keep the trades going at a more current price.
//. user's system clock needs to update more frequently or it gets errors about binance thinking the timestamps are too far off. here are instructions by editing registry on win7: To change poll frequency: registry key HKLM\SYSTEM\CurrentControlSet\services\W32Time\TimeProviders\NtpClient, edit DWORD SpecialPollInterval, in seconds (e.g. for one day: hexadecimal 15180 or decimal 86400 (seconds))

//. this bot uses this wrapper api of binance's api, which makes it easier to use than using the binance api directly: https://github.com/Ashlar/binance-api-node

const colors = require("colors");
const fs = require("fs");
const Binance = require("binance-api-node").default;
export let tradeTopXOnly = 1; //for example if its 5, itll only trade the 5 best pairs found that had the highest total backtested profits.
//! WE GOT SOME DEBUG STUFF GOING ON WITH tradeTopXOnly CURRENTLY, DO A SEARCH FOR IT YOULL FIND IT. IT WILL CAUSE UNEXPECTED BEHAVIOR.
export let minVolume = 100000; //dont trade the coin if it hasnt had this much volume in the last 24 hours
export let minDaysHistory = 7; //dont trade a coin that doesnt have at least x days of chart history, its too new
export let baseQuantity = 35; //* this is dollars worth per trade, it will be adjusted to buy whatever quantity it can of the coin
export let buyExpireHours = 0.33; //if a buy order does not fill in x hours it will cancel the order and try something else instead
export let quantityGrows = true; //. the bot will raise the trade quantity by every successful trade's profit percentage to take advantage of compounding profits
export let maxQuantity = 999; //. but it won't go past this amount no matter what
//! IMPORTANT: I have set stopLossTriggerMinutes to this low value (it was 24 * 60) because I am using it to mimic a system where instead of stop loss, if we cant manage to sell it in just a few hours we sell it off no matter what price it is at just to keep the system moving so it doesnt get stuck on a trade for 24 hours. so like if it doesnt sell it in 5 hours it just gives up and sells it and tries to find something else to trade. we have also set the stop loss amount elsewhere from its normal 0.95 or such to something like 1.01 meaning it just sells it off regardless.
export let stopLossTriggerMinutes = 24 * 60; //. the price needs to have been below the stop loss price for this many minutes straight before itll sell it off
export let requireRecoveryForStopLoss = false; //. if true, the stop loss system will wait on a recovery to happen before allowing the stop loss to sell off the asset. a recovery could take days to occur, but at least it eliminates the risk of selling off at the bottom. whether it results in more or less of a loss i have no idea but it's the best i can think of right now. it uses SMA crossovers and such to gauge whether there is a recovery currently happening. when it thinks the recovery is at its peak it will sell off at the 'recovered' price, whatever that may be. in some cases that may mean you lose MORE than your stop loss was set at, and in other cases if it recovers high enough the stop loss may never be triggered at all and instead be sold at an actual profit as originally intended when bought. i do not know which of these scenarios is more likely but i just have this theory that waiting on the recovery to occur before selling it off would give better results. it would result in a TOTAL LOSS if the coin is collapsing permanently, as there will never be a recovery and it is headed to zero.
//* ***********************

export let totalFilledSells = 0; //total successful sells this session on all pairs
export let totalLosingTrades = 0;
export let activeOrders = [];
export let client;

const errors = {
  insufficientFunds: "insufficient funds"
};

let initialized = false;

export async function Initialize() {
  if (initialized) return;
  initialized = true;
  frontendLoaded = true; // the frontend is implied to be loaded if this function is being called by anywhere
  if (deleted) return;
  await sleep(5000);
  LoadHistory();
  while (!started) {
    if (deleted) return;
    await sleep(100);
  }
  await sleep(100);
  client = Binance({
    apiKey,
    apiSecret
  });
  await ExchangeInfo();
  await sleep(5000);
  await Backtesting();
  BacktestingLoop(); //. this is because on the rare chance it finds every single pair currently untradable, for example everything is crashing, it will stop the entire bot because the only time it'll ever reevaluate the backtesting is when a sell order goes through. but that would never happen if all pairs are deemed untradeable. so we make this occur every hour or so regardless just in case.
  customLog(`Trading begins in 5 seconds...`);
  await sleep(5000);
  for (let pair of pairs) {
    if (deleted) return;
    TradeLoop(pair);
    await sleep(1500);
  }
}

async function BacktestingLoop() {
  if (deleted) return;
  while (true) {
    if (deleted) return;
    await sleep(1 * 60 * 60 * 1000);
    TryBacktesting(true);
  }
}

function average(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum / (numbers.length || 1);
}

//. this is a Simple Moving Average that accepts a list of candles as the first parameter
function CandleAverage(candles, days) {
  let minTimestamp = Date.now() - days * 24 * 60 * 60 * 1000;
  let numbers = [];
  for (let c of candles) {
    if (c.openTime < minTimestamp) continue;
    numbers.push(Number(c.open));
  }
  return average(numbers);
}

function roundTo(n, precision) {
  precision = 1 / precision;
  //return Math.round(n * precision) / precision
  return Math.floor(n * precision) / precision;
}

//. just get the amount of zero places in any number
function ZeroPlaces(n) {
  n = n.toString();
  let dotFound = false;
  let places = 0;
  for (let i of n) {
    if (i == ".") dotFound = true;
    else if (dotFound) {
      if (i == "0") places++;
      if (i != "0") break;
    }
  }
  return places + 1;
}

//. formats the quantity to the maximum amount of decimals binance allows this pair to have
function QuantityDecimals(pair, quantity) {
  quantity = Number(quantity);
  let _pair = pair.replace("_", "");
  if (quantity >= 50) return Math.floor(quantity); //. certain coins have some sort of problem where their LOT_SIZE filter must be incorrect or something, its finding the LOT_SIZE filter, but yet when you try to place the order when abiding by those rules, it still rejects with a LOT_SIZE error. its always coins with a very low price like 0.001635, and because of the low price it tries to buy like 1000.735 of it, so instead, if the quantity is sufficient enough to accept it, we are just going to round off the decimals
  for (let rule of coinRules) {
    if (rule.symbol != _pair) continue;
    for (let filter of rule.filters) {
      if (filter.filterType == "LOT_SIZE") {
        let precision = filter.stepSize;
        if (precision < 0.001) precision = 0.001; //some coins don't report a proper stepSize and it causes errors
        return roundTo(quantity, precision);
        //return quantity.toFixed(ZeroPlaces(filter.stepSize))
      }
    }
    break;
  }
  customLog(`QuantityDecimals() NOT FOUND for ${pair}`);
}

//. same but for price
function PriceDecimals(pair, price) {
  let _pair = pair.replace("_", "");
  for (let rule of coinRules) {
    if (rule.symbol != _pair) continue;
    for (let filter of rule.filters) {
      if (filter.filterType == "PRICE_FILTER") {
        //return roundTo(price, filter.tickSize)
        return Number(price).toFixed(ZeroPlaces(filter.tickSize));
      }
    }
    break;
  }
}

//. turns out i need to sometimes get the decimals required without actually altering anything as a side effect
function GetPriceDecimals(pair) {
  let _pair = pair.replace("_", "");
  for (let rule of coinRules) {
    if (rule.symbol != _pair) continue;
    for (let filter of rule.filters) {
      if (filter.filterType == "PRICE_FILTER") {
        return ZeroPlaces(filter.tickSize);
      }
    }
  }
}

let exchangeInfo;
let coinRules = [];

async function ExchangeInfo() {
  if (deleted) return;
  while (true) {
    if (deleted) return;
    exchangeInfo = await client.exchangeInfo();
    if (exchangeInfo) {
      for (let symbol of exchangeInfo.symbols) {
        for (let pair of pairs) {
          if (symbol.symbol != pair.replace("_", "")) continue;
          coinRules.push(symbol);
          break;
        }
      }
      return;
    }
  }
}

let histories = [];

function LoadHistory() {
  if (deleted) return;
  customLog(`${pairs.length} coins in coin list`);
  let totalProfits = 0;
  let pairsCounted = 0;
  let totalTradeCount = 0;
  let historicalLosingTrades = 0;
  for (let pair of pairs) {
    let _pair = pair.replace("_", "");
    if (fs.existsSync(`history_${_pair}.json`)) {
      histories[_pair] = JSON.parse(fs.readFileSync(`history_${_pair}.json`));
      let history = histories[_pair];
      let allTimeProfit = 1;
      let allTimeTrades = 0;
      for (let o of history) {
        allTimeProfit *= o.profitPercent;
        allTimeTrades++;
        totalTradeCount++;
        if (o.profit < 0) historicalLosingTrades++;
      }
      let profitDisplay = (allTimeProfit - 1) * 100;
      totalProfits += profitDisplay;
      pairsCounted++;
      customLog(
        `${pair} history loaded (all time profit of ${roundTo(
          profitDisplay,
          0.01
        )}% from ${allTimeTrades} trades since ${history[0].date})`
      );
    }
  }
  customLog(
    `Additive profit across all ${pairsCounted} traded pairs: ${totalProfits.toFixed(
      2
    )}%`,
    "rgb(255,160,0)"
  );
  customLog(
    `Average profit per pair: ${(totalProfits / pairsCounted).toFixed(2)}%`
      .green
  );
  customLog(`Total trades: ${totalTradeCount}`);
  customLog(`Losing trades: ${historicalLosingTrades}`);
}

//. it only saves history of successful sells by the way, because its purpose is to tell you how much you've profit in the past x days
function SaveHistory(pair) {
  let _pair = pair.replace("_", "");
  //if (histories.includes(_pair)) {
  if (_pair in histories) {
    let history = histories[_pair];
    fs.writeFileSync(`history_${_pair}.json`, JSON.stringify(history, null, 2)); //. extra stringify args are to make it save in human readable instead of crunched
    //customLog(`${pair} history saved`)
  } else customLog(`did not save ${pair} history because it has no history`);
}

function AppendHistory(pair, timestamp, buyPrice, sellPrice, quantity) {
  let _pair = pair.replace("_", "");
  //if (!histories.includes(_pair)) histories[_pair] = []
  if (!(_pair in histories)) histories[_pair] = [];
  let newData = {
    date: GetDate(),
    timestamp: timestamp,
    profitPercent: (sellPrice * 0.999) / (buyPrice * 1.001),
    profit: sellPrice * 0.999 - buyPrice * 1.001, //. multiplier to account for fees taken out
    buyPrice: buyPrice,
    sellPrice: sellPrice,
    quantity: quantity,
    invested: quantity * buyPrice
  };
  histories[_pair].push(newData);
  //customLog(`${_pair} history added:`)
  //customLog(histories[_pair])
}

function DisplayAverageProfit(pair, days) {
  let _pair = pair.replace("_", "");
  let minTimestamp = Date.now() - days * 24 * 60 * 60 * 1000;
  let history = histories[_pair];
  let compoundedPercent = 1;
  let count = 0;
  history.forEach(function(trade) {
    if (trade.timestamp >= minTimestamp) {
      compoundedPercent *= trade.profitPercent;
      count++;
    }
  });
  compoundedPercent = (compoundedPercent - 1) * 100;
  if (compoundedPercent > 0) compoundedPercent = `+${compoundedPercent}`;
  customLog(
    `${days} days ${pair} compounded profit: ${Number(
      compoundedPercent
    ).toFixed(3)}% from ${count} trades`
  );
}

// async function GetCandles(pair, candleDuration, candleLimit) {
//     if (candleLimit === undefined || candleLimit > 1000) candleLimit = 1000 //. 1000 is the maximum binance allows
//     if (candleDuration === undefined) candleDuration = '5m' //. just seems like a good default
//     let _pair = pair.replace('_', '')
//     while (true) {
//         let candles = await client.candles({
//             symbol: _pair,
//             interval: candleDuration,
//             limit: candleLimit,
//         }).catch(reason => {
//             //customLog(`${reason}`)
//         })
//         if (candles && candles.length) return candles
//         await sleep(500)
//     }
// }

async function GetCandles(pair, candleDuration, candleLimit) {
  if (candleLimit === undefined || candleLimit > 1000) candleLimit = 1000; //. 1000 is the maximum binance allows
  if (candleDuration === undefined) candleDuration = "5m"; //. just seems like a good default
  let _pair = pair.replace("_", "");
  while (true) {
    let candles;
    client
      .candles({
        symbol: _pair,
        interval: candleDuration,
        limit: candleLimit
      })
      .then(result => {
        candles = result;
      })
      .catch(reason => {
        //customLog(`${reason}`)
      });
    for (let i = 0; i < 100; i++) {
      await sleep(100);
      if (candles && candles.length) return candles;
    }
  }
}

let tradeParams = []; //. params the backtesting has determined are the best trading options
let dontTradePairs = []; //. if the backtesting places a pair in this list then it means you wouldve lost money trading it so its not going to do it
let lastML = 0;
let lastNonSilentML = 0;
let MLinProgress = false;
let backtestCount = 0;

//. i never put this function to use, i just made it so that i can potentially use it if i want to use a strategy where i would need some sort of volatility rating
function GetVolatility(candles, balance) {
  if (balance === undefined) balance = 0.5;
  let startPrice = undefined;
  let endPrice = undefined;
  let lowPrice = undefined;
  let highPrice = undefined;
  for (let candle of candles) {
    if (startPrice === undefined) startPrice = Number(candle.open);
    endPrice = Number(candle.close);
    if (candle.open < lowPrice || lowPrice === undefined)
      lowPrice = Number(candle.open);
    if (candle.open > highPrice || highPrice === undefined)
      highPrice = Number(candle.open);
  }
  let startEndEffect = 0;
  if (endPrice > startPrice) startEndEffect = (endPrice / startPrice - 1) * 100;
  else startEndEffect = (startPrice / endPrice - 1) * 100;
  let lowHighEffect = (highPrice / lowPrice - 1) * 100;
  let volatility =
    startEndEffect * balance + lowHighEffect * Math.abs(balance - 1);
  // customLog(startPrice)
  // customLog(endPrice)
  // customLog(lowPrice)
  // customLog(highPrice)
  // customLog(startEndEffect)
  // customLog(lowHighEffect)
  return volatility;
}

async function Backtesting(silent) {
  if (deleted) return;
  if (MLinProgress) return;
  MLinProgress = true;
  lastML = Date.now();
  if (silent)
    customLog(`Backtesting in progress... (silent results). ${GetDate()}`);
  else customLog(`Backtesting in progress... ${GetDate()}`);
  if (!silent) lastNonSilentML = Date.now();
  let deferredTradeParamsToUpdate = [];
  for (let pair of pairs) {
    if (deleted) return;
    let _pair = pair.replace("_", "");
    //. check that this coin has the minimum volume that is required to trade it
    let dailyStats = await DailyStats(pair);
    if (dailyStats.quoteVolume && dailyStats.quoteVolume < minVolume) {
      if (!silent)
        customLog(`volume on ${pair} is below the minimum of $${minVolume}.`);
      SetTradeable(pair, false);
      continue;
    }
    let priceDecimals = GetPriceDecimals(pair);
    //. check that this coin has the minimum days of history required to trade it, otherwise it is too new
    let candles1d = await GetCandles(_pair, "1d", minDaysHistory + 1);
    if (candles1d.length < minDaysHistory) {
      if (!silent)
        customLog(
          `${pair} pair does not have the minimum ${minDaysHistory} days chart history to justify trading it. the coin is too new.`
        );
      SetTradeable(pair, false);
      continue;
    }

    let dataSets = 0;
    let candleCount = 1000; //. 1000 is the maximum binance allows
    let candleType = "1h"; //. 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    let candles = await GetCandles(_pair, candleType, candleCount);

    // let someCandles = await GetCandles(_pair, '15m', 1000)
    // customLog(`${pair} Volatility: ${GetVolatility(someCandles, 0.5).toFixed(2)}%`)
    // customLog(`${pair} Volatility: ${GetVolatility(someCandles, 1.0).toFixed(2)}%`)
    // customLog(`${pair} Volatility: ${GetVolatility(someCandles, 0.0).toFixed(2)}%`)

    //. customizable
    let SMAtolerance = 0.01; //0.968 //. example: if 0.9, it wont trade this coin if the price is 10% or more below the SMA, because it considers that a crash, it doesnt want to trade during crashing conditions, or even significantly downtrending conditions
    let SMAhours = 10;
    let factorStopLoss = false;
    //* if it seems the numbers between startPrice/endPrice/startProfit/endProfit/incrementPrice/incrementProfit are too tight and/or low resolution, it is because keeping those numbers tight speeds up backtesting immensely.
    let startPrice = candles[candles.length - 1].open * 0.25;
    let endPrice = candles[candles.length - 1].open * 2;
    let incrementPrice = candles[candles.length - 1].open / 100;
    let startProfit = 1.25;
    let endProfit = 2;
    let incrementProfit = 0.01;
    let minProjectedProfit = 1.15; // if the backtesting determined that this coin did not meet this minimum profit threshold over whatever time period we are using, then it will not be included as tradeable
    let skipUptrendCheck = true;
    let startStopLoss = 0.01;
    let endStopLoss = 0.01;
    let incrementStopLoss = -0.0025;
    let maxHoursSinceLastProfit = 9999999999999; //if the last successful trade for x price was more than x hours ago, its too old to matter
    let tradeSpread = 0.3; //for example, 0.5 means the time between the first successful trade found and the last one found must account for at least 50% of the total time measured. for example if we measured 1000 hours of trades but all 10 profitable trades found happened in the same 5 hour period you know its some kind of weird manipulation that isnt going to happen again
    let minTrades = 5;
    let lowOpenWeight = 1; //. if its 1, the weight is candle.low 100%, if its 0, the weight is candle.open 100%. if its at 0.5 its 50/50 of low and open weighted together
    //. ************

    if (
      dailyStats.lastPrice <=
      CandleAverage(candles, SMAhours / 24) * SMAtolerance
    ) {
      if (!silent) customLog(`${pair} is currently crashing. skipping.`);
      SetTradeable(pair, false);
      continue;
    }

    //. SMA crossover check
    let SMApassed = false;
    if (
      CandleAverage(candles, 5 / 24) >=
        CandleAverage(candles, 10 / 24) * 0.98 &&
      CandleAverage(candles, 10 / 24) >= CandleAverage(candles, 15 / 24) * 0.98
    ) {
      SMApassed = true;
    }
    if (skipUptrendCheck) SMApassed = true;
    if (!SMApassed) {
      if (!silent) customLog(`${pair} is trending downwards. skipping.`);
      SetTradeable(pair, false);
      continue;
    }

    //. when candleType is any longer than 1h at most it just wont be very accurate as a candle in those time ranges can vary so greatly that there's no telling if the stop loss happened before or after the trade would've been successful instead, because all it has to go on is the candle's low. it could have very well have hit the high first and been a successful trade. whereas if it was a 1/3/5 minute candle you can be reasonably sure it is properly measuring the risk because the deviation in those small time periods is limited
    if (
      ["2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"].includes(
        candleType
      )
    )
      factorStopLoss = false;
    let days = (
      (Date.now() - candles[0].openTime) /
      1000 /
      60 /
      60 /
      24
    ).toFixed(1);
    let totalTimespan = Date.now() - candles[0].openTime; //ms
    let buyPrice = startPrice;
    let bestTotalProfit = 0; //best total profit result of all possible trades processed
    let bestBuyPrice = 0; //best entry point price for trades
    let bestProfit = 0; //best profit expectation per trade
    let bestStopLoss = 0;
    let tradesFound = 0; //trades found on the best profiting data set
    let winningTradesFound = 0;
    let bestTradeFirstOccurence = 0;
    let bestTradeLastOccurrence = 0; //how long ago the last successful trade occurred (ms)
    let avgPrice = 0;
    let buyAnyway = false; //. THIS FEATURE PROBABLY DOESNT WORK TOO GOOD ON REGULAR COINS SO I TURNED IT OFF. ITS LOGIC ONLY MAKES SENSE ON STABLECOINS IM PRETTY SURE
    let buyAnywayPrice = 0.995; //sometimes if a chart has only trended down in the entire timeframe we measured (example: 3 days) it wont find any trades, even though trending down the entire 3 days can often be a good thing, like it was 1.01 3 days ago and just kept falling until it is now 0.992, well clearly 0.992 is a good buy even though it cant find any trades only because in that situation there would be none found that spanned 50% of the total time measured as it requires (tradeSpread)
    let buyAnywaySellPrice = 0;
    let buyAnywayMinProfit = 1.005;
    let buyAnywaySellPriceLastSeenHours = 18; //the maximum hours that the buy anyway sell price must have last occurred
    for (let candle of candles) {
      if (deleted) return;
      candle.open = Number(candle.open); //converting them all to numbers to speed up the backtesting so we dont have to convert it to a number there 10,000+ times
      candle.close = Number(candle.close);
      candle.high = Number(candle.high);
      candle.low = Number(candle.low);
      candle.openTime = Number(candle.openTime);
      avgPrice += candle.open / candles.length;

      buyAnywayPrice = Math.min(
        buyAnywayPrice,
        candle.open * 0.5 + candle.low * 0.5
      );
      if (
        Date.now() - candle.openTime <
        buyAnywaySellPriceLastSeenHours * 60 * 60 * 1000
      ) {
        buyAnywaySellPrice = Math.max(
          buyAnywaySellPrice,
          candle.open * 0.5 + candle.high * 0.5
        );
        if (buyAnywaySellPrice > buyAnywayPrice * 1.01)
          buyAnywaySellPrice = buyAnywayPrice * 1.01; //just to stay sensible
      }
    }
    if (buyAnywaySellPrice / buyAnywayPrice < buyAnywayMinProfit)
      buyAnyway = false;
    let now = Date.now();
    while (buyPrice <= endPrice) {
      if (deleted) return;
      //. we know that if this price hasnt been seen since maxHoursSinceLastProfit then we can skip it altogether to speed up the process because its very slow without it
      let priceRelevent = false;
      for (let candle of candles) {
        if (
          candle.low * lowOpenWeight + candle.open * (1 - lowOpenWeight) <=
          buyPrice
        ) {
          if (
            (now - candle.openTime) / 1000 / 60 / 60 <=
            maxHoursSinceLastProfit
          ) {
            priceRelevent = true;
            break;
          }
        }
      }
      if (!priceRelevent) {
        buyPrice += incrementPrice;
        continue;
      }
      let profit = startProfit;
      while (profit <= endProfit) {
        if (deleted) return;
        let stopLoss = startStopLoss;
        while (stopLoss >= endStopLoss) {
          if (deleted) return;
          dataSets++;
          let sellPrice = buyPrice * profit;
          let totalProfit = 1;
          let firstTradeTime = undefined;
          let lastTradeTime = undefined;
          let trades = 0;
          let winningTrades = 0;
          let status = "buy";
          let stopLossFirstSeen = undefined;
          for (let candle of candles) {
            //. i dont fully trust what im seeing on the highs/lows of the candles so i weighted them with the open
            let buyCompare =
              candle.low * lowOpenWeight + candle.open * (1 - lowOpenWeight); //. we can use candle.open/close/low or whatever weighted combo we want
            let sellCompare =
              candle.high * lowOpenWeight + candle.open * (1 - lowOpenWeight); //. open/close/high or weighted combo
            //try to find a valid buy candle
            if (status == "buy") {
              if (buyCompare <= buyPrice) {
                status = "sell";
              }
            }
            //try to find a valid sell candle
            else {
              let curPrice = candle.open; //the price we want to consider as the basis for whether a stop loss is triggered
              let stopLossAt = buyPrice * stopLoss;
              if (curPrice > stopLossAt) stopLossFirstSeen = undefined; //reset the flag because it was not below the stop loss price for x minutes straight the whole time
              let stopLossTriggered = false;
              //. stop loss
              if (factorStopLoss && curPrice <= stopLossAt) {
                if (!stopLossFirstSeen) stopLossFirstSeen = candle.openTime;
                else if (
                  stopLossFirstSeen &&
                  candle.openTime - stopLossFirstSeen >=
                    stopLossTriggerMinutes * 60 * 1000
                ) {
                  totalProfit *= (stopLossAt * 0.999) / (buyPrice * 1.001);
                  trades++;
                  if (!firstTradeTime) firstTradeTime = candle.openTime;
                  lastTradeTime = candle.openTime;
                  status = "buy";
                  stopLossTriggered = true;
                  stopLossFirstSeen = undefined;
                }
              }
              //. successful trade
              if (sellCompare >= sellPrice && !stopLossTriggered) {
                stopLossFirstSeen = undefined;
                totalProfit *= (sellPrice * 0.999) / (buyPrice * 1.001);
                trades++;
                winningTrades++;
                if (!firstTradeTime) firstTradeTime = candle.openTime;
                lastTradeTime = candle.openTime;
                status = "buy";
              }
            }
          }
          if (
            totalProfit > bestTotalProfit &&
            winningTrades >= minTrades &&
            (now - lastTradeTime) / 1000 / 60 / 60 < maxHoursSinceLastProfit &&
            lastTradeTime - firstTradeTime >= totalTimespan * tradeSpread
          ) {
            bestTotalProfit = totalProfit;
            bestBuyPrice = buyPrice;
            bestProfit = profit;
            bestStopLoss = stopLoss;
            tradesFound = trades;
            winningTradesFound = winningTrades;
            bestTradeFirstOccurence = firstTradeTime;
            bestTradeLastOccurrence = lastTradeTime;
          }
          //. if this is the same trade we have already identified as the best trade then let the stop loss amount keep rolling as low as itll go as long as it doesnt change the profit expectation. im not sure we should be doing this though? i think it is because if it determines the best stop loss was like 1.5%, thats just too easily triggered, past values arent that reliable that we can ensure it wont be...even though we did add it so it has to be below the stop loss price for 30 straight minutes before it triggers the stop loss, which is good, but i dont think a stop loss should ever be under 5% but im not sure if me or the bot knows better.
          if (
            Math.abs(totalProfit - bestTotalProfit) < 0.000001 &&
            winningTrades == winningTradesFound
          ) {
            bestStopLoss = stopLoss;
          }
          stopLoss += incrementStopLoss;
        }
        profit += incrementProfit;
      }
      buyPrice += incrementPrice;
    }
    if (!factorStopLoss) bestStopLoss = endStopLoss; //. if this line isnt here and factorStopLoss is false then the backtesting will claim the 'best' stop loss is the minimum stop loss which could be like 0.10% or 1.00% whatever we have it set at, because it didnt calculate it, and it is clearly wrong so we do this instead
    bestBuyPrice = Number(bestBuyPrice.toFixed(priceDecimals));
    if (tradesFound > 0 && bestTotalProfit < minProjectedProfit) {
      if (!silent)
        customLog(
          `${pair}. total backtested profit did not meet minimum profit requirements`
        );
    } else if (tradesFound == 0 || bestBuyPrice == 0) {
      if (buyAnyway) {
        if (!silent)
          customLog(
            `${pair}. no consistent trading opportunities found, placing order anyway at extra low price of $${buyAnywayPrice.toFixed(
              priceDecimals
            )}, with a sell price of $${buyAnywaySellPrice.toFixed(
              priceDecimals
            )}, a sell price which has been seen in the last ${buyAnywaySellPriceLastSeenHours} hours`
              .rainbow
          );
      } else {
        if (!silent)
          customLog(
            `${pair}. no trades found in past ${days} days with given parameters`
          );
      }
    } else {
      let profitDisplay = ((bestProfit - 1) * 100).toFixed(2);
      let totalProfitDisplay = ((bestTotalProfit - 1) * 100).toFixed(2);
      let stopLossDisplay = (1 - bestStopLoss) * 100;
      if (!silent)
        customLog(
          `${pair}. best buy price: $${bestBuyPrice}. current price: ${
            candles[candles.length - 1].open
          }. best profit expectation: ${profitDisplay}% per trade. best stop loss: ${stopLossDisplay.toFixed(
            2
          )}%. backtested profit from these settings: ${totalProfitDisplay}% with ${tradesFound} (${winningTradesFound} winning) trades over ${days} days. average ${days} days price: $${avgPrice.toFixed(
            priceDecimals
          )}. combinations backtested: ${dataSets}. all trades occurred in a ${(
            (bestTradeLastOccurrence - bestTradeFirstOccurence) /
            1000 /
            60 /
            60
          ).toFixed(
            0
          )} hour window. last profitable trade with these settings was ${(
            (Date.now() - bestTradeLastOccurrence) /
            1000 /
            60 /
            60
          ).toFixed(1)} hours ago`
        );
    }
    if (
      buyAnyway == false &&
      (tradesFound == 0 ||
        bestBuyPrice == 0 ||
        bestTotalProfit <= 1 ||
        bestTotalProfit < minProjectedProfit)
    ) {
      SetTradeable(pair, false);
    } else {
      if (tradesFound == 0 && buyAnyway) {
        bestBuyPrice = buyAnywayPrice;
        bestProfit = buyAnywaySellPrice / buyAnywayPrice;
      }
      let deferredParamData = {
        pair: pair,
        _pair: _pair,
        bestBuyPrice: bestBuyPrice,
        bestProfit: bestProfit,
        bestStopLoss: bestStopLoss,
        bestTotalProfit: bestTotalProfit
      };
      deferredTradeParamsToUpdate.push(deferredParamData);
    }
  }
  let USDTFunds = await GetFundsOf("USDT"); // erase this when we dont use it anymore for whatever we are doing
  tradeParams = [];
  dontTradePairs = [];
  //the point of deferring them is so we update them all at the same time because doing it in each coin's own loop was causing timing problems
  for (let deferredParam of deferredTradeParamsToUpdate) {
    SetTradeable(deferredParam.pair, true);
    UpdateTradeParams(
      deferredParam.pair,
      deferredParam.bestBuyPrice,
      deferredParam.bestProfit,
      deferredParam.bestStopLoss,
      deferredParam.bestTotalProfit
    );
  }
  SortTradeParamsByBestProfit();
  let pairsFoundText = ``;
  for (let o of tradeParams) {
    pairsFoundText += `${o.pair} (+${((o.bestTotalProfit - 1) * 100).toFixed(
      2
    )}%), `;
  }
  customLog(
    `Backtesting complete. ${GetDate()}. ${
      tradeParams.length
    } tradeable pairs found: ${pairsFoundText}`
  );
  ExcludePairsWithActiveOrders(); // we dismiss pairs that have active orders because we are backtesting here to create a list of currently tradeable pairs, and if we allow pairs that are busy with active order to be included then it messes up our code which chooses only the top x 'best' pairs to trade because itll include pairs that are not currently tradeable because theyre busy already trading from before.

  //. this is a new thing im trying
  let dynamicTopX = USDTFunds / baseQuantity;
  tradeTopXOnly = roundTo(dynamicTopX, 1);
  customLog(`Enough funds to buy ${tradeTopXOnly} pairs...`);

  ExcludeNonTopPairs();
  // customLog(`tradeParams`)
  // customLog(tradeParams)
  // customLog('dontTradePairs:')
  // customLog(dontTradePairs)
  MLinProgress = false;
  backtestCount++;
  await sleep(500);
}

function SetTradeable(pair, tradeable) {
  let _pair = pair.replace("_", "");
  if (tradeable == false) {
    if (!dontTradePairs.includes(_pair)) dontTradePairs.push(_pair);
  } else {
    dontTradePairs.remove(_pair);
  }
}

function IsTradeable(pair) {
  let _pair = pair.replace("_", "");
  if (dontTradePairs.includes(_pair)) return false;
  return true;
}

function TradeParamsContains(pair) {
  let _pair = pair.replace("_", "");
  for (let o of tradeParams) {
    if (o.pair == _pair) return true;
  }
  return false;
}

function ExcludePairsWithActiveOrders() {
  let somePairs = [];
  for (let i in tradeParams) {
    let o = tradeParams[i];
    if (activeOrders.includes(o.pair)) {
      SetTradeable(o.pair, false);
      somePairs.push(o);
    }
  }
  for (let o2 of somePairs) {
    tradeParams.remove(o2);
  }
}

function ExcludeNonTopPairs() {
  //if(backtestCount == 0) tradeTopXOnly = 14 //! DEBUG
  let somePairs = [];
  for (let i in tradeParams) {
    if (i > tradeTopXOnly - 1) {
      let o = tradeParams[i];
      SetTradeable(o.pair, false);
      somePairs.push(o);
    }
  }
  for (let o2 of somePairs) {
    tradeParams.remove(o2);
  }
  //tradeTopXOnly = 1 //! DEBUG
}

function UpdateTradeParams(
  pair,
  buyPrice,
  bestProfit,
  bestStopLoss,
  bestTotalProfit
) {
  let _pair = pair.replace("_", "");
  let found = false;
  for (let o of tradeParams) {
    if (o.pair == _pair) {
      o.buyPrice = buyPrice;
      o.bestProfit = bestProfit;
      o.bestStopLoss = bestStopLoss;
      o.bestTotalProfit = bestTotalProfit;
      found = true;
      break;
    }
  }
  if (!found) {
    tradeParams.push({
      pair: _pair,
      buyPrice: buyPrice,
      bestProfit: bestProfit,
      bestStopLoss: bestStopLoss,
      bestTotalProfit: bestTotalProfit
    });
  }
}

//If the result is negative a is sorted before b.
//If the result is positive b is sorted before a.
function SortTradeParamsByBestProfit() {
  tradeParams.sort(function(a, b) {
    if (a.bestTotalProfit > b.bestTotalProfit) return -1;
    if (b.bestTotalProfit < b.bestTotalProfit) return 1;
    return 0;
  });
}

async function TryBacktesting(skipDelayCheck) {
  if (deleted) return;
  if (!skipDelayCheck && Date.now() - lastML < 15 * 60 * 1000) return; //. but still dont do it if it was less than x minutes ago to prevent startup spam
  let silent = false;
  if (Date.now() - lastNonSilentML < 12 * 60 * 60 * 1000) silent = true;
  await Backtesting(silent);
}

// async function DailyStats(pair, debug) {
//     let _pair = pair.replace('_', '')
//     while (true) {
//         let dailyStats = await client.dailyStats({
//             symbol: _pair,
//         })
//             .catch(reason => customLog(`${pair} DailyStats: ${reason}`))
//         if (debug) customLog(dailyStats)
//         if (dailyStats && dailyStats.quoteVolume) return dailyStats
//         await sleep(10000)
//     }
// }

async function DailyStats(pair) {
  if (deleted) return;
  let _pair = pair ? pair.replace("_", "") : undefined;
  while (true) {
    if (deleted) return;
    let dailyStats;
    client
      .dailyStats({
        symbol: _pair
      })
      .then(result => {
        dailyStats = result;
      })
      .catch(reason => customLog(`${pair} DailyStats: ${reason}`));
    for (let i = 0; i < 100; i++) {
      await sleep(100);
      if (dailyStats && dailyStats.quoteVolume) return dailyStats;
    }
  }
}

async function CancelOrder(object) {
  if (deleted) return;
  while (true) {
    if (deleted) return;
    let cancel = await client
      .cancelOrder(object)
      .catch(reason => customLog(`CancelOrder: ${reason}`));
    if (cancel) return cancel;
  }
}

async function Order(pair, quantity, price, side, maxTries) {
  if (deleted) return;
  if (maxTries === undefined) maxTries = 999; //was 15 but i upped it because our internet is cutting out right now due to rain
  let _pair = pair.replace("_", "");
  let hasFunds = true;
  quantity = QuantityDecimals(pair, quantity);
  price = PriceDecimals(pair, price);
  let tries = 0;
  while (true) {
    if (deleted) return;
    let order = await client
      .order({
        symbol: _pair,
        side: side,
        quantity: quantity,
        price: price,
        recvWindow: 59999
      })
      .catch(reason => {
        if (tries > 0) return;
        customLog(
          `${pair} Order: ${reason}. quantity: ${quantity}. price: ${price}. side: ${side}`
            .red
        );
        switch (reason.code) {
          case -2010:
            //customLog(`${pair}: insufficient funds`)
            hasFunds = false;
            break;
          case -1100:
            //customLog(`${pair}: price: ${price}`)
            break;
          case -1013:
            //customLog(`${pair}: quantity: ${quantity}. price: ${price}`)
            break;
        }
      });
    //. give it a few good tries before letting an error stop it
    if (tries > maxTries) {
      if (!hasFunds) {
        customLog(`${pair} ${side} MAX TRIES EXCEEDED`);
        return errors.insufficientFunds;
      }
    }
    //. if its on the buy side and has insufficient funds just do it once to avoid spam because it seems correct the first time
    if (!hasFunds && side == "BUY") {
      return errors.insufficientFunds;
    }
    if (order && order.orderId) return order;
    await sleep(5000);
    tries++;
  }
}

async function GetFundsOf(pair1) {
  if (deleted) return;
  let accountInfo;
  while (true) {
    if (deleted) return;
    accountInfo = await client
      .accountInfo({
        recvWindow: 59999
      })
      .catch(reason => customLog(`${reason}`));
    if (accountInfo) {
      break;
    } else {
      customLog(`Account info not found. Retrying.`);
      await sleep(500);
    }
  }
  for (let o of accountInfo.balances) {
    if (o.asset == pair1) {
      return o.free;
    }
  }
}

function SetHasActiveOrders(pair, status) {
  if (deleted) return;
  let _pair = pair.replace("_", "");
  if (status == false) {
    activeOrders.remove(_pair);
  } else {
    if (!activeOrders.includes(_pair)) {
      activeOrders.push(_pair);
    }
  }
}

async function TradeLoop(pair) {
  if (deleted) return;
  //customLog(`Trade Loop started on ${pair}`)
  let _pair = pair.replace("_", "");
  let pair1 = pair.split("_")[0];
  let pair2 = pair.split("_")[1];
  let buyPrice = 0;
  let sellPrice = 0;
  let profitExpectation = 1;
  let stopLoss = 0;
  let _baseQuantity = baseQuantity;
  let priceDecimals = GetPriceDecimals(pair);
  start: while (true) {
    if (deleted) return;
    SetHasActiveOrders(pair, false);
    await sleep(5000);
    await TryBacktesting();
    //this just means Backtesting decided not to trade this pair at this time
    while (!IsTradeable(pair) || !TradeParamsContains(pair)) {
      if (deleted) return;
      await sleep(500);
    }
    let dailyStats = await DailyStats(pair);
    //* if (dailyStats.lastPrice) customLog(`${pair}: 24hr low: ${dailyStats.lowPrice}. 24hr high: ${dailyStats.highPrice}. diff: ${(dailyStats.highPrice - dailyStats.lowPrice).toFixed(priceDecimals)}, ${(((dailyStats.highPrice / dailyStats.lowPrice) - 1) * 100).toFixed(2)}%. avgPrice: ${dailyStats.weightedAvgPrice}. lastPrice: ${dailyStats.lastPrice}`)
    for (let param of tradeParams) {
      if (param.pair == _pair) {
        buyPrice = Number(param.buyPrice).toFixed(priceDecimals);
        //sellPrice = Number(buyPrice * param.bestProfit).toFixed(priceDecimals)
        profitExpectation = param.bestProfit;
        stopLoss = param.bestStopLoss;
        //stopLoss = 1.01 //! IMPORTANT: this is for something im testing. make sure to set this and stopLossHours back to normal and uncomment the line above this amd erase this line
        break;
      }
    }
    let quantity = Number(_baseQuantity / dailyStats.lastPrice);
    quantity = QuantityDecimals(pair, quantity);

    //* place our order
    let buyOrder = await Order(_pair, quantity, buyPrice, "BUY");
    if (!buyOrder) {
      customLog(`${pair} buy order failed for unknown reason`);
      await sleep(10 * 60 * 1000);
      continue start;
    }
    if (buyOrder == errors.insufficientFunds) {
      let hours = 1;
      customLog(`-trying again in ${hours} hours`);
      await sleep(hours * 60 * 60 * 1000);
      continue start;
    }
    customLog(`${pair} buy order placed @ $${buyPrice}. date: ${GetDate()}`);
    SetHasActiveOrders(pair, true);

    //* wait for it to be filled
    let checkBuyOrder;
    while (true) {
      if (deleted) return;
      await sleep(5000);
      checkBuyOrder = await client
        .getOrder({
          symbol: _pair,
          orderId: buyOrder.orderId,
          recvWindow: 59999
        })
        .catch(reason => {
          //customLog(`${reason}`)
        });
      if (checkBuyOrder) {
        if (checkBuyOrder.status === "FILLED") break;
        else {
          let timeLimit = buyExpireHours * 60 * 60 * 1000;
          if (Date.now() - checkBuyOrder.time > timeLimit) {
            let cancelOrder;
            while (true) {
              if (deleted) return;
              cancelOrder = await client
                .cancelOrder({
                  symbol: _pair,
                  orderId: buyOrder.orderId,
                  recvWindow: 59999
                })
                .catch(reason => {
                  //customLog(`${reason}`)
                });
              if (cancelOrder && cancelOrder.orderId) {
                customLog(`${pair} buy order expired. date: ${GetDate()}`);
                await sleep(5000);
                continue start; //go to the beginning and try the whole process over again
              }
              await sleep(5000);
            }
          }
        }
      }
    }

    //* get the actual executed buy price because the one returned above by getOrder is not the executed price but just the price we told it to buy at
    let buyResults;
    while (true) {
      if (deleted) return;
      await sleep(5000);
      //. trades will be an array filled with objects representing each trade
      let trades = await client
        .myTrades({
          symbol: _pair,
          limit: 30,
          recvWindow: 59999
        })
        .catch(reason => {
          customLog(`${reason}`);
        });
      if (trades) {
        for (let i in trades) {
          let tradeData = trades[i];
          if (tradeData.orderId == buyOrder.orderId) {
            buyResults = tradeData;
            break;
          }
        }
      }
      if (buyResults) break;
      else customLog(`${pair} buy results not found. retrying...`);
    }

    await sleep(40000); //. binance sometimes takes extra long to update your buying power after the buy fills

    //* once filled, try to sell it for more
    let maxTries = 99999999;
    sellPrice = Number(buyResults.price * profitExpectation).toFixed(
      priceDecimals
    );
    //sellPrice = Number(buyResults.price * 0.99).toFixed(priceDecimals) //! DEBUG
    let sellQuantity = await GetFundsOf(pair1);
    let sellOrder = await Order(
      _pair,
      sellQuantity,
      sellPrice,
      "SELL",
      maxTries
    );
    let stopLossDisplay = (1 - stopLoss) * 100;
    customLog(
      `${pair} buy order filled. price: ${
        buyResults.price
      }. sell order placed at $${sellPrice}. ${(
        (sellPrice / buyResults.price - 1) *
        100
      ).toFixed(3)}% difference. stop loss ${stopLossDisplay.toFixed(
        2
      )}%. quantity: ${sellQuantity}. date: ${GetDate()}`
    );

    //* wait for it to be filled
    let stopLossFirstObserved = 0;
    let checkSellOrder;
    while (true) {
      if (deleted) return;
      await sleep(20000 + Math.random() * 20000);
      dailyStats = await DailyStats(pair);
      checkSellOrder = undefined; // clear the old one
      checkSellOrder = await client
        .getOrder({
          symbol: _pair,
          orderId: sellOrder.orderId,
          recvWindow: 59999
        })
        .catch(reason => {
          customLog(`${pair} WaitFill: ${reason}`);
          if (checkSellOrder) customLog(`orderId: ${checkSellOrder.orderId}`);
        });
      if (checkSellOrder && checkSellOrder.status === "FILLED") break;

      //. stop loss triggered
      if (dailyStats && checkSellOrder) {
        if (dailyStats.lastPrice <= buyResults.price * stopLoss) {
          if (!stopLossFirstObserved) stopLossFirstObserved = Date.now();
          if (
            stopLossFirstObserved &&
            Date.now() - stopLossFirstObserved >=
              stopLossTriggerMinutes * 60 * 1000
          ) {
            let stopLossCandles = await GetCandles(_pair, "5m");
            let StopLossRecoveryMet = function() {
              //. it checks to see if it thinks the 'recovery' has reached its peak and is losing steam, if so, we can allow the stop loss to sell at this 'recovered' price if its even still below our stop loss % at this point. its possible it could recover so much that it actually turns into a profit. or for all i know it could result in worse losses but my theory is that it will be better
              if (
                CandleAverage(stopLossCandles, 12 / 24) >=
                  CandleAverage(stopLossCandles, 36 / 24) &&
                CandleAverage(stopLossCandles, 3 / 24) <=
                  CandleAverage(stopLossCandles, 12 / 24)
              ) {
                return true;
              }
            };
            if (!requireRecoveryForStopLoss || StopLossRecoveryMet()) {
              let cancel = await CancelOrder({
                symbol: _pair,
                orderId: sellOrder.orderId,
                recvWindow: 59999
              });
              if (cancel) {
                customLog(`${pair} STOP LOSS TRIGGERED. SELLING.`);
                quantity =
                  Number(checkSellOrder.origQty) -
                  Number(checkSellOrder.executedQty);
                sellOrder = await Order(
                  _pair,
                  sellQuantity,
                  dailyStats.lastPrice * 0.95,
                  "SELL"
                );
                totalLosingTrades++;
              }
            }
          }
        } else {
          stopLossFirstObserved = 0;
        }
      }
    }
    await sleep(5000);
    //customLog(`${pair}: DEBUG 1`) //! DEBUG

    //* get the actual executed sell price because the one returned above by getOrder is not the executed price but just the price we told it to sell at
    let sellResults;
    while (true) {
      if (deleted) return;
      await sleep(15000);
      //. trades will be an array filled with objects representing each trade
      let trades = await client
        .myTrades({
          symbol: _pair,
          limit: 30,
          recvWindow: 59999
        })
        .catch(reason => {
          customLog(`${reason}`);
        });
      if (trades) {
        for (let i in trades) {
          let tradeData = trades[i];
          if (tradeData.orderId == sellOrder.orderId) {
            sellResults = tradeData;
            break;
          }
        }
      }
      if (sellResults) break;
      else customLog(`${pair} sell results not found. retrying...`);
    }
    let profit = (sellResults.price * 0.999) / (buyResults.price * 1.001);
    totalFilledSells++;
    customLog(
      `${pair} sell order filled. price: ${
        sellResults.price
      }. date: ${GetDate()}. profit: ${((profit - 1) * 100).toFixed(
        3
      )}%. quantity: ${quantity}. total trades this session on all pairs: ${totalFilledSells} (${totalFilledSells -
        totalLosingTrades} winning, ${totalLosingTrades} losing)`
    );
    AppendHistory(
      pair,
      Date.now(),
      buyResults.price,
      sellResults.price,
      quantity
    );
    SaveHistory(pair);
    DisplayAverageProfit(pair, 1);
    DisplayAverageProfit(pair, 3);
    DisplayAverageProfit(pair, 7);
    DisplayAverageProfit(pair, 14);
    DisplayAverageProfit(pair, 30);
    SetHasActiveOrders(pair, false);
    profitThisSession += (profit - 1) * 100;
    customLog(`Total profit this session: ${profitThisSession.toFixed(2)}%`);
    if (quantityGrows) _baseQuantity = Number(_baseQuantity * profit); //. only 2 decimals is allowed. the bot will take advantage of compounding by increasing the trade quantity proportionately to the amount of profit
    if (_baseQuantity > maxQuantity) _baseQuantity = maxQuantity;
    if (_baseQuantity < baseQuantity) _baseQuantity = baseQuantity;
    await sleep(15000);
  }
}

let profitThisSession = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GetDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = new Date();
  let mins =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getHours()}:${mins}`;
}

//. this can handle any number of arguments and removes them all
Array.prototype.remove = function() {
  let what,
    a = arguments,
    l = a.length,
    ax;
  while (l && this.length) {
    what = a[--l];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
