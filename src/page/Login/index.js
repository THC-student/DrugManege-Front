import React, { useState } from 'react';
import './index.scss'; // 假设我们将 CSS 转换为 SCSS 并保存在 Login.scss 文件中
import { fetchLogin, fetchRegisterd } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/utils';
import { useDispatch } from 'react-redux';
const Login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()//跳转函数
  // 定义登录表单的状态
  const [loginForm, setLoginForm] = useState({
    userCount: '',
    userPassword: '',
  });
  
  // 定义注册表单的状态
  const [registerForm, setRegisterForm] = useState({
    userCount: '',
    userPassword: '',
    confirmUserPassword: '',
  });

  // 处理登录表单输入变化
  const handleLoginInputChange =  (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  // 处理注册表单输入变化
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  // 定义忘记密码的处理函数
  const handleForgetPassword = () => {
    console.log('忘记密码被点击');
    // 这里可以添加更多的逻辑，比如打开一个模态框等
  };


  // 定义切换登录和注册视图的函数
  const toggleView = () => {
    const middlePart = document.querySelector('.way');
    const leftPart = document.querySelector('.main_left');
    const rightPart = document.querySelector('.main_right');
    const isLogin = middlePart.textContent === '注册';

    if (isLogin) {
      middlePart.textContent = '登录';
      leftPart.classList.add('hid');
      rightPart.classList.add('dis');
      middlePart.classList.remove('pull');
    } else {
      middlePart.textContent = '注册';
      leftPart.classList.remove('hid');
      rightPart.classList.remove('dis');
      middlePart.classList.add('pull');
    }
  };

  // 登录表单提交处理函数
  const handleLoginSubmit = async () => {
   
    console.log('登录表单信息：', loginForm);
    // 这里可以添加更多的登录逻辑
    await dispatch(fetchLogin(loginForm))
     
        //触发异步action fetchLogin
        //1.跳转到首页
        const judge= getToken()
        if(judge!==null){
            navigate('/')
        }

        //2.提示用户是否登录成功

  };

  // 注册表单提交处理函数
  const handleRegisterSubmit =  async () => {
    console.log('注册表单信息：', registerForm);
    // 这里可以添加更多的注册逻辑
    await dispatch(fetchRegisterd(registerForm))
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="main_left active">
        <h2>登录</h2>
        <form action="#" className="form_login">
          <input
            type="text"
            placeholder="请输入账号"
            name="userCount"
            value={loginForm.username}
            onChange={handleLoginInputChange}
          />
          <input
            type="password"
            placeholder="请输入密码"
            name="userPassword"
            value={loginForm.password}
            onChange={handleLoginInputChange}
          />
      
        </form>
        <div className="card">
          <button  className="custom-button" onClick={handleLoginSubmit}>登录</button>
        </div>
      </div>
      <div className="way">
        <div className="change_way">
          <button className="custom-button" onClick={toggleView}>注册</button>
        </div>
      </div>
      <div className="main_right active">
        <h2>注册</h2>
        <form action="#" className="form_register" onSubmit={handleRegisterSubmit}>
  <input
    type="text"
    placeholder="请输入邮箱/手机号"
    name="userCount"
    value={registerForm.emailOrPhone}
    onChange={handleRegisterInputChange}
  />
  <input
    type="password"
    placeholder="请输入密码"
    name="userPassword"
    value={registerForm.password}
    onChange={handleRegisterInputChange}
  />
  <input
    type="password"
    placeholder="确认密码"
    name="confirmUserPassword"
    value={registerForm.confirmPassword}
    onChange={handleRegisterInputChange}
  />
  <div style={{ marginBottom: '20px' }}></div> {/* 添加底部间距 */}
  <button className="custom-button" type="submit" style={{ marginLeft: '95px' }}>注册</button>
</form>
      </div>
    </div>
  );
};

export default Login;