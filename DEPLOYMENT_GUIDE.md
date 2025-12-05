# PythonAnywhere 部署指南

本指南将帮助您将工作状态打卡系统部署到 PythonAnywhere 免费服务器上。

## 准备工作

1. 注册 PythonAnywhere 账号：https://www.pythonanywhere.com
   - 选择 "Beginner" 账户（免费）

2. 下载项目文件：
   - 将 `work_status_system` 文件夹打包为 ZIP 文件

## 步骤 1: 上传项目文件

1. 登录 PythonAnywhere
2. 点击顶部导航栏的 "Files"
3. 在 "Files" 页面，点击 "Upload a file"
4. 选择您的 ZIP 文件并上传
5. 上传完成后，在文件列表中找到 ZIP 文件
6. 点击文件名旁边的 "Unzip"
7. 在弹出的对话框中输入解压路径（例如：`/home/your_username/work_status_system`）
8. 点击 "Unzip"

## 步骤 2: 创建虚拟环境

1. 点击顶部导航栏的 "Consoles"
2. 点击 "Bash" 打开终端
3. 在终端中运行：
   ```bash
   mkdir -p ~/venvs
   python3 -m venv ~/venvs/work_status
   ```

## 步骤 3: 安装依赖

1. 激活虚拟环境：
   ```bash
   source ~/venvs/work_status/bin/activate
   ```

2. 安装依赖：
   ```bash
   cd ~/work_status_system/backend
   pip install -r requirements.txt
   ```

## 步骤 4: 创建 Web 应用

1. 点击顶部导航栏的 "Web"
2. 点击 "Add a new web app"
3. 点击 "Next"
4. 选择 "Flask"
5. 选择 Python 版本（建议 3.9 或更高）
6. 点击 "Next"
7. 在 "Path to your Flask application" 中输入：
   ```
   /home/your_username/work_status_system/backend/app.py
   ```
8. 点击 "Next"

## 步骤 5: 配置 Web 应用

1. 在 Web 应用页面，找到 "Code" 部分
2. 修改 "WSGI configuration file"：
   - 点击文件名（通常是 `/var/www/your_username_pythonanywhere_com_wsgi.py`）
   - 替换文件内容为：
   ```python
   import sys
   import os
   
   # 虚拟环境路径
   activate_this = os.path.expanduser("~/venvs/work_status/bin/activate_this.py")
   with open(activate_this) as file_:
       exec(file_.read(), dict(__file__=activate_this))
   
   # 项目路径
   project_root = os.path.expanduser("~/work_status_system/backend")
   sys.path.insert(0, project_root)
   
   # 导入应用
   from app import app as application
   ```
   - 点击 "Save"

3. 找到 "Static files" 部分
4. 添加静态文件映射：
   - URL：`/`
   - Directory：`/home/your_username/work_status_system/frontend`
   - 点击 "Save"

## 步骤 6: 重启 Web 应用

1. 在 Web 应用页面，点击 "Reload your_username.pythonanywhere.com"
2. 等待几秒钟，应用将重启

## 步骤 7: 访问您的网站

1. 在 Web 应用页面，找到 "Web app URL"
2. 点击该 URL 访问您的网站
3. 分享这个 URL 给其他人，他们就可以在其他电脑上访问了！

## 常见问题

### 1. 依赖安装失败
- 确保虚拟环境已激活
- 尝试升级 pip：`pip install --upgrade pip`

### 2. 网站无法访问
- 检查 WSGI 文件路径是否正确
- 检查静态文件映射是否正确
- 查看错误日志：在 Web 应用页面点击 "Error log"

### 3. 状态无法保存
- 确保 `data` 目录存在且可写：
  ```bash
  mkdir -p ~/work_status_system/data
  chmod 755 ~/work_status_system/data
  ```

## 维护

- 要更新代码：重新上传文件并重启应用
- 要查看日志：在 Web 应用页面点击 "Access log" 或 "Error log"
- 要修改配置：更新相应文件并重启应用

祝您使用愉快！