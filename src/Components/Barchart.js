import React from 'react';
import {Chart as ChartJS,
    BarElement,
CategoryScale, //For x axis
LinearScale,//y axis
Tooltip,
Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Barchart = ({data_by_content_size}) => {
  const data = {
    labels: data_by_content_size.map((content)=>{
        const {group}=content;
        return group;
    }),
    datasets: [
      {
        label: 'Dataset',
        data: data_by_content_size.map((content)=>{
            const {usage}=content;
            return usage;
        }),
        backgroundColor: [
          'brown',
          'blue',
          'red'
        ],
        borderColor: [
          'brown',
          'blue',
          'red'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    
  };

  return (
    <div className='w-1/3 border  border-black p-4'>
      <h2 className='text-2xl'>Content Type</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Barchart;
