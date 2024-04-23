import React from 'react'
import {Chart as ChartJS,
ArcElement,
Tooltip,
Legend} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend)

const Pie_chart = ({data_by_content_type}) => {
    const data = {
        labels: data_by_content_type.map((content)=>{
            const {group}=content;
            return group;
        }),
        datasets: [
          {
            label: 'Dataset',
            data: data_by_content_type.map((content)=>{
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
      const options={}
  return (
    <div className='w-1/3 border  border-black p-4'>
        <h2 className='text-2xl'>Content Size</h2>
      <Pie data={data} options={options}></Pie>
    </div>
  )
}

export default Pie_chart
