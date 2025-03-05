import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { getNumberOfDrug, getTypeofDrug } from '@/api/goods';
import { useSelector } from 'react-redux'; // 引入 useSelector
import './index.scss';

// 定义颜色主题
const lightColorTheme = [
  '#6B8DD6',
  '#30C0D9',
  '#44D7B6',
  '#FAD961',
  '#8E37D7',
  '#4654EA',
  '#4091EA',
  '#F76B1C',
];

const darkColorTheme = [
  '#2E1A47',
  '#464879',
  '#5D7DB3',
  '#84709B',
  '#B6CAD7',
  '#D2C3D5',
  '#E1E4EA',
  '#A8D8E6'
];

const Home = () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const judge = useSelector((state) => state.skin.judge);

  // 管理图表的加载状态
  const [isLoadingEchart1, setIsLoadingEchart1] = useState(true);
  const [isLoadingEchart2, setIsLoadingEchart2] = useState(true);
  const [isLoadingEchart3, setIsLoadingEchart3] = useState(true);

  // 根据 judge 的值选择颜色主题
  const pieColorTheme = judge ? lightColorTheme : darkColorTheme;
  const barColorTheme = judge ? lightColorTheme : darkColorTheme;

  // 定义图表数据状态
  const [echart1Data, setEchart1Data] = useState([]); // 饼图数据
  const [echart2Data, setEchart2Data] = useState([]); // 柱状图数据
  const [echart3Data, setEchart3Data] = useState({}); // 折线图数据（改为对象）

  useEffect(() => {
    async function fetchChartData() {
      try {
        // 获取饼图数据
        const res = await getTypeofDrug();
        const pieData = Object.keys(res.data).map(key => ({
          value: res.data[key],
          name: getDrugCategoryName(parseInt(key, 10)),
        }));
        setEchart1Data(pieData);
        setIsLoadingEchart1(false); // 饼图数据加载完成

        // 获取柱状图数据
        const res2 = await getNumberOfDrug();
        const barData = Object.entries(res2.data).map(([name, score]) => ({
          name,
          score,
        }));
        setEchart2Data(barData);
        setIsLoadingEchart2(false); // 柱状图数据加载完成

        // 获取折线图数据（示例数据，未连接真实接口）
        const lineData = {
          categories: ['藿香正气水', '洛卡特普', '氟西汀', '布洛芬', '乙酰氨基酚', '洛拉塔丁', '奥氮平', '地西泮', '西酞普兰', '利多卡因', '异丙酚', '吗啡'],
          datasets: {
            '仓库1': [150, 232, 201, 154, 190, 330, 410, 512, 366, 925, 656, 141],
            '仓库2': [320, 332, 301, 334, 390, 330, 320, 568, 994, 852, 167, 234],
            '仓库3': [820, 932, 901, 934, 1290, 1330, 1320, 221, 354, 684, 795, 624],
          }
        };
        setEchart3Data(lineData);
        setIsLoadingEchart3(false); // 折线图数据加载完成
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchChartData();
  }, []);

  // 工具函数：获取药品分类名称
  const getDrugCategoryName = (categoryIndex) => {
    const categories = {
      0: '处方药',
      1: '非处方药',
      2: '精神类药',
      3: '麻醉类药',
    };
    return categories[categoryIndex] || '未知类别';
  };

  // 配置饼图（独立设置颜色主题）
  const getOption = () => {
    const legendData = echart1Data.map(item => item.name);

    return {
      title: {
        text: '四大药品分类占比',
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        top: '15%',  
        left: 'center',
        data: legendData,
        formatter: name => {
          const data = echart1Data.find(item => item.name === name);
          return `${name}: ${data ? data.value : 0}`;
        },
        textStyle: {
          color: '#666',
          fontSize: 12,
        },
      },
      series: [
        {
          name: '药品分类',
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['50%', '60%'], 
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside', 
            alignTo: 'edge',
            edgeDistance: 20, 
            formatter: '{b}: {d}%',
            color: '#333',
            fontSize: 18, 
            distanceToLabelLine: 10, 
          },
          labelLine: {
            show: true,
            length: 20,  
            length2: 30,
            smooth: 0.2,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18, 
              fontWeight: 'bold',
            },
          },
          data: echart1Data.map((item, index) => ({
            ...item,
            itemStyle: {
              color: pieColorTheme[index % pieColorTheme.length], 
            },
          })),
        },
      ],
      grid: {  
        top: '30%',
        bottom: '15%'
      }
    };
  };

  // 配置柱状图（使用柱状图颜色主题）
  const getOption2 = () => {
    const transformedData = echart2Data.map(item => ({
      value: item.score,
      name: item.name,
    }));

    return {
      title: {
        text: '药店库存',
        left: 'center',
        top: '20px',
        textStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params) => {
          return `药品名称：${params.name}<br />库存数量：${params.value}`;
        },
        textStyle: {
          fontSize: 18,
          color: '#333',
        },
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 30, 
          color: '#333',
          fontSize: 18,
        },
        data: transformedData.map(item => item.name),
      },
      yAxis: {
        type: 'value',
        name: '库存数量',
        nameTextStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
        axisLabel: {
          color: '#333',
          fontSize: 18,
        },
      },
      series: [
        {
          type: 'bar',
          data: transformedData,
          barWidth: '60%', 
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            color: '#333',
            fontSize: 18,
          },
          itemStyle: {
            color: (params) => {
              return barColorTheme[params.dataIndex % barColorTheme.length]; 
            },
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        top: '30%', 
        bottom: '15%', 
        containLabel: true,
      },
    };
  };

  // 配置折线图（动态颜色主题和样式调整）
  // 配置折线图（添加颜色主题动态切换和样式调整）
  const getOption3 = () => {
    // 动态选择颜色主题
    const lineColorTheme = judge ? lightColorTheme : darkColorTheme;

    let categories = [];
    let seriesData = [
        { name: '仓库1', data: [] },
        { name: '仓库2', data: [] },
        { name: '仓库3', data: [] }
    ];

    if (echart3Data.categories) {
        categories = echart3Data.categories;
        // 动态生成 series 数据和 legend 数据
        const datasetKeys = Object.keys(echart3Data.datasets);
        seriesData = datasetKeys.map((key, index) => ({
            name: key,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            data: echart3Data.datasets[key],
            itemStyle: {
                color: lineColorTheme[index % lineColorTheme.length], 
            },
            label: {
                show: true,
                color: '#333',
                fontSize: 14,
                position: 'top',
                formatter: (params) => `${params.value}个`,
            },
        }));
    }

    return {
        title: {
            text: '仓库库存',
            left: 'center',
            top: '20px',
            textStyle: {
                fontSize: 20,
                fontWeight: 'normal',
                color: !!(judge) ? '#333' : '#ccc', 
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: !(judge) ? '#6a7985' : '#ccc', 
                },
            },
            formatter: (params) => {
                const category = params[0].name;
                const line = params
                    .map((item) => `${item.seriesName}：${item.value}<br />`)
                    .join('');
                return `${category}<br />${line}`;
            },
        },
        legend: {
            data: seriesData.map((item) => item.name),
            textStyle: {
                color: !!(judge) ? '#333' : '#ccc', 
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: !!(judge) ? '#ddd' : '#666', 
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: categories,
                axisLabel: {
                    color: !!(judge) ? '#333' : '#ccc', 
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                axisLine: {
                    lineStyle: {
                        color: !!(judge) ? '#000' : '#ddd', 
                    },
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: !!(judge) ? '#333' : '#ccc', 
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: !!(judge) ? '#eee' : '#333', 
                    },
                },
            },
        ],
        series: seriesData,
    };
  };

  // 动态高亮图表元素
  const highlightData = (params) => {
    const instance = chartRef.current?.getEchartsInstance();
    if (instance && params.seriesIndex !== undefined) {
      instance.dispatchAction({
        type: 'highlight',
        seriesIndex: params.seriesIndex,
        name: params.name,
      });
    }
  };

  // 动态取消高亮
  const cancelHighlight = () => {
    const instance = chartRef.current?.getEchartsInstance();
    if (instance) {
      instance.dispatchAction({
        type: 'downplay',
      });
    }
  };

  return (
    <div className="grid-container">
      {/* 饼图 */}
      <div className="grid-item grid-item-top-left">
        {isLoadingEchart1 ? (
          <div className="loading-placeholder" />
        ) : (
          <ReactECharts
            ref={chartRef}
            option={getOption()}
            style={{ height: '500px' }}
            onEvents={{
              mouseover: highlightData,
              mouseout: cancelHighlight,
            }}
          />
        )}
      </div>

      {/* 柱状图 */}
      <div className="grid-item grid-item-top-right">
        {isLoadingEchart2 ? (
          <div className="loading-placeholder" />
        ) : (
          <ReactECharts
            ref={chartRef2}
            option={getOption2()}
            style={{ height: '500px' }}
            onEvents={{
              click: (params) => {
                console.log('点击柱状图:', params);
              },
            }}
          />
        )}
      </div>

      {/* 折线图 */}
      <div className="grid-item grid-item-bottom">
        {isLoadingEchart3 ? (
          <div className="loading-placeholder" />
        ) : (
          <ReactECharts
            ref={chartRef3}
            option={getOption3()}
            style={{ height: '400px' }}
            onEvents={{
              click: (params) => {
                console.log('点击折线图:', params);
              },
            }}
          />
        )}
      </div>
    </div>
  );
};


export default Home;