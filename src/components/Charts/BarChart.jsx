import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// import { ChartLoader, NoDataFound } from "@/components";

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const BarChart = (props) => {
  const { labels, values, title, isLoading } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: title.toLowerCase(),
        data: values,
        backgroundColor: "#d8b4fe",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45, // Rotate labels if necessary
          // callback: function (value) {
          //   // Custom label formatting
          //   console.log(value);
          //   if (value.length > 10) {
          //     return value.substring(0, 10) + "..."; // Add ellipsis if label is too long
          //   }
          //   return value;
          // },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const totalValue =
              context?.dataset?.data?.reduce(
                (sum, item) => parseInt(sum + parseInt(item)),
                0
              ) ?? 1;
            const percentageValue = parseFloat(
              ((context?.raw / totalValue) * 100).toFixed(1)
            );
            return context?.raw + " (" + percentageValue + "%)";
          },
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        // <ChartLoader />
        <p>Loading</p>
      ) : values?.length && values.some((item) => item !== null) ? (
        <Bar data={data} options={options} height="350px" />
      ) : (
        <>
          <p className="text-base text-center">{title}</p>
          {/* <NoDataFound /> */}
        </>
      )}
    </>
  );
};

export default BarChart;
