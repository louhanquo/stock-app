// this function saves the data in the database 
import { db } from "./db";

//function that gets the company data
import { fetchCompanyOverview } from "./fetchAlphaVantage";


//function accepts a symbol as a unique identifier of the data we want to save due to alpha vantage cannot bulk api call
export async function saveCompanyData(symbol: string) {
  const companyData = await fetchCompanyOverview(symbol);

  if (!companyData) {
    console.error("No data to save");
    return null;
  }

  try {

    //using prisma function to create if there is no copy of the companyData, if there is a copy of the company data in the database, the data is updated
    const savedCompany = await db.companyData.upsert({
      where: { symbol: companyData.symbol },
      create: companyData,
      update: companyData,
    });

    console.log("Company data saved:", savedCompany);
    return savedCompany;
  } catch (error) {
    return null;
  } 
}
