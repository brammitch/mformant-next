import type { NextApiRequest, NextApiResponse } from "next";
import { ClimateData, NcdcNoaaApi } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClimateData[]>
) {
  const stationId = req.query.id;
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

  const baseUrl = `https://www.ncei.noaa.gov/cdo-web/api/v2/data?stationid=${stationId}&datasetid=GSOM&startdate=${startDate}&enddate=${endDate}&datatypeid=TMAX,TMIN,EMNT,EMAX,TAVG`;

  const response = await fetch(`${baseUrl}&limit=1`, init);

  const data = (await response.json()) as NcdcNoaaApi<ClimateData>;

  const count = data.metadata.resultset.count;
  const limit = 500;
  const pageCount = Math.ceil(count / limit);

  const urls: string[] = [];

  for (let page = 1; page <= pageCount; page++) {
    urls.push(`${baseUrl}&offset=${(page - 1) * limit}&limit=${limit}`);
  }
  const requests = urls.map((url) => fetch(url, init));
  const responses = await Promise.all(requests);
  const json = responses.map((response) => response.json());
  const allData = (await Promise.all(json)) as NcdcNoaaApi<ClimateData>[];

  const locations = allData.reduce<ClimateData[]>((pv, cv) => {
    return Boolean(cv?.results?.length) ? [...pv, ...cv.results] : pv;
  }, []);

  res.status(200).json(locations);
}
