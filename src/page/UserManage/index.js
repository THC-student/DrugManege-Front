import { Table, Tag, Space, message ,Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { useEffect, useState } from 'react'
import { deleteDrugById, getGoodsList, getGoodsPageSum, newPicture } from '@/api/goods'
import { getToken } from '@/utils'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { changeUserJudgeById, deleteUserByUserId, getUserList, getUserPageCountSum } from '@/api/user'
const UserManage = () => {
  const columns = [
    {
      title: '用户Id',
      dataIndex: 'userId',
      key: 'userId',
      width: 220
    },
    {

        title: '用户头像',
        dataIndex: 'userHeader',
        key: 'userHeader',
        width: 120,
        render: (src) => {
          return <img src={src || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 220
    },
    {
      title: '用户账号',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 220
    },
    {
      title: '是否为管理员',
      dataIndex: 'userJudge',
      key:'userJudge',
      render: (text) => {
        if (text === 1) {
          return <Tag color="purple">管理员</Tag>;
        } else if (text === 0) {
          return <Tag color="geekblue">非管理员</Tag>;
        } 
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="是否要将该用户提升为管理员？"
            onConfirm={() => EditClick(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="确定要删除这条记录吗？"
            onConfirm={() => DeleteClick(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]


  const [list,setList]=useState('')
  const [pageCountSum,setPageCountSum]=useState('')
  const [pageSum,setPageSum]=useState('')
  const [currentPage, setCurrentPage] = useState(1); // 默认页码为1
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    async  function getList(){
        const pageNum=1;
         const res= await getUserList(pageNum)

        const res1= await getGoodsPageSum()
        const res2=await getUserPageCountSum()
        setPageCountSum(res2.data)
         const transformedData = res.data.map(item => ({
          userId: String(item.userId), // 确保id是字符串类型，以匹配rowKey="id"
          userName: item.userName,
          userCount:item.userCount,
          userJudge:item.userJudge,
          userHeader:item.userHeader
        }));
        setList(transformedData)
        setPageSum(res1.data)
    }
    getList()
  },[dispatch])

  const onPageChange= async (page)=>{
    setCurrentPage(page); // 更新当前页码
    //获得当前页数
    const res= await getUserList(page)
    const transformedData = res.data.map(item => ({
      userId: String(item.userId), // 确保id是字符串类型，以匹配rowKey="id"
      userName: item.userName,
      userCount:item.userCount,
      userJudge:item.userJudge,
      userHeader:item.userHeader
    }));
    setList(transformedData)
  }

  const EditClick= async (data)=>{
   console.log('是否要将该用户提升为管理员');
   console.log('data',data);
   
    const res= await changeUserJudgeById(data.userId)
    message.success(`已成功将${data.userName}提升为管理员`)
    const resList = await getUserList(currentPage);
    const transformedData = resList.data.map(item => ({
      userId: String(item.userId),
      userName: item.userName,
      userCount: item.userCount,
      userJudge: item.userJudge,
      userHeader: item.userHeader,
    }));
    setList(transformedData);
  }

  const DeleteClick = async (data) => {
   console.log('是否要删除该用户');
   console.log('data',data);
    const res=await deleteUserByUserId(data.userId)
    message.success(`已成功将${data.userName}删除`)
    window.location.reload();
  };

  return (
    <div >
   <Card title={`根据筛选条件共查询到 ${pageSum} 条结果：`} >
        <Table rowKey="userId" columns={columns} dataSource={list}
           pagination={
            {
                total:pageCountSum,
                pageSize:8,
                onChange:onPageChange
            }
           }
        />
      </Card>
    </div>
   )
  }
  
  export default UserManage