import React from 'react';
import { Card, Descriptions, Input, Button, Divider, Row, Col, Upload, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { newPicture } from '@/api/goods';
import { changeUserInfo } from '@/api/user';

const UserInfo = () => {
  const userHeaderSelector = useSelector(state => state.user.userInfo.userHeader);
  const [userHeader, setUserHeader] = useState(userHeaderSelector); // 从Redux获取用户头像
  const [drugPicture, setDrugPicture] = useState('');
  const [form, setForm] = useState({}); // 用于存储表单数据的状态

  const userId = useSelector(state => state.user.userInfo.userId);
  const userName = useSelector(state => state.user.userInfo.userName);
  const userCount = useSelector(state => state.user.userInfo.userCount);
  const navigate=useNavigate()
  useEffect(() => {
    setUserHeader(userHeaderSelector);
  }, [userHeaderSelector]); // 当Redux中的userHeader变化时，更新状态

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      setDrugPicture(info.file.response.url);
    } else if (info.file.status === 'error') {
      console.log(info.file);
    }
  };

  const handleCustomRequest = (options) => {
    const { file, onRemove, onSuccess } = options;
    const formData = new FormData();
    formData.append('file', file);
    newPicture(file).then(response => {
      if (response.code === 1) {
        const url = response.data;
        setUserHeader(url); // 更新头像状态
        setDrugPicture(url); // 同时更新drugPicture状态
      } else {
        console.error('上传失败', response.msg);
      }
    }).catch(error => {
      console.error('上传出错', error);
    });
  };

  // 处理表单数据和打印的函数
  const handleFormSubmit = async () => {
    console.log('form=',form);
    const user = {
      userId,
      userName:form.username,
      userPassword: form.password,
      userHeader: drugPicture,
      userCount,
      userJudge,
    };
    console.log('user=', user);
    await changeUserInfo(user)
    message.success('修改成功')
    navigate('/login')
    // 这里可以添加发送数据到后端的逻辑
  };

  // 处理输入框值变化的函数
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card title="用户设置" bordered={false} style={{ textAlign: 'center' }}>
        <Row gutter={16} align="middle" style={{ height: '70vh' }}>
          <Col span={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              width={300}
              src={userHeader}
            />
            <Upload
              customRequest={handleCustomRequest}
              showUploadList={false}
            >
              <Button style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
                选择图片
              </Button>
            </Upload>
          </Col>
          <Col span={14}>
            <Descriptions column={1} style={{ width: '100%' }}>
              <Descriptions.Item label="用户名">
                <Input
                  name="username"
                  placeholder="请输入新用户名"
                  style={{ width: '100%' }}
                  onChange={handleInputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="用户密码">
                <Input.Password
                  name="password"
                  placeholder="请输入新用户密码"
                  style={{ width: '100%' }}
                  onChange={handleInputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="请确认用户密码">
                <Input.Password
                  name="confirmPassword"
                  placeholder="请确认用户密码"
                  style={{ width: '100%' }}
                  onChange={handleInputChange}
                />
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Button type="primary" onClick={handleFormSubmit} style={{ width: '20%' }} block>
              更新个人信息
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserInfo;