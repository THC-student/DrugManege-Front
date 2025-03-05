import { Layout, Menu, Popconfirm, Image } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.scss'; // 确保你的 CSS 文件已经正确导入
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user';
const { Header, Sider } = Layout;
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Children, useEffect, useState, useMemo } from 'react';
import { getToken } from '@/utils';
import AddGoods from '../addGoods';
import ChangeStores from '../ChangeStores';
import { useCallback } from 'react';
import sunIcon from '@/assets/sun1.png';
import moonIcon from '@/assets/moon1.png';
import { setJudge } from '@/store/modules/skin';
// 定义菜单项
const originalItems = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: '药品管理',
    icon: <DiffOutlined />,
    children: [
      {
        label: '药品列表',
        key: '/goods',
        icon: <DiffOutlined />,
      },
      {
        label: '新增药品',
        key: '/addGoods',
        icon: <EditOutlined />,
      },
      {
        label: '修改药品信息',
        key: '/changeGoods',
        icon: <EditOutlined />,
      },
    ],
  },
  {
    label: '仓库管理',
    icon: <DiffOutlined />,
    children: [
      {
        label: '仓库列表',
        key: '/storehouse',
        icon: <EditOutlined />,
      },
      {
        label: '仓库修改',
        key: '/ChangeStores',
        icon: <EditOutlined />,
      },
    ],
  },
  {
    label: '用户信息',
    key: '/userInfo',
    icon: <EditOutlined />,
  },
  {
    label: '用户管理',
    key: '/userManage',
    icon: <EditOutlined />,
  },
  {
    label: '反馈管理',
    key: '/Suggest',
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const userJudge = useSelector(state => state.user.userInfo.userJudge); // 1是管理员 0是普通用户
  const items = userJudge === 1 ? originalItems : originalItems.filter(item => item.key !== '/userManage');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const skinJudge = useSelector(state => state.skin.judge);
  // 退出登录功能
  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate('/login');
  };

  // 获取用户信息
  useEffect(() => {
    const token = getToken();
    dispatch(fetchUserInfo(token));
  }, [dispatch]);

  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  const [changePeeling, setChangePeeling] = useState(1); // 初始状态为1，显示太阳图标

  const handleClickIcon = useCallback(() => {
    dispatch(setJudge(!skinJudge));
    setChangePeeling(prev => prev === 1 ? 0 : 1);

  }, [skinJudge, dispatch]);
  // 动态生成背景图路径
  const backgroundImage = changePeeling === 0 ? `url(${sunIcon})` : `url(${moonIcon})`;

  const location = useLocation();
  const selectedKeys = location.pathname;
  const userName = useSelector(state => state.user.userInfo.userName);
  const userHeader = useSelector(state => state.user.userInfo.userHeader);

  // 动态计算背景颜色
  const backgroundColor = useMemo(() => {
    return changePeeling === 1 ? '#89c3eb' : '#464879';
  }, [changePeeling]);

  // 动态计算字体颜色
  const fontColor = useMemo(() => {
    return changePeeling === 1 ? '#000' : '#fff'; // 1时为黑色，0时为白色
  }, [changePeeling]);

  // 动态计算Menu的背景颜色和字体颜色
  const menuBgColor = useMemo(() => {
    return changePeeling === 1 ? '#a2d7dd' : '#5D7DB3'; // 1时为浅蓝色，0时为深蓝色
  }, [changePeeling]);

  const menuFontColor = useMemo(() => {
    return changePeeling === 1 ? '#000' : '#fff'; // 1时为黑色，0时为白色
  }, [changePeeling]);

  // 动态计算Menu选中项的颜色
  const activeItemColor = useMemo(() => {
    return changePeeling === 1 ? '#84a2d4' : '#1e50a2'; // 1时为浅蓝色，0时为深蓝色
  }, [changePeeling]);

  // 动态计算Menu选中项的字体颜色
  const activeItemFontColor = useMemo(() => {
    return changePeeling === 1 ? '#000' : '#fff'; // 1时为黑色，0时为白色
  }, [changePeeling]);
  // 动态为 Menu 添加不同的类名
  const menuClass = useMemo(() => {
   return changePeeling === 0 ? 'custom-menu dark-mode' : 'custom-menu light-mode';
  }, [changePeeling]);


  return (
    <Layout className={skinJudge ? 'light-theme' : 'dark-theme'}>
      <Header
        className="header"
        style={{
          backgroundColor,
          color: fontColor, // 移除!important
          transition: 'background-color 1s ease-in-out',
        }}
      >
        <div className="logo" />
        <img
          src={changePeeling === 1 ? sunIcon : moonIcon}
          alt="toggle"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            marginRight: '1750px', // 调整marginRight的值以满足需求
          }}
          onClick={handleClickIcon}
        />
        <div className="user-info">
          <Image width={70} src={userHeader} />
          <span
            className="user-name"
            style={{ color: fontColor }} // 移除!important
          >
            {userName}
          </span>
          <span
            className="user-logout"
            style={{ color: fontColor, fontSize: '20px' }} // 移除!important
          >
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
    <Sider width={200} className="site-layout-background sider">
      <Menu
        className={menuClass}
        mode="inline"
        selectedKeys={selectedKeys}
        items={items}
        onClick={onMenuClick}
            style={{
              backgroundColor: menuBgColor,
              color: menuFontColor, // 动态字体颜色
              height: '100%',
              borderRight: 0,
              fontSize: '21px',
              transition: 'background-color 1s ease-in-out', 
            }}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;