import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, List, Skeleton, Input,Tag, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './index.scss';
import { reloadSuggest, useGetSuggest, useSetSuggest } from '@/api/user';
import { useDispatch, useSelector } from 'react-redux';
const Suggest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false); // 控制文本框显示隐藏
  const [inputValue, setInputValue] = useState(''); // 绑定输入内容
  const [suggestList,setSuggestList]=useState([])
  const userId = useSelector(state => state.user.userInfo.userId);
  useEffect(()=>{
    async function setInitInfo(){
        const res= await useGetSuggest()
        setSuggestList(res.data)
    }
    setInitInfo()
    return  async () => {
      console.log('Suggest执行完毕');
       await reloadSuggest(suggestList)
    };
  }, []);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const handleInputSubmit = async () => {
    // 在这里处理输入提交的逻辑
    console.log('Submitted value:', inputValue);
    const suggestInfo={
      userId:userId,
      content:inputValue
    }
    const res=await useSetSuggest(suggestInfo)
    console.log('res.data=',res.data);
    setSuggestList([...suggestList, res.data]);
    setShowInput(false); // 隐藏文本框
  };

  return (
    <div>
      <div
        id="scrollableDiv"
        style={{
          height: 1000,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={suggestList.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={suggestList}
            renderItem={(item) => (
              <List.Item key={item.userName}>
                <List.Item.Meta
                  avatar={<Avatar src={item.userHeader} />}
                  title={
                    <Typography>
                      <a href="https://ant.design">{item.userName}</a>
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                      {item.userJudge === 1 ? '管理员' : '用户'}
                      </Tag>
                    </Typography>
                  }
                  description={<div>
                    <strong>Content:</strong> {item.content}<br />
                  </div>}
                />
                <strong>Time:</strong> {item.time}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <Button type="primary" onClick={() => setShowInput(!showInput)} style={{ marginTop: '20px' }}>
  新增反馈
</Button>
      {showInput && (
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter text and press Enter"
          onPressEnter={handleInputSubmit}
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default Suggest;