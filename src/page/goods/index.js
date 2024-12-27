import { Table, Tag, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, SoundTwoTone } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { useEffect, useState } from 'react'
import { deleteDrugById, getDrugPageSum, getGoodsList, getGoodsPageSum, newPicture } from '@/api/goods'
import { getToken } from '@/utils'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
const Goods = () => {
  const columns = [
    {

        title: '封面',
        dataIndex: 'drugPicture',
        key: 'drugPicture',
        width: 120,
        render: (src) => {
          return <img src={src || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: '药品名',
      dataIndex: 'drugName',
      key: 'drugName',
      width: 220
    },
    {
      title: '类型',
      dataIndex: 'drugType',
      key: 'drugType',
      render: (text) => {
        if (text === 0) {
          return <Tag color="green">处方药</Tag>;
        } else if (text === 1) {
          return <Tag color="#f50">非处方药</Tag>;
        } else if (text === 2) {
          return <Tag color="#2db7f5">精神类药</Tag>;
        } else if (text === 3) {
          return <Tag color="#87d068">麻醉药</Tag>;
        } 
      },
    },
    {
      title: '服用类型',
      dataIndex: 'drugMode',
      render: (text) => {
        if (text === 1) {
          return <Tag color="purple">注射</Tag>;
        } else if (text === 2) {
          return <Tag color="geekblue">口服</Tag>;
        } 
      },
    },
    {
      title: '使用说明书',
      dataIndex: 'drugComponents', // 修改 dataIndex 为 'drug_components'
      key: 'drugComponents',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
          查看说明书
        </a>
      ),
    },
    {
      title: '存量',
      dataIndex: 'drugNumber',
      key: 'drugNumber',
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{EditClick(data)}}/>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined 
              onClick={()=>{DeleteClick(data)}}
              />
              }
            />
          </Space>
        )
      }
    }
  ]


  const [list,setList]=useState('')
  const [pageSum,setPageSum]=useState('')
  const [pageCount,setPageCount]=useState('')
  const [currentPage, setCurrentPage] = useState(1); // 默认页码为1
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const userJudge = useSelector(state => state.user.userInfo.userJudge);
  useEffect(()=>{
    async  function getList(){
        const pageNum=1;
         const res= await getGoodsList(pageNum)

        const res1= await getGoodsPageSum()
        const res2=await getDrugPageSum()
        setPageCount(res2.data)
       
         const transformedData = res.data.map(item => ({
          drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
          drugName: item.drugName,
          drugType: item.drugType,
          drugMode: item.drugMode,
          drugNumber: item.drugNumber,
          drugPicture: item.drugPicture, // 确保图片URL是正确的
          drugComponents: item.drugComponents, // 使用正确的属性名
        }));
        setList(transformedData)
        setPageSum(res1.data)
    }
    getList()
  },[dispatch])

  const onPageChange= async (page)=>{
    setCurrentPage(page); // 更新当前页码
    //获得当前页数
    const res= await getGoodsList(page)
    const transformedData = res.data.map(item => ({
      drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
      drugName: item.drugName,
      drugType: item.drugType,
      drugMode: item.drugMode,
      drugNumber: item.drugNumber,
      drugPicture: item.drugPicture, // 确保图片URL是正确的
      drugComponents: item.drugComponents, // 使用正确的属性名
    }));
    setList(transformedData)
  }

  const EditClick=(data)=>{
      navigate(`/changeGoods/${data.drugId}` )
  }

  const DeleteClick = (data) => {
    console.log('data=' + data.drugId);
    deleteDrugById(data.drugId).then(response => {
      if (response.code === 1) { // 假设服务器返回的code为1表示删除成功
        // 从列表中删除该药品
        const updatedList = list.filter(item => item.drugId !== data.drugId);
        setList(updatedList);
        message.success('删除成功！');
      } else {
        message.error('删除失败：' + response.msg);
      }
    }).catch(error => {
      console.error('删除出错', error);
      message.error('删除出错');
    });
  };
    // 新增数据按钮的点击事件处理函数
    const handleAddData = () => {
      // 这里可以导航到添加数据的页面或者打开一个模态框
      console.log('添加新数据');
      // 如果需要导航到新页面，可以使用 history.push('/add-data-page');
      navigate('/addGoods')
    };
  return (
    <div >
   <Card title={`根据筛选条件共查询到 ${pageSum} 条结果：`} extra={<Button type="primary" onClick={handleAddData } style={{headerFontSize: 20}}>新增数据</Button>}>
        <Table rowKey="drugId" columns={columns} dataSource={list}
           pagination={
            {
                total:12,
                pageSize:pageCount,
                onChange:onPageChange
            }
           }
        />
      </Card>
    </div>
   )
  }
  
  export default Goods