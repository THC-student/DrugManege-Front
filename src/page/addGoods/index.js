import React, { useState,useRef  } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { newDrug, newPicture } from '@/api/goods';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;





const AddGoods = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [drugPicture,setDrugPicture]=useState('')
  const [drugComponents,setDrugComponents]=useState('')
  const form = useRef(); 
  const handleUpload = (file) => {
    newPicture(file).then(response => {
      if (response.code === 1) {
        // 这里可以更新表单中的某个字段，比如药品封面的URL
        // 假设你有一个状态用于存储封面URL
        const url=response.data;
        setImageUrl(response.data);
        setDrugPicture(response.data)
        
      } else {
        console.error('上传失败', response.msg);
      }
    }).catch(error => {
      console.error('上传出错', error);
    });
  };

  const handleUpload1 = (file) => {
    newPicture(file).then(response => {
      if (response.code === 1) {
        // 这里可以更新表单中的某个字段，比如药品封面的URL
        // 假设你有一个状态用于存储封面URL
        const url=response.data;
        setImageUrl(response.data);
        setDrugComponents(response.data)
 
      } else {
        console.error('上传失败', response.msg);
      }
    }).catch(error => {
      console.error('上传出错', error);
    });
  };
  const onFinish = (drug) => {
    drug.drugPicture=drugPicture;
    drug.drugComponents=drugComponents;
    console.log(drug);
    const res= newDrug(drug)
    message.success('新增成功')
    form.current.resetFields(); 
   setDrugPicture('')
   setDrugComponents('')
  }
  
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/goods'}>返回列表</Link> },
            { title: '新增商品' },
          ]}
        />
      }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="药品名"
            name="drugName"
            rules={[{ required: true, message: '请输入药品名' }]}
          >
            <Input placeholder="请输入药品名" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="药品库存数量为"
            name="drugNumber"
            rules={[{ required: true, message: '请输入库存数量' }]}
          >
            <Input placeholder="请输入药品名" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="药品类型"
            name="drugType"
            rules={[{ required: true, message: '请选择药品类型' }]}
          >
            <Select placeholder="请选择药品类型" style={{ width: 400 }}>
              <Option value={0}>处方药</Option>
              <Option value={1}>非处方药</Option>
              <Option value={2}>精神类药</Option>
              <Option value={3}>麻醉药</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="服用方式"
            name="drugMode"
            rules={[{ required: true, message: '请选择服用方式' }]}
          >
            <Select placeholder="请选择服用方式" style={{ width: 400 }}>
              <Option value={1}>注射</Option>
              <Option value={2}>口服</Option>
            </Select>
          </Form.Item>

          <Form.Item label="药品封面" style={{ marginBottom: 20 }}>
             <Upload
                 listType="picture-card"
                 customRequest={options => {
                handleUpload(options.file);
               }}
              >
              {drugPicture ? <img src={drugPicture} alt="封面" style={{ width: '100%' }} /> : <Button icon={<UploadOutlined />}>Upload</Button>}
             </Upload>
          </Form.Item>


          <Form.Item label="药品封面" style={{ marginBottom: 20 }}>
             <Upload
                 listType="picture-card"
                 customRequest={options => {
                handleUpload1(options.file);
               }}
              >
              {drugComponents ? <img src={drugComponents} alt="封面" style={{ width: '100%' }} /> : <Button icon={<UploadOutlined />}>Upload</Button>}
             </Upload>
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddGoods;