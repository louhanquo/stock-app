"use server";
import { db } from "@/lib/db";

export const getCompanyOverviewById = async (symbol: string) => {
  try {
    const companyOverView = await db.companyData.findUnique({
      where: { symbol },
    });

    if (!companyOverView) {
      console.warn(`No company found with id: ${symbol}`);
      return null;
    }

    return companyOverView;
  } catch (error) {
    console.error("Error fetching company overview:", error);
    return null;
  }
};
