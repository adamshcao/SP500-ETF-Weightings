// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

//https://site.financialmodelingprep.com/developer
let api = 'PASTE API KEY HERE'

const etffmp = async (req: NextApiRequest,res: NextApiResponse) => {
  const fetchit = await fetch('https://financialmodelingprep.com/api/v3/etf-sector-weightings/SPY?apikey=' + api);
  const data = await fetchit.json();
  res.status(200).json(data)
};

export default etffmp;