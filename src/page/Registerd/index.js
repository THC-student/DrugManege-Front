import './index.scss';
import { Card, Form, Input, Button, message } from 'antd';
import logo1 from '@/assets/logo1.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Registerd = () => {

    const onFinish = async (formValue) => {
   
    };
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo1} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger={['onBlur']}>
                    <Form.Item
                        name="userCount"
                        rules={[
                            { required: true, message: '请输入账号' },
                            {
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item
                        name="userPassword"
                        rules={[
                            { required: true, message: '请输入密码' },
                        ]}
                    >
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                    <div className="register-link">
                    <a onClick={() => navigate('/login')}>跳转到登录</a>
                </div>
                </Form>
            </Card>
        </div>
    );
}

export default Registerd;