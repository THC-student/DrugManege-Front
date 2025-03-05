import { Table, Tag, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, SoundTwoTone } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Input } from 'antd'
import { useEffect, useState } from 'react'
import { deleteDrugById, getDrugByName, getDrugPageSum, getGoodsList, getGoodsPageSum, newPicture } from '@/api/goods'
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
      width: 200,
      render: (src) => {
        return <img src={src || img404} width={100} height={70} alt="" style={{ fontSize: '16px' }} />;
      },
    },
    {
      title: '药品名',
      dataIndex: 'drugName',
      key: 'drugName',
      width: 220,
      style: { fontSize: '18px' } // 设置列标题字体大小
    },
    {
      title: '类型',
      dataIndex: 'drugType',
      key: 'drugType',
      render: (text) => {
        if (text === 0) {
          return <Tag color="green" style={{ fontSize: '16px' }}>处方药</Tag>;
        } else if (text === 1) {
          return <Tag color="#f50" style={{ fontSize: '16px' }}>非处方药</Tag>;
        } else if (text === 2) {
          return <Tag color="#2db7f5" style={{ fontSize: '16px' }}>精神类药</Tag>;
        } else if (text === 3) {
          return <Tag color="#87d068" style={{ fontSize: '16px' }}>麻醉药</Tag>;
        }
      },
    },
    {
      title: '服用类型',
      dataIndex: 'drugMode',
      render: (text) => {
        if (text === 1) {
          return <Tag color="purple" style={{ fontSize: '16px' }}>注射</Tag>;
        } else if (text === 2) {
          return <Tag color="geekblue" style={{ fontSize: '16px' }}>口服</Tag>;
        }
      },
    },
    {
      title: '使用说明书',
      dataIndex: 'drugComponents',
      key: 'drugComponents',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', fontSize: '16px' }}>
          点击查看说明书
        </a>
      ),
    },
    {
      title: '存量',
      dataIndex: 'drugNumber',
      key: 'drugNumber',
      style: { fontSize: '30px' } // 设置列标题字体大小
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ fontSize: '16px' }} onClick={()=>{EditClick(data)}} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={()=>{DeleteClick(data)}}
              style={{ fontSize: '16px' }}
            />
          </Space>
        )
      }
    }
  ]

  const { Search } = Input;
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

    
    const onSearch = async (drugName, _e, info) =>{
        const res= await getDrugByName(drugName)
       
       const transformedData = res.data.drugList.map(item => ({
        drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
        drugName: item.drugName,
        drugType: item.drugType,
        drugMode: item.drugMode,
        drugNumber: item.drugNumber,
        drugPicture: item.drugPicture, // 确保图片URL是正确的
        drugComponents: item.drugComponents, // 使用正确的属性名
      }));
      setPageCount(res.data.number)
      setList(transformedData)
    } 
  
    return (
      <div>
        <Card>
          <Space style={{ marginBottom: '16px' }}>
            <Button type="primary" onClick={handleAddData} style={{ fontSize: '16px' }}>新增数据</Button>
            <Search
              placeholder="输入药品名"
              onSearch={onSearch}
              style={{ width: 200, marginLeft: '24px' }}
            />
          </Space>
          <Table
            rowKey="drugId"
            columns={columns}
            dataSource={list}
            pagination={{
              pageSize: 8,
              total: pageCount,
              onChange: onPageChange,
              showTotal: (total, rangeInfo) => (
                <span style={{ fontSize: '20px' }}>共查询到 {total} 条结果</span>
              ),
            }}
          />
        </Card>
      </div>
    )
  }
  export default Goods