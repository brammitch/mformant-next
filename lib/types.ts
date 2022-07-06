interface Metadata {
  resultset: {
    offset: number;
    count: number;
    limit: number;
  };
}

export interface NcdcNoaaApi<T> {
  metadata: Metadata;
  results: T[];
}

export interface LocationData {
  mindate: string;
  maxdate: string;
  name: string;
  datacoverage: number;
  id: string;
}

export interface StationData {
  elevation: number;
  mindate: string;
  maxdate: string;
  latitude: number;
  name: string;
  datacoverage: number;
  id: string;
  elevationUnit: string;
  longitude: number;
}
