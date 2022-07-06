import type { NextApiRequest, NextApiResponse } from "next";
import { NcdcNoaaApi, LocationData } from "../../lib/types";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<NcdcNoaaApi<LocationData>>
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
