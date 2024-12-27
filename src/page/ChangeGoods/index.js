import React, { useState,useRef, useEffect  } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './indes.scss'
import { changeDrugInfo, getDrugInfo, newDrug, newPicture } from '@/api/goods';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;





const ChangeGoods = () => {
    const params=useParams();
    const drugId=params.drugId;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [drugInfo, setDrugInfo] = useState({}); 
  const [drugPicture,setDrugPicture]=useState('')
  const [drugComponents,setDrugComponents]=useState('')
  const form = useRef(); 
  const handleUpload = (file) => {
    console.log('开始执行换封面');
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
  useEffect(() => {
    async function getDrugInfoByDrugId() {
      
      const res = await getDrugInfo(drugId);
      const data = res.data;
      setDrugInfo(data); // 更新药品信息状态
      if (form.current) {
        form.current.setFieldsValue({
          drugName: data.drugName,
          drugNumber: data.drugNumber,
          drugType: data.drugType,
          drugMode: data.drugMode,
          drugPicture: data.drugPicture,
          drugComponents: data.drugComponents,
        });
      }
    }
    getDrugInfoByDrugId();
  }, []);
  const onFinish = async (drug) => {
    drug.drugId=drugId
    drug.drugPicture=drugPicture;
    drug.drugComponents=drugComponents;
    console.log(drug);
    await changeDrugInfo(drug)
    message.success("修改成功!")
  }
  
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/goods'}>返回列表</Link> },
            { title: '修改药品信息' },
          ]}
        />
      }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
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
            initialValue={drugInfo.drugName}
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


          <Form.Item label="使用说明书" style={{ marginBottom: 20 }}>
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

export default ChangeGoods;