import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { getNumberOfDrug, getTypeofDrug } from '@/api/goods';
import './index.scss'
const Home = () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null); 
  const chartRef3 = useRef(null); 
  
  const [echart1Data, setEchartData] = useState([]);
  const [echart2Data,setEchart2Data]=useState([]);
  const [echart3Data,setEchart3Data]=useState([]);
  useEffect(() => {
    async function setEchart1() {
      const res = await getTypeofDrug();
      const res2=await getNumberOfDrug();
      console.log('res2.data=',res2.data);
      const dataArray = Object.keys(res.data).map(key => ({
        value: res.data[key],
        name: getDrugCategoryName(parseInt(key, 10)),
      }));
      setEchartData(dataArray);
      const formattedData = Object.entries(res2.data).map(([name, score]) => ({
        name,
        score,
      }));
      setEchart2Data(formattedData);
    }
    setEchart1();
  }, []);

  const getDrugCategoryName = (categoryIndex) => {
    const categories = {
      0: '处方药',
      1: '非处方药',
      2: '精神类药',
      3: '麻醉类药',
    };
    return categories[categoryIndex] || '未知类别';
  };
  const getOption = () => {
    return {
      title: {
        text: '四大药品分类占比',
        left: 'center',
        top:'20px',
       // 向下移动50px
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        top:'50px',
        trigger: 'item',
      },
      legend: {
        top: '15%',
        left: 'center',
      },
      series: [
        {
          top:'72px',
          name: '药品类别',
          type: 'pie',
          radius: ['40%', '80%'], // 放大图表，调整内外半径
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: echart1Data,
        },
      ],
    };
  };
  const getOption2 = () => {
    return {
      title: {
        text: '药店库存',
        left: 'center',
        top:'20px',
       // 向下移动50px
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      dataset: [
        {
          dimensions: ['name', 'score'],
          source: echart2Data
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'score', order: 'desc' }
          }
        }
      ],
      xAxis: {
        type: 'category',
        axisLabel: { 
          interval: 0, 
          rotate: 30,
          color: '#ff0000' // 设置颜色为红色
        }
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        datasetIndex: 1
      }
    };
  };
  const getOption3=()=>{
    return {
      title: {
        text: '仓库库存',
        left: 'center',
        top:'20px',
       // 向下移动50px
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['仓库1', '仓库2', '仓库3'],
        textStyle: { // 设置图例字体样式
          color: '#fff', // 字体颜色
          fontSize: 16 // 字体大小
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['藿香正气水', '洛卡特普', '氟西汀', '布洛芬', '乙酰氨基酚', '洛拉塔丁', '奥氮平','地西泮','西酞普兰','利多卡因','异丙酚','吗啡']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '仓库1',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410,512,366,925,656,141,]
        },
        {
          name: '仓库2',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320,568,994,852,167,234,]
        },
        {
          name: '仓库3',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320,221,354,684,795,624,]
        }
      ]
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-item grid-item-top-left">
        <ReactECharts
          ref={chartRef}
          option={getOption()}
          style={{ height: 500 }}
          lazyUpdate={true}
        />
      </div>
      <div className="grid-item grid-item-top-right">
        <ReactECharts
          ref={chartRef2}
          option={getOption2()}
          style={{ height: 500 }}
          lazyUpdate={true}
        />
      </div>
      <div className="grid-item grid-item-bottom">
      <ReactECharts
          ref={chartRef3}
          option={getOption3()}
          style={{ height: 500 }}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
}
export default Home;
