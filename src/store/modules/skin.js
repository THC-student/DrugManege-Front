import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken } from "@/utils";
// 辅助函数：判断当前时间是否在 8:00 到 18:00 之间
const isTimeInRange = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 8 && currentHour < 18; // 注意：18:00 不包含在范围内
};
const skinStore = createSlice({
    name: "skin",
    initialState: {
        judge: isTimeInRange()
    },
    reducers: {
        setJudge(state, action) {
            state.judge = action.payload;
        }
    }
});

const { setJudge } = skinStore.actions;
const skinReducer = skinStore.reducer;

export { setJudge, skinReducer }; // 命名导出
export default skinStore; // 默认导出（可选）