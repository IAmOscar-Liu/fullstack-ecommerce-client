import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {}

const MyBar: React.FC<Props> = () => {
  const data: ChartData<"bar", number[], string> = {
    labels: [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ].map((lab) => lab.slice(0, 3)),
    datasets: [
      {
        label: "Earnings per Month",
        data: [
          1200, 1900, 3000, 5400, 2700, 1200, 5000, 6000, 6300, 7200, 4500,
          8900,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
      }}
    />
  );
};

export default MyBar;
