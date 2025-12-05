# 工作状态打卡系统

一个实时的工作状态打卡网页应用，支持团队成员查看彼此的工作状态。

## 项目结构

```
work_status_system/
├── backend/           # Flask后端应用
│   ├── app.py         # 主应用文件
│   └── requirements.txt  # 依赖库
├── frontend/          # 前端界面
│   ├── index.html     # 主页面
│   ├── style.css      # 样式文件
│   └── script.js      # JavaScript文件
├── data/              # 数据存储
│   └── status.json    # 状态数据
└── config/            # 配置文件
```

## 功能特点

- ✅ 实时状态更新（WebSocket）
- ✅ 多种工作状态选择（在线、忙碌、离开、离线、午餐、会议）
- ✅ 自定义状态消息
- ✅ 数据持久化存储
- ✅ 响应式设计
- ✅ 心跳机制监控在线状态

## 本地运行

1. 安装依赖：
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. 启动服务器：
   ```bash
   python app.py
   ```

3. 访问地址：http://localhost:5000

## 免费部署选项

### 1. PythonAnywhere

PythonAnywhere是一个免费的Python托管平台，支持Flask应用：

**步骤：**
1. 注册账号：https://www.pythonanywhere.com
2. 创建新的Web应用
3. 选择Flask框架和Python版本
4. 将项目文件上传到服务器
5. 配置WSGI文件指向`backend/wsgi.py`
6. 安装依赖并重启应用

### 2. Vercel

Vercel支持静态网站和API部署：

**步骤：**
1. 注册账号：https://vercel.com
2. 安装Vercel CLI：`npm install -g vercel`
3. 在项目根目录运行：`vercel`
4. 按照提示完成部署

### 3. Render

Render提供免费的Web服务：

**步骤：**
1. 注册账号：https://render.com
2. 创建新的Web Service
3. 连接GitHub仓库（需要先将代码上传到GitHub）
4. 配置构建和启动命令
5. 部署应用

## 技术栈

- **后端**：Python Flask
- **前端**：HTML/CSS/JavaScript
- **实时通信**：Socket.IO
- **数据存储**：JSON文件

## 使用说明

1. 从下拉菜单选择用户
2. 选择工作状态
3. （可选）添加状态消息
4. 点击"更新状态"按钮
5. 查看所有用户的实时状态

## 自定义配置

- 修改`backend/app.py`中的`SECRET_KEY`
- 在`data`目录下的`users.json`中添加/修改用户
- 自定义`frontend/style.css`更改界面样式
