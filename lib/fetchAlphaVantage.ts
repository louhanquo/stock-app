//function gets the data from the database using URL
//url is obtained through axios endpoints


import axios from "axios";

export async function fetchCompanyOverview(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    //console.log the data to test if the api call is correct
    console.log(data)

    //return function of the data obtained from the api call (some data are in a form of bigInt, because of translating data problems it is saved as a string)
    return {
      symbol: data.Symbol as string,
      assetType: data.AssetType as string,
      name: data.Name as string,
      description: data.Description as string,
      cik: data.CIK as string,
      exchange: data.Exchange as string,
      currency: data.Currency as string,
      country: data.Country as string,
      sector: data.Sector as string,
      industry: data.Industry as string,
      address: data.Address as string,
      officialSite: data.website as string,
      fiscalYearEnd: data.FiscalYearEnd as string,
      latestQuarter: new Date(data.LatestQuarter),
      marketCapitalization: data.MarketCapitalization !== "None" ? BigInt(data.MarketCapitalization).toString() : null,
      ebitda: data.EBITDA !== "None" ? BigInt(data.EBITDA).toString() : null,
      revenueTTM: data.RevenueTTM !== "None" ? BigInt(data.RevenueTTM).toString() : null,
      grossProfitTTM: data.GrossProfitTTM !== "None" ? BigInt(data.GrossProfitTTM).toString() : null,
      sharesOutstanding: data.SharesOutstanding !== "None" ? BigInt(data.SharesOutstanding).toString() : null,
      peRatio: data.PERatio !== "None" ? parseFloat(data.PERatio) : null,
      pegRatio: data.PEGRatio !== "None" ? parseFloat(data.PEGRatio) : null,
      bookValue: data.BookValue !== "None" ? parseFloat(data.BookValue) : null,
      dividendPerShare: data.DividendPerShare !== "None" ? parseFloat(data.DividendPerShare) : null,
      dividendYield: data.DividendYield !== "None" ? parseFloat(data.DividendYield) : null,
      eps: data.EPS !== "None" ? parseFloat(data.EPS) : null,
      revenuePerShareTTM: data.RevenuePerShareTTM !== "None" ? parseFloat(data.RevenuePerShareTTM) : null,
      profitMargin: data.ProfitMargin !== "None" ? parseFloat(data.ProfitMargin) : null,
      operatingMarginTTM: data.OperatingMarginTTM !== "None" ? parseFloat(data.OperatingMarginTTM) : null,
      returnOnAssetsTTM: data.ReturnOnAssetsTTM !== "None" ? parseFloat(data.ReturnOnAssetsTTM) : null,
      returnOnEquityTTM: data.ReturnOnEquityTTM !== "None" ? parseFloat(data.ReturnOnEquityTTM) : null,
      dilutedEPSTTM: data.DilutedEPSTTM !== "None" ? parseFloat(data.DilutedEPSTTM) : null,
      quarterlyEarningsGrowthYOY: data.QuarterlyEarningsGrowthYOY !== "None" ? parseFloat(data.QuarterlyEarningsGrowthYOY) : null,
      quarterlyRevenueGrowthYOY: data.QuarterlyRevenueGrowthYOY !== "None" ? parseFloat(data.QuarterlyRevenueGrowthYOY) : null,
      analystTargetPrice: data.AnalystTargetPrice !== "None" ? parseFloat(data.AnalystTargetPrice) : null,
      analystRatingStrongBuy: data.AnalystRatingStrongBuy !== "None" ? parseInt(data.AnalystRatingStrongBuy) : null,
      analystRatingBuy: data.AnalystRatingBuy !== "None" ? parseInt(data.AnalystRatingBuy) : null,
      analystRatingHold: data.AnalystRatingHold !== "None" ? parseInt(data.AnalystRatingHold) : null,
      analystRatingSell: data.AnalystRatingSell !== "None" ? parseInt(data.AnalystRatingSell) : null,
      analystRatingStrongSell: data.AnalystRatingStrongSell !== "None" ? parseInt(data.AnalystRatingStrongSell) : null,
      trailingPE: data.TrailingPE !== "None" ? parseFloat(data.TrailingPE) : null,
      forwardPE: data.ForwardPE !== "None" ? parseFloat(data.ForwardPE) : null,
      priceToSalesRatioTTM: data.PriceToSalesRatioTTM !== "None" ? parseFloat(data.PriceToSalesRatioTTM) : null,
      priceToBookRatio: data.PriceToBookRatio !== "None" ? parseFloat(data.PriceToBookRatio) : null,
      evToRevenue: data.EVToRevenue !== "None" ? parseFloat(data.EVToRevenue) : null,
      evToEbitda: data.EVToEBITDA !== "None" ? parseFloat(data.EVToEBITDA) : null,
      beta: data.Beta !== "None" ? parseFloat(data.Beta) : null,
      fiftyTwoWeekHigh: data["52WeekHigh"] !== "None" ? parseFloat(data["52WeekHigh"]) : null,
      fiftyTwoWeekLow: data["52WeekLow"] !== "None" ? parseFloat(data["52WeekLow"]) : null,
      fiftyDayMovingAverage: data["50DayMovingAverage"] !== "None" ? parseFloat(data["50DayMovingAverage"]) : null,
      twoHundredDayMovingAverage: data["200DayMovingAverage"] !== "None" ? parseFloat(data["200DayMovingAverage"]) : null,
      dividendDate: data.DividendDate !== "None" ? new Date(data.DividendDate) : null,
      exDividendDate: data.ExDividendDate !== "None" ? new Date(data.ExDividendDate) : null,
    };    
  } catch (error) {
    console.error("Error fetching company overview:", error);
    return null;
  }
}
