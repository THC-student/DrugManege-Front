import { Table, Tag, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, SoundTwoTone,PlusCircleOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Menu ,Dropdown,Input } from 'antd'
import { useEffect, useState } from 'react'
import { deleteDrugById, getGoodsList, getGoodsPageSum, newPicture } from '@/api/goods'
import { getToken } from '@/utils'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';
import { deleteStoreById, getAllSampleId, getStoreList, storePageByDrugId, StorePageCount } from '@/api/store'
import './index.scss'
const Goods = () => {
  const columns = [
    {
      title: '仓库图片',
      dataIndex: 'storePicture',
      key: 'storePicture',
      width: 200,
      render: (src) => {
        return <img src={src || img404} width={100} height={65} alt="" className="medium-font" />;
      },
    },
    {
      title: '仓库名',
      dataIndex: 'storeName',
      key: 'storeName',
      width: 300,
      className: 'large-font'
    },
    {
      title: '药品Id',
      dataIndex: 'drugId',
      key: 'drugId',
      width: 220,
      className: 'large-font'
    },
    {
      title: '药品名',
      dataIndex: 'drugName',
      key: 'drugName',
      width: 220,
      className: 'large-font'
    },
    {
      title: '仓库地址',
      dataIndex: 'storeAddress',
      key: 'storeAddress',
      width: 400,
      className: 'large-font'
    },
    {
      title: '存量',
      dataIndex: 'storeNumber',
      key: 'storeNumber',
      className: 'large-font'
    },
    {
      title: '操作',
      render: (data) => {
        if (userJudge === 1) {
          return (
            <Space size="middle">
              <Button type="primary" shape="circle" icon={<EditOutlined />} className="medium-font" onClick={() => EditClick(data)}/>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
                className="medium-font"
                onClick={() => DeleteClick(data)}
              />
              <Button danger shape="circle" icon={<DeleteOutlined />} className="medium-font" onClick={() => disappearClick(data)} />
            </Space>
          );
        } else {
          return null;
        }
      }
    }
  ];

  const { Search } = Input;
  const [list,setList]=useState('')
  const [pageSum,setPageSum]=useState('')
  const [currentPage, setCurrentPage] = useState(1); // 默认页码为1
  const [selectedKey, setSelectedKey] = useState('1');
  const [sampleId,setsampleId]=useState('1')
  const [pageCount,setPageCount]=useState('')
  const [showInput, setShowInput] = useState(false); // 控制输入框显示的状态
  const [inputValue, setInputValue] = useState(''); // 输入框的值
  const userJudge = useSelector(state => state.user.userInfo.userJudge);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onSearch = async (drugId, _e, info) =>{
     const res=await storePageByDrugId(1,sampleId,drugId)
     console.log('res=',res);
     setPageCount(1)
     const transformedData = res.data.map(item => ({
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
   // 处理按钮点击事件
   const handleShowInput = () => {
    setIsInputVisible(true);
  };

  // 处理输入框值变化的事件
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 处理回车键事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('输入框内容：', inputValue);
      // 这里可以添加更多的逻辑，比如发送数据到服务器等
      // ...
      // 隐藏输入框
      setIsInputVisible(false);
    }
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

const levelMenu = (
  <Menu onClick={handleMenuClick}>
    {levelItems.map(item => (
      <Menu.Item key={item.key}>
        {item.label}
      </Menu.Item>
    ))}
  </Menu>
);


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
  return (
    <div>
      <Card title={`当前为仓库${sampleId}`}>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown overlay={levelMenu} placement="bottomRight">
            <Button>
              <Space>
                切换仓库
                <DownOutlined/>
              </Space>
            </Button>
          </Dropdown>
          <Search
            placeholder="输入药品Id查询药品"
            onSearch={onSearch}
            enterButton
            style={{ marginLeft: '8px' }} // 可根据需要调整搜索框与切换仓库按钮之间的间距
          />
        </Space>
        <Table rowKey="storeId" columns={columns} dataSource={list}
               pagination={{
                 pageSize: 8,
                 total: pageCount,
                 onChange: onPageChange,
                 showTotal: (total, rangeInfo) => (
                   <span style={{ fontSize: '20px' }}>共查询到 {total} 条结果</span>
                 )
               }} />
      </Card>
    </div>
  );
  
  }
  
  export default Goods