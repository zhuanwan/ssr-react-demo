# ssr-react-demo

### 简介
该demo是个react ssr demo  
后端渲染react组件并初始化数据，达到快速打开页面效果，也可以单独用客户端渲染。   
关键字：webpack、babel、express、Mock、react、react-dom、react-redux

### 本地运行客户端(spa)
"client:dev": 客户端调试    
浏览器打开：http://localhost:9000/  

### 本地运行服务端(ssr)
"client:build": 需要先打包客户端代码   
"serve:dev": 服务端调试    
浏览器打开：http://localhost:4000/  

### 打包
"client:build": 打包客户端代码 (注意顺序，先打包客户端代码，再打包服务端代码)  
"serve:build": 打包服务端代码    

### 调试打包后的代码
"serve:client:run": 本地运行服务端和客户端代码打包后的代码  


### Warning: useLayoutEffect does nothing on the server
antd Downgrading to 4.15.6 fixs the problem.