// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NcdcNoaaApi, StatesData } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NcdcNoaaApi<StatesData>>
) {
  const token = process.env.NCDC_NOAA_TOKEN as string;
  const response = await fetch(
    "https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52",
    {
      method: "GET",
      headers: {
        token,
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
