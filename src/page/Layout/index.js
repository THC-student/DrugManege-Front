import { Layout, Menu, Popconfirm ,Image} from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
const { Header, Sider } = Layout
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Children, useEffect } from 'react'
import { getToken } from '@/utils'
import AddGoods from '../addGoods'
import ChangeStores from '../ChangeStores'
const originalItems  = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: '药品管理',
    icon: <DiffOutlined />,
    children:[
      {
        label: '药品列表',
        key: '/goods',
        icon: <DiffOutlined />,
      },
      {
        label: '新增药品',
        key: '/addGoods',
        icon: <EditOutlined/>,
      },
      {
        label: '修改药品信息',
        key: '/changeGoods',
        icon: <EditOutlined/>,
      },
    ]
  },
  {
    label: '仓库管理',
    icon: <EditOutlined />,
    children:[
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
      

    ]
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
  }
]




const GeekLayout = () => {

const userJudge=useSelector(state=>state.user.userInfo.userJudge) //1是管理员 0是yon
const items = userJudge === 1 ? originalItems : originalItems.filter(item => item.key !== '/userManage');

  const dispatch=useDispatch()
  const navigate=useNavigate()
  //退出登录功能
  const onConfirm=()=>{
    dispatch(clearUserInfo())
    navigate('/login')
  }
  //获取用户信息
  useEffect(()=>{
    const token=getToken()
    dispatch(fetchUserInfo(token))
  },[dispatch])
  const onMenuClick=(route)=>{
    const path=route.key
    navigate(path)
  }
  const location= useLocation()
  const selectedKeys=location.pathname
  const userName=useSelector(state=>state.user.userInfo.userName)
  const userHeader=useSelector(state=>state.user.userInfo.userHeader)


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
        <Image
          width={40}
           src={userHeader}
          />
          <span className="user-name">{userName}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys} //反向路由
            items={items}
            onClick={onMenuClick}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
        <Outlet/> 
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout