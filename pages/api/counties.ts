import type { NextApiRequest, NextApiResponse } from "next";
import { NcdcNoaaApi, LocationData } from "../../lib/types";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LocationData[]>
) {
  const token = process.env.NCDC_NOAA_TOKEN as string;
  const init: RequestInit = {
    method: "GET",
    headers: {
      token,
    },
  };

  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const startDate = new Date(
    today.getFullYear() - 10,
    today.getMonth(),
    today.getDay()
  )
    .toISOString()
    .split("T")[0];

  const baseUrl = `https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=CNTY&datasetid=GSOM&datacategoryid=TEMP&startdate=${startDate}&enddate=${endDate}`;

  const response = await fetch(`${baseUrl}&limit=1`, init);

  const data = (await response.json()) as NcdcNoaaApi<LocationData>;

  const count = data.metadata.resultset.count;
  const limit = 1000;
  const pageCount = Math.ceil(count / limit);

  const urls: string[] = [];

  for (let page = 1; page <= pageCount; page++) {
    urls.push(`${baseUrl}&offset=${(page - 1) * limit}&limit=${limit}`);
  }
  const requests = urls.map((url) => fetch(url, init));
  const responses = await Promise.all(requests);
  const json = responses.map((response) => response.json());
  const allData = (await Promise.all(json)) as NcdcNoaaApi<LocationData>[];

  const locations = allData.reduce<LocationData[]>((pv, cv) => {
    return cv.results.length > 0 ? [...pv, ...cv.results] : pv;
  }, []);

  res.status(200).json(locations);
}
