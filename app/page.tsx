"use client";

import { useState } from "react";
import { getCompanyOverviewById } from "@/data/company-overview"; // Adjust the import path as needed
import type { NextPage } from "next";

// Define the CompanyData interface (as provided before)
interface CompanyData {
  id: string;
  symbol: string;
  assetType: string;
  name: string;
  description: string;
  cik: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  address: string;
  officialSite?: string | null;
  fiscalYearEnd: string;
  latestQuarter: Date;
  marketCapitalization?: string | null;
  ebitda?: string | null;
  peRatio?: number | null;
  pegRatio?: number | null;
  bookValue?: number | null;
  dividendPerShare?: number | null;
  dividendYield?: number | null;
  eps?: number | null;
  revenuePerShareTTM?: number | null;
  profitMargin?: number | null;
  operatingMarginTTM?: number | null;
  returnOnAssetsTTM?: number | null;
  returnOnEquityTTM?: number | null;
  revenueTTM?: string | null;
  grossProfitTTM?: string | null;
  dilutedEPSTTM?: number | null;
  quarterlyEarningsGrowthYOY?: number | null;
  quarterlyRevenueGrowthYOY?: number | null;
  analystTargetPrice?: number | null;
  analystRatingStrongBuy?: number | null;
  analystRatingBuy?: number | null;
  analystRatingHold?: number | null;
  analystRatingSell?: number | null;
  analystRatingStrongSell?: number | null;
  trailingPE?: number | null;
  forwardPE?: number | null;
  priceToSalesRatioTTM?: number | null;
  priceToBookRatio?: number | null;
  evToRevenue?: number | null;
  evToEbitda?: number | null;
  beta?: number | null;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
  fiftyDayMovingAverage?: number | null;
  twoHundredDayMovingAverage?: number | null;
  sharesOutstanding?: string | null;
  dividendDate?: Date | null;
  exDividendDate?: Date | null;
}



const CompanyDataPage: NextPage = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>(""); // State to track input

  const fetchData = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCompanyOverviewById(id);
      console.log("Fetched data:", data); // Log the fetched data
      if (!data) {
        console.warn("No data received from API");
        setError("No data found");
      } else {
        setCompanyData(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchData(searchId);
    } else {
      setError("Please enter a valid company ID");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Company ID..."
          className="border rounded p-2 mr-2 w-full md:w-64"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <div className="p-4 text-center">Loading...</div>}

      {/* Error State */}
      {error && <div className="p-4 text-red-500">{error}</div>}

      {/* Data Display */}
      {companyData && (
        <div className="bg-white shadow-md rounded p-6">
          <h1 className="text-3xl font-bold mb-6">{companyData.name ?? "N/A"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Symbol:</strong> {companyData.symbol ?? "N/A"}</p>
              <p><strong>Asset Type:</strong> {companyData.assetType ?? "N/A"}</p>
              <p><strong>Description:</strong> {companyData.description ?? "N/A"}</p>
              <p><strong>CIK:</strong> {companyData.cik ?? "N/A"}</p>
              <p><strong>Exchange:</strong> {companyData.exchange ?? "N/A"}</p>
              <p><strong>Currency:</strong> {companyData.currency ?? "N/A"}</p>
              <p><strong>Country:</strong> {companyData.country ?? "N/A"}</p>
              <p><strong>Sector:</strong> {companyData.sector ?? "N/A"}</p>
              <p><strong>Industry:</strong> {companyData.industry ?? "N/A"}</p>
              <p><strong>Address:</strong> {companyData.address ?? "N/A"}</p>
              <p><strong>Official Site:</strong> {companyData.officialSite ?? "N/A"}</p>
            </div>

            <div>
              <p><strong>Fiscal Year End:</strong> {companyData.fiscalYearEnd ?? "N/A"}</p>
              <p><strong>Market Capitalization:</strong> {companyData.marketCapitalization ?? "N/A"}</p>
              <p><strong>EBITDA:</strong> {companyData.ebitda ?? "N/A"}</p>
              <p><strong>P/E Ratio:</strong> {companyData.peRatio ?? "N/A"}</p>
              <p><strong>PEG Ratio:</strong> {companyData.pegRatio ?? "N/A"}</p>
              <p><strong>Book Value:</strong> {companyData.bookValue ?? "N/A"}</p>
              <p><strong>Dividend Per Share:</strong> {companyData.dividendPerShare ?? "N/A"}</p>
              <p><strong>Dividend Yield:</strong> {companyData.dividendYield ?? "N/A"}</p>
              <p><strong>EPS:</strong> {companyData.eps ?? "N/A"}</p>
              <p><strong>Revenue Per Share (TTM):</strong> {companyData.revenuePerShareTTM ?? "N/A"}</p>
            </div>

            {/* Additional fields as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDataPage;



