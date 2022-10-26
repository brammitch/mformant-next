import { BarTrace, BaseTrace } from "@brammitch/plotly-react";
import uniq from "lodash.uniq";
import dynamic from "next/dynamic";
import { ClimateData, ForecastPeriod } from "../lib/types";

const Bar = dynamic(
  () => import("@brammitch/plotly-react/dist/charts/Bar"),
  {
    ssr: false,
  }
);

interface ClimateBarProps {
  climateData: ClimateData[];
  forecastData: ForecastPeriod[];
}

export default function ClimateBar(props: ClimateBarProps) {
  // Generate x-axis values
  const x = uniq(
    props.forecastData.map((f) =>
      new Date(f.startTime).toDateString().split(" ").slice(1, -1).join(" ")
    )
  );

  // Get y-axis values for b1 and b2
  const dailyHighs: (string | number)[] = props.forecastData
    .filter((f) => f.isDaytime)
    .map((f) => f.temperature);

  const dailyLows: (string | number)[] = props.forecastData
    .filter((f) => !f.isDaytime)
    .map((f) => f.temperature);

  /**
   * If isDaytime === true for the first item in forecastData,
   * then the arrays are synchronized by date.
   * If not, the arrays are offset. This is a hacky fix.
   */
  if (props.forecastData[0].isDaytime === false) {
    dailyHighs.unshift(" ");
    dailyLows.push(" ");
  }

  // Add padding to either side of the arrays
  for (const arr of [dailyHighs, dailyLows]) {
    arr.unshift(" ");
    arr.push(" ");
  }

  /**
   * Add padding to the x-axis, but it cannot end with an empty string.
   * If it does, Plotly will not render that point.
   */
  x.unshift(" ");
  x.push("-");

  const values = [...Array(x.length).keys()];
  const labels = [...x];
  // Replace the "-" with a space so the "-" doesn't show but the point still renders
  labels.pop();
  labels.push(" ");

  const currentMonth = new Date().getMonth();
  const thisMonthsHistoricalData = props.climateData.filter(
    (c) => new Date(c.date).getMonth() === currentMonth
  );

  const emnts = thisMonthsHistoricalData
    .filter((c) => c.datatype === "EMNT")
    .map((c) => c.value);
  const emxts = thisMonthsHistoricalData
    .filter((c) => c.datatype === "EMXT")
    .map((c) => c.value);

  const avgEmnt = emnts.reduce((a, b) => a + b, 0) / emnts.length;
  const avgEmxt = emxts.reduce((a, b) => a + b, 0) / emxts.length;

  const avgEmntY = Array(x.length).fill(avgEmnt);
  const avgEmxtY = Array(x.length).fill(avgEmxt);

  const tmaxs = thisMonthsHistoricalData
    .filter((c) => c.datatype === "TMAX")
    .map((c) => c.value);
  const tmins = thisMonthsHistoricalData
    .filter((c) => c.datatype === "TMIN")
    .map((c) => c.value);

  const avgTmax = tmaxs.reduce((a, b) => a + b, 0) / tmaxs.length;
  const avgTmin = tmins.reduce((a, b) => a + b, 0) / tmins.length;

  const avgTmaxY = Array(x.length).fill(avgTmax);
  const avgTminY = Array(x.length).fill(avgTmin);

  console.log("x", x);
  // console.log("avgEmntY", avgEmntY);
  console.log("emxts", emxts);

  const b1: BarTrace = {
    name: "High",
    color: "orange",
    y: dailyHighs,
  };

  const b2: BarTrace = {
    name: "Low",
    color: "blue",
    y: dailyLows,
  };

  const t1: BaseTrace = {
    name: "Hist. Low",
    color: "darkblue",
    y: avgEmntY,
  };

  const t2: BaseTrace = {
    name: "Hist. High",
    color: "red",
    y: avgEmxtY,
  };

  const range: { l: BaseTrace; h: BaseTrace } = {
    l: {
      color: "yellow",
      y: avgTminY,
    },
    h: {
      name: "Avg. Range",
      y: avgTmaxY,
    },
  };

  return (
    <Bar
      traces={[b1, b2]}
      layoutProps={{ hovermode: "x" }}
      max={120}
      range={range}
      thresholdLow={t1}
      thresholdHigh={t2}
      ticks={{ labels, values }}
      x={x}
    />
  );
}
