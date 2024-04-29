import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { formatFileSize } from "../../utils/commonUtils";

// import { ChartLoader, NoDataFound } from "@/components";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ labels, values, title, isLoading }) => {
  // const totalValues = values.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  let customLabels = [];
  labels.forEach((label, index) => {
    if (values[index] !== 0) {
      // customLabels.push(`${label}: ${parseFloat((values[index] / totalValues) * 100).toFixed(2)}%`);
      customLabels.push(label);
    }
  });

  const customValues = values.filter((item) => item !== 0 || item !== 0);
  const data = {
    labels: customLabels,
    datasets: [
      {
        data: customValues,
        backgroundColor: [
          "#d8b4fe", //purple
          "#fdba74", //orange
          "#fcd34d", //yellow
          "#bef264", //lime
          "#e879f9", //fuchsia
          "#fb7185", //rose
          "#ef4444", //red
          "#cbd5e1", //slate
          "#6ee7b7", //emerald
          "#c4b5fd", //violet
        ],
        // borderJoinStyle: "miter",
        // borderColor: [
        //   "#9333ea",
        //   "#ea580c",
        //   "#ca8a04",
        //   "#65a30d",
        //   "#c026d3",
        //   "#e11d48",
        //   "#dc2626",
        //   "#475569",
        //   "#059669",
        //   "#7c3aed",
        // ],
        // borderWidth: 1,
      },
    ],
  };

  const options = {
    // cutout: 150,
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
                (sum, item) => sum + parseInt(item),
                0
              ) ?? 1;
            const percentageValue = parseFloat(
              ((context?.raw / totalValue) * 100).toFixed(1)
            );
            return formatFileSize(context?.raw) + " (" + percentageValue + "%)";
          },
        },
      },
    },
  };
  return (
    <>
      {isLoading ? (
        // <ChartLoader />
        <span>Loader</span>
      ) : customValues?.length && customValues.some((item) => item !== null) ? (
        <Doughnut data={data} options={options} />
      ) : (
        <>
          <p className="text-base text-center">{title}</p>
          {/* <NoDataFound /> */}
        </>
      )}
    </>
  );
};

export default PieChart;
