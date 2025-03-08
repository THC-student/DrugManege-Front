UserEduTester
项目介绍
UserEduTester 是一个基于 React 的前端应用程序，旨在为用户提供一个功能完善的测试平台。该项目集成了多种前端技术和工具，以实现高效开发和优质用户体验。
功能特点
用户认证与授权：支持用户登录、注册和权限管理
数据可视化：使用 ECharts 实现数据的可视化展示
富文本编辑：集成多种富文本编辑器，支持内容创作
路由管理：使用 React Router 进行页面路由管理
状态管理：采用 Redux 和 Zustand 进行应用状态管理
API 请求：通过 Axios 进行网络请求
UI 组件库：使用 Ant Design 提供丰富的 UI 组件
响应式设计：支持多种设备的响应式布局
技术栈
框架：React 18.3.1
状态管理：Redux Toolkit, Zustand
UI 组件：Ant Design, styled-components
富文本编辑：react-quill, @uiw/react-md-editor
数据可视化：ECharts, echarts-for-react
路由：React Router DOM 7.0.2
网络请求：Axios 1.7.9
构建工具：craco, react-scripts
样式：Sass 1.83.0, normalize.css
其他：draft-js, react-infinite-scroll-component, web-vitals
项目运行
安装依赖
bash
复制
npm install
开发服务器
bash
复制
npm start
项目将在 http://localhost:3000 启动开发服务器
构建项目
bash
复制
npm run build
构建后的文件将输出到 build 目录
运行测试
bash
复制
npm test
项目结构
复制
usereducertest/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/       # UI组件
│   ├── pages/            # 页面组件
│   ├── store/            # Redux状态管理
│   ├── utils/            # 工具函数
│   ├── App.js            # 应用入口组件
│   └── index.js          # 项目入口文件
├── package.json          # 项目配置
└── README.md             # 项目说明
依赖项
主要依赖
依赖项	版本	说明
react	^18.3.1	前端框架
react-dom	^18.3.1	React DOM 渲染
@reduxjs/toolkit	^2.5.0	Redux状态管理工具
react-redux	^9.2.0	React与Redux连接
axios	^1.7.9	HTTP请求库
echarts	^5.5.1	数据可视化库
echarts-for-react	^3.0.2	ECharts React封装
antd	^5.22.7	UI组件库
react-router-dom	^7.0.2	路由管理
@uiw/react-md-editor	^4.0.5	Markdown编辑器
react-quill	^2.0.0-beta.2	富文本编辑器
styled-components	^6.1.15	CSS-in-JS样式库
开发依赖
依赖项	版本	说明
@craco/craco	^7.1.0	Craco配置
sass	^1.83.0	Sass支持
项目代理
项目配置了代理，指向 http://localhost:8080，用于开发时的API请求转发。
许可证
本项目采用 MIT 许可证，欢迎自由使用和修改。

后端地址为：https://github.com/THC-student/Drugmanage-BackEnd
