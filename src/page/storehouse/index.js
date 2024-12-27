import { Table, Tag, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, SoundTwoTone,PlusCircleOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Menu ,Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import { deleteDrugById, getGoodsList, getGoodsPageSum, newPicture } from '@/api/goods'
import { getToken } from '@/utils'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';
import { deleteStoreById, getAllSampleId, getStoreList, StorePageCount } from '@/api/store'
const Goods = () => {
  const columns = [
    {

        title: '仓库图片',
        dataIndex: 'storePicture',
        key: 'storePicture',
        width: 120,
        render: (src) => {
          return <img src={src || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: '仓库名',
      dataIndex: 'storeName',
      key: 'storeName',
      width: 220
    },
    {
      title: '药品Id',
      dataIndex: 'drugId',
      key: 'drugId',
      width: 220
    },
    {
      title: '药品名',
      dataIndex: 'drugName',
      key: 'drugName',
      width: 220
    },
    {
      title: '仓库地址',
      dataIndex: 'storeAddress',
      key: 'storeAddress',
      width: 300
    },

    {
      title: '存量',
      dataIndex: 'storeNumber',
      key: 'storeNumber',
    },
    {
      title: '操作',
      render: (data) => {
        // 检查userJudge的值，只有当userJudge为1时才渲染按钮
        if (userJudge === 1) {
          return (
            <Space size="middle">
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => EditClick(data)}/>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
                onClick={() => DeleteClick(data)}
              />
              <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => disappearClick(data)} />
            </Space>
          );
        } else {
          // 当userJudge不为1时，可以选择渲染一个占位符或者什么都不渲染
          return null; // 或者返回一个空的jsx元素，例如 <Space size="middle" />
        }
      }
    }
  ]




  const [list,setList]=useState('')
  const [pageSum,setPageSum]=useState('')
  const [currentPage, setCurrentPage] = useState(1); // 默认页码为1
  const [selectedKey, setSelectedKey] = useState('1');
  const [sampleId,setsampleId]=useState('1')
  const [pageCount,setPageCount]=useState('')
    const userJudge = useSelector(state => state.user.userInfo.userJudge);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    async  function getList(){
        const pageNum=1;
        const res= await getAllSampleId()
        const res1=await getStoreList(pageNum,sampleId)
        const res2=await StorePageCount(sampleId)
        setPageCount(res2.data)
        const transformedData = res1.data.map(item => ({
          storeId:item.storeId,
          drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
          drugName: item.drugName,
          storeName: item.storeName,
          storeAddress: item.storeAddress,
          sampleId: item.sampleId,
          storeNumber: item.storeNumber,
          storePicture: item.storePicture, 
        }));
        setList(transformedData)
    }
    getList()
  },[])
  const handleMenuClick = async (e) => {
    setSelectedKey(e.key);
    setsampleId(e.key)
    const pageNum=1;
    const res1=await getStoreList(pageNum,e.key)
    const transformedData = res1.data.map(item => ({
      storeId:item.storeId,
      drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
      drugName: item.drugName,
      storeName: item.storeName,
      storeAddress: item.storeAddress,
      sampleId: item.sampleId,
      storeNumber: item.storeNumber,
      storePicture: item.storePicture, 
    }));
    console.log('transformedData',transformedData);
    setList(transformedData)
  };


  
const levelItems = [
    {
        label: '仓库1',
        key: '1',
    },
    {
        label: '仓库2',
        key: '2',
    },
    {
        label: '仓库3',
        key: '3',
    }
]
const levelMenuProps = {
  items:levelItems,
    onClick: handleMenuClick,
};

  const onPageChange= async (page)=>{

    setCurrentPage(page); // 更新当前页码
    const res1=await getStoreList(page,sampleId)
    const transformedData = res1.data.map(item => ({
      storeId:item.storeId,
      drugId: String(item.drugId), // 确保id是字符串类型，以匹配rowKey="id"
      drugName: item.drugName,
      storeName: item.storeName,
      storeAddress: item.storeAddress,
      sampleId: item.sampleId,
      storeNumber: item.storeNumber,
      storePicture: item.storePicture, 
    }));
    setList(transformedData)
  }

  const EditClick=(data)=>{
    navigate(`/ChangeStores/${data.storeId}` )
  }

  const DeleteClick = (data) => {
    navigate(`/changeGoods/${data.drugId}` )
  };


  const disappearClick =  (data) => {
   deleteStoreById(data.storeId)
    message.success(`删除成功`)
    window.location.reload();
  };


  const changeSample= async (key)=>{
   
  }
  
  return (
    <div>
    <Card title={`当前为仓库${sampleId}`}>
    <Dropdown  menu={levelMenuProps}>
               <Button>
                   <Space>
                       切换仓库
                       <DownOutlined/>
                   </Space>
               </Button>
           </Dropdown>
      <Table rowKey="storeId" columns={columns} dataSource={list}
             pagination={{
               pageSize: 8,
               total: pageCount,
               onChange: onPageChange
             }}/>
    </Card>
  </div>
   )
  }
  
  export default Goods