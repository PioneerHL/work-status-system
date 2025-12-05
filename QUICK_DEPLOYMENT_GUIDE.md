# 快速部署指南：从GitHub到可访问网站

恭喜！您的代码已经在GitHub上了。现在让我帮助您将其部署为可访问的网站。推荐使用PythonAnywhere，这是一个免费的Python Web应用托管平台。

## 步骤1：注册PythonAnywhere账号
1. 访问 https://www.pythonanywhere.com
2. 点击"Pricing"，选择"Beginner"账户（免费）
3. 填写注册信息并完成注册

## 步骤2：从GitHub克隆代码
1. 登录PythonAnywhere
2. 点击顶部导航栏的"Consoles"
3. 点击"Bash"打开终端
4. 在终端中运行：
   ```bash
   git clone https://github.com/PioneerHL/work-status-system.git
   ```
5. 代码将被克隆到您的主目录

## 步骤3：创建虚拟环境和安装依赖
1. 在终端中运行：
   ```bash
   # 创建虚拟环境
   python3 -m venv ~/venvs/work_status
   
   # 激活虚拟环境
   source ~/venvs/work_status/bin/activate
   
   # 安装依赖
   cd ~/work-status-system/backend
   pip install -r requirements.txt
   ```

## 步骤4：创建Web应用
1. 点击顶部导航栏的"Web"
2. 点击"Add a new web app"
3. 点击"Next"
4. 选择"Flask"
5. 选择Python版本（建议3.9或更高）
6. 点击"Next"
7. 在"Path to your Flask application"中输入：
   ```
   /home/your_username/work-status-system/backend/app.py
   ```
   （替换your_username为您的实际用户名）
8. 点击"Next"

## 步骤5：配置Web应用

### 配置WSGI文件
1. 在Web应用页面，找到"WSGI configuration file"
2. 点击文件名（通常是/var/www/your_username_pythonanywhere_com_wsgi.py）
3. 替换文件内容为：
   ```python
   import sys
   import os
   
   # 虚拟环境路径
   activate_this = os.path.expanduser("~/venvs/work_status/bin/activate_this.py")
   with open(activate_this) as file_:
       exec(file_.read(), dict(__file__=activate_this))
   
   # 项目路径
   project_root = os.path.expanduser("~/work-status-system/backend")
   sys.path.insert(0, project_root)
   
   # 导入应用
   from app import app as application
   ```
4. 点击"Save"

### 配置静态文件
1. 在Web应用页面，找到"Static files"部分
2. 添加静态文件映射：
   - URL: `/`
   - Directory: `/home/your_username/work-status-system/frontend`
   - 点击"Save"

### 确保data目录存在
1. 在终端中运行：
   ```bash
   mkdir -p ~/work-status-system/data
   chmod 755 ~/work-status-system/data
   ```

## 步骤6：重启应用并访问
1. 在Web应用页面，点击"Reload your_username.pythonanywhere.com"
2. 等待几秒钟
3. 找到"Web app URL"，点击该链接访问您的网站！

## 成功！

您的工作状态打卡系统现在已经部署完成，任何人都可以通过提供的URL访问它。

## 常见问题

### 网站无法访问？
- 检查WSGI文件路径是否正确
- 检查静态文件映射是否正确
- 查看错误日志：在Web应用页面点击"Error log"

### 状态无法保存？
- 确保data目录已创建且具有正确权限

### 依赖安装失败？
- 确保虚拟环境已激活
- 尝试升级pip：`pip install --upgrade pip`

如果遇到其他问题，请随时咨询！