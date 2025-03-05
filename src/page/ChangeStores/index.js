import React, { useState,useRef, useEffect  } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message,Image } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { changeDrugInfo, getDrugInfo, newDrug, newPicture } from '@/api/goods';
import { UploadOutlined } from '@ant-design/icons';
import './index.scss'
import { changeStore, GetStoreInfoById } from '@/api/store';
import { use } from 'react';
const { Option } = Select;
import { useDispatch, useSelector } from 'react-redux';




const ChangeStores = () => {
    const params=useParams();
    const storeId=params.storeId;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [drugInfo, setDrugInfo] = useState({}); 
  const [storeInfo, setstoreInfo] = useState({}); 
  const [drugComponents,setDrugComponents]=useState('')
  const [storePicture,setStorePicture]=useState('')
  const form = useRef(); 
  const [formInitialValues, setFormInitialValues] = useState({});
  const userJudge = useSelector(state => state.user.userInfo.userJudge);
  const handleUpload = (file) => {
    console.log('开始执行换封面');
    newPicture(file).then(response => {
      if (response.code === 1) {
        // 这里可以更新表单中的某个字段，比如药品封面的URL
        // 假设你有一个状态用于存储封面URL
        const url=response.data;
        setImageUrl(response.data);
        
      } else {
        console.error('上传失败', response.msg);
      }
    }).catch(error => {
      console.error('上传出错', error);
    });
  };

   const handleCustomRequest = (options) => {
      const { file, onRemove, onSuccess } = options;
      const formData = new FormData();
      formData.append('file', file);
      newPicture(file).then(response => {
        if (response.code === 1) {
          const url = response.data;
          console.log('url=',url);
          setStorePicture(url)
          console.log('store');
        } else {
          console.error('上传失败', response.msg);
        }
      }).catch(error => {
        console.error('上传出错', error);
      });
    };
  
  useEffect(() => {
    if(!storeId){
      return ;
    }
    try{
      async function getDrugInfoByDrugId() {
        const res=await GetStoreInfoById(storeId)
        const data=res.data
        console.log('data=',data);
       setstoreInfo(data)
       console.log('storeInfo',storeInfo);
       if(form.current){
        form.current.setFieldsValue({
          storeNumber:data.storeNumber,
          storePicture: data.storePicture,
        })
       }
      }
    }catch(error){
      message.error("出现错误")
    }
    
    getDrugInfoByDrugId()
  }, []);
  const onFinish = async (store) => {
    message.success("修改成功!")
    console.log('store=',store);
   
  }

  // 处理表单数据和打印的函数
    const handleFormSubmit = async () => {
      console.log('form=',form);
      const store={
        storeId:storeId,
        sampleId:storeInfo.sampleId,
        drugId:storeInfo.drugId,
        storeName:storeInfo.storeName,
        storeAddress:storeInfo.storeAddress,
        storePicture:storePicture,
        storeNumber: form.current.getFieldValue('storeNumber'),
        drugName:storeInfo.drugName
      }
      console.log('store=',store);
      await changeStore(store);
      message.success("修改成功!")
      // 这里可以添加发送数据到后端的逻辑
    };
  
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/storehouse'}>返回列表</Link> },
            { title: '修改仓库中药品信息' },
          ]}
        />
      }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          ref={form}
          initialValues={formInitialValues}
        >
          <Form.Item label="仓库" name="StorePicture">
             <Space direction="vertical" align="center">
              <Image
                   width={400}
                  height={300}
                  src={storePicture}
                   preview={false}
              />
             <Upload
               customRequest={handleCustomRequest}
               showUploadList={false}
               >
              <Button style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
                   选择图片
                  </Button>
               </Upload>
        </Space>
      </Form.Item>
          <Form.Item
            label="仓库数量"
            name="storeNumber"
            initialValue={storeInfo.storeNumber}
            rules={[{ required: true, message: '请输入新的仓库数量' }]}
          >
            <Input placeholder="请输入新的该仓库中药品的数量"style={{ width: 400 }} />
          </Form.Item>       
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space  >
            <Button onClick={handleFormSubmit} style={{ position: 'absolute', bottom: '-10px', left: '45%', transform: 'translateX(-50%)' }} type='primary'>
                修改仓库信息
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangeStores;