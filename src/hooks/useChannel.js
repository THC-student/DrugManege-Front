//封装获取频道列表的逻辑
import {
    useEffect,
    useState
} from "react"
import {
    getChannelAPI
} from '@/api/article';

function useChannel() {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        //1.封装函数，在函数体中调用接口
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()

    }, [])
    return {
        channelList
    }
}


export {
    useChannel
}