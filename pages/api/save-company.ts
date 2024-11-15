// pages/api/save-company.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { saveCompanyData } from "../../lib/saveToDatabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (typeof symbol !== "string") {
    return res.status(400).json({ message: "Symbol parameter is required" });
  }

  const company = await saveCompanyData(symbol);

  if (company) {
    res.status(200).json({ message: "Company data saved successfully", company });
  } else {
    res.status(500).json({ message: "Failed to save company data" });
  }
}
