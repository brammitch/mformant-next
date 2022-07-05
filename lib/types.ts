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

export interface StatesData {
  mindate: string;
  maxdate: string;
  name: string;
  datacoverage: number;
  id: string;
}
