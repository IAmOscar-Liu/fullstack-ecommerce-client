import { ChartData } from "chart.js";
import { PolarArea } from "react-chartjs-2";

interface Props {}

const MyPolarArea: React.FC<Props> = () => {
  const data: ChartData<"polarArea", number[], string> = {
    labels: ["1st Quarter", "2nd Quater ", "3rd Quater", "4th Quarter"],
    datasets: [
      {
        label: "Earnings per Quarter",
        data: [1200, 1900, 3000, 4500],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  return (
    <PolarArea
      data={data}
      options={{ responsive: true, maintainAspectRatio: false }}
    />
  );
};

export default MyPolarArea;
