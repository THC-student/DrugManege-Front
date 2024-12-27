import { Table, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import img404 from '@/assets/error.png';
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd';

const Goods = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'drug_picture',
      width: 120,
      render: (text) => {
        // 假设drug_picture字段包含图片URL，这里需要解析出URL
        const imageUrl = text.split(' ')[0]; // 假设URL是第一个元素
        return <img src={imageUrl || img404} width={80} height={60} alt="" />;
      }
    },
    {
      title: '药品名',
      dataIndex: 'drug_name',
      width: 220
    },
    {
      title: '类型',
      dataIndex: 'drug_type',
      render: (text) => <Tag color="green">{text === '0' ? '非处方药' : '处方药'}</Tag> // 假设0代表非处方药，1代表处方药
    },
    {
      title: '服用类型',
      dataIndex: 'drug_mode'
    },
    {
        title: '存量',
        dataIndex: 'drug_number'
      },
      {
        title: '使用说明书',
        dataIndex: 'drug_components'
      },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      }
    }
  ];

  // 准备表格body数据
  const data = [
    // 假设这是从你的表格数据转换而来的数据源
    { drug_id: '1', drug_name: '藿香正气水', drug_type: '0', drug_number: '100', drug_picture: 'https://qhglhh.oss-cn-beijing.aliyuncs.com/05521404-406b-433f-b871-54350f9dd611.png', drug_mode: '1', drug_components: 'https://qhglhh.oss-cn-beijing.aliyuncs.com/4665bf35-2dd2-46a5-b5eb-92d0c6ef57ea.jpg' },
    // ... 其他数据项
  ];

  return (
    <div>
      <Table
        rowKey="drug_id" // 假设每条记录的唯一标识是drug_id
        columns={columns}
        dataSource={data}
        style={{ backgroundColor: 'transparent' }}
        pagination={false}
      />
    </div>
  );
};

export default Goods;