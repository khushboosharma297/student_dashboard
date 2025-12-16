import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);
export default function Charts({ trend = [] }) {
  if (!trend.length) return null;

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>Learning Trend</h3>
        <Line
          data={{
            labels: trend.map((_, i) => `Day ${i + 1}`),
            datasets: [
              {
                label: "Time Spent (mins)",
                data: trend,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.2)",
                tension: 0.4
              }
            ]
          }}
        />
      </div>

      <div className="chart-card donut">
        <h3>Completion Status</h3>
        <Doughnut
          data={{
            labels: ["Completed", "Remaining"],
            datasets: [
              {
                data: [trend.length, Math.max(0, 6 - trend.length)],
                backgroundColor: ["#22c55e", "#e5e7eb"]
              }
            ]
          }}
        />
      </div>
    </div>
  );
}

