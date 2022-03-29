import { Doughnut } from "react-chartjs-2";

interface Props {}

const MyDoghnut: React.FC<Props> = () => {
  return (
      <Doughnut
        data={{
          labels: ["a", "b", "c"],
          datasets: [
            {
              data: [1, 2, 3],
            },
          ],
        }}
      />
  );
};

export default MyDoghnut;
