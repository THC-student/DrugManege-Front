import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
//柱状图
const BarChart=({title})=>{
    const chartRef = useRef(null)
    useEffect(() => {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      
      option = {
          title:{
              text:title
          },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
      
      option && myChart.setOption(option);
    }, [])
    return  <div id='main'style={{ width: '400px', height: '300px' }} />
}

export default BarChart