import type { NextApiRequest, NextApiResponse } from "next";
import { NcdcNoaaApi, StationData } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StationData[]>
) {
  console.log("req.query:", req.query);
  const countyId = req.query.id;
  const token = process.env.NCDC_NOAA_TOKEN as string;
  const headers = new Headers({ token });
  const init: RequestInit = {
    method: "GET",
    headers,
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

  const baseUrl = `https://www.ncei.noaa.gov/cdo-web/api/v2/stations?locationid=${countyId}&datasetid=GSOM&datacategoryid=TEMP&startdate=${startDate}&enddate=${endDate}`;

  const response = await fetch(`${baseUrl}&limit=1`, init);

  const data = (await response.json()) as NcdcNoaaApi<StationData>;

  const count = data?.metadata?.resultset?.count ?? 0;
  if (count === 0) return res.status(200).json([]);

  const limit = 100;
  const pageCount = Math.ceil(count / limit);
  const urls: string[] = [];

  for (let page = 1; page <= pageCount; page++) {
    urls.push(`${baseUrl}&offset=${(page - 1) * limit}&limit=${limit}`);
  }

  const requests = urls.map((url) => fetch(url, init));
  const responses = await Promise.all(requests);
  const json = responses.map((response) => response.json());
  const allData = (await Promise.all(json)) as NcdcNoaaApi<StationData>[];

  const locations = allData.reduce<StationData[]>((pv, cv) => {
    return Boolean(cv?.results?.length) ? [...pv, ...cv.results] : pv;
  }, []);

  res.status(200).json(locations);
}
