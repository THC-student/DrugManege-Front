import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, List, Skeleton, Input,Tag, Typography, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './index.scss';
import { reloadSuggest, useGetSuggest, useSetSuggest,deleteSuggestById } from '@/api/user';
import { useDispatch, useSelector } from 'react-redux';
const Suggest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false); // 控制文本框显示隐藏
  const [inputValue, setInputValue] = useState(''); // 绑定输入内容
  const [suggestList, setSuggestList] = useState([]);
  const userId = useSelector(state => state.user.userInfo.userId);
  const userJudge = useSelector(state => state.user.userInfo.userJudge); // 获取当前用户的角色

  function generateRandomId(length = 10) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }

  useEffect(() => {
    async function setInitInfo() {
      const res = await useGetSuggest();
      setSuggestList(res.data);
    }
    setInitInfo();
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
    console.log('Submitted value:', inputValue);
    const msgId = generateRandomId(10); // 生成随机 MsgId
    const suggestInfo = {
      userId: userId,
      msgId: msgId,
      content: inputValue
    };
    const res = await useSetSuggest(suggestInfo);
    setSuggestList([...suggestList, res.data]);
    setInputValue('');
    setShowInput(false); // 隐藏文本框
  };

  const handleClick = async (msgId) => {
    console.log('Clicked on msgId:', msgId);

    try {
      // 调用删除接口
      const res = await deleteSuggestById(msgId);
      message.success("删除成功");

      // 更新 suggestList，移除对应的 msgId
      setSuggestList((prevList) => prevList.filter(item => item.msgId !== msgId));
    } catch (error) {
      console.error('删除错误:', error);
      message.error("删除失败，请稍后再试");
    }
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
              paragraph={{ rows: 1 }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={suggestList}
            renderItem={(item) => (
              <List.Item
                key={item.msgId}
                style={{ padding: '50px 0' }}
                className="item-hover-effect"
              >
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
                  description={
                    <div style={{ fontSize: '25px', fontWeight: 'bold' }}>
                      {item.content}
                      {/* 仅管理员显示删除按钮 */}
                      {userJudge === 1 && (
                        <Button
                          type="primary"
                          onClick={() => handleClick(item.msgId)}
                          style={{ marginLeft: 16 }}
                        >
                          删除用户留言
                        </Button>
                      )}
                    </div>
                  }
                />
                <strong>Time:</strong> {item.time}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <Button
        type="primary"
        onClick={() => setShowInput(!showInput)}
        style={{ marginTop: '20px' }}
      >
        新增反馈
      </Button>
      {showInput && (
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text and press Enter"
          onPressEnter={handleInputSubmit}
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default Suggest;