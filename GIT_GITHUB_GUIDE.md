# Git安装与GitHub发布指南

## 一、Git安装（Windows）

### 步骤1：下载Git安装包

访问Git官网下载页面：
https://git-scm.com/download/windows

网站会自动检测您的系统类型（32位或64位）并提供相应的下载链接。

### 步骤2：安装Git

1. 双击下载的安装程序（通常是 `.exe` 文件）
2. 选择安装语言（建议选择中文）
3. 点击「下一步」，保持默认安装路径即可
4. 在「选择组件」页面，保持默认选项（所有选项都勾选）
5. 在「选择开始菜单文件夹」页面，保持默认
6. 在「选择Git默认编辑器」页面，建议选择「Vim」或您熟悉的编辑器
7. 在「调整Git新仓库的默认分支名称」页面，保持默认（main）
8. 在「调整环境变量」页面，选择「Git Bash Here和Git GUI Here」
9. 在「选择HTTPS传输后端」页面，保持默认（OpenSSL）
10. 在「配置行尾符号转换」页面，保持默认（Checkout Windows-style, commit Unix-style line endings）
11. 在「配置终端模拟器」页面，选择「Use Windows' default console window」
12. 在「配置额外选项」页面，保持默认选项
13. 点击「安装」按钮，等待安装完成
14. 安装完成后，点击「完成」

### 步骤3：验证Git安装

1. 按下 `Win + R` 组合键，打开「运行」对话框
2. 输入 `cmd`，点击「确定」
3. 在命令提示符中输入：
   ```bash
   git --version
   ```
4. 如果看到Git版本信息，说明安装成功

## 二、Git配置

### 步骤1：设置用户名和邮箱

在命令提示符中输入以下命令（替换为您的GitHub用户名和邮箱）：

```bash
git config --global user.name "your_github_username"
git config --global user.email "your_email@example.com"
```

### 步骤2：生成SSH密钥（可选，但推荐）

1. 在命令提示符中输入：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
2. 按回车键接受默认保存路径
3. 按回车键两次跳过设置密码
4. 查看生成的公钥：
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
5. 复制输出的公钥内容

### 步骤3：添加SSH密钥到GitHub

1. 登录GitHub：https://github.com/
2. 点击右上角的头像 →「Settings」
3. 点击左侧菜单的「SSH and GPG keys」
4. 点击「New SSH key」
5. 在「Title」字段输入一个描述性名称
6. 在「Key」字段粘贴您复制的公钥
7. 点击「Add SSH key」

## 三、在GitHub上创建仓库

### 步骤1：创建新仓库

1. 登录GitHub
2. 点击右上角的「+」→「New repository」
3. 在「Repository name」字段输入仓库名称（建议使用 `work-status-system`）
4. 选择仓库可见性（建议选择「Public」）
5. 点击「Create repository」

### 步骤2：获取仓库URL

创建成功后，您会看到仓库页面，复制仓库的SSH URL（类似 `git@github.com:your_username/work-status-system.git`）

## 四、将本地项目推送到GitHub

### 步骤1：初始化本地仓库

1. 打开命令提示符
2. 进入项目根目录：
   ```bash
   cd c:\Users\haoli\Desktop\v\v\work_status_system
   ```
3. 初始化Git仓库：
   ```bash
   git init
   ```

### 步骤2：添加文件到暂存区

```bash
git add .
```

### 步骤3：提交更改

```bash
git commit -m "Initial commit: 工作状态打卡系统"
```

### 步骤4：关联远程仓库

```bash
git remote add origin git@github.com:your_username/work-status-system.git
```

（将URL替换为您从GitHub复制的SSH URL）

### 步骤5：推送代码到GitHub

```bash
git push -u origin main
```

## 五、部署到免费服务器

推送代码到GitHub后，您可以使用以下免费服务部署网站：

### 选项1：Vercel

1. 访问Vercel官网：https://vercel.com/
2. 登录并点击「New Project」
3. 选择「Import Git Repository」
4. 选择您的GitHub仓库
5. 点击「Import」
6. 保持默认配置，点击「Deploy」
7. 部署完成后，您将获得一个公开URL

### 选项2：Render

1. 访问Render官网：https://render.com/
2. 登录并点击「New」→「Web Service」
3. 选择「Connect a Repository」
4. 选择您的GitHub仓库
5. 配置构建命令：
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `python backend/app.py`
6. 点击「Create Web Service」
7. 部署完成后，您将获得一个公开URL

### 选项3：PythonAnywhere

参考 `DEPLOYMENT_GUIDE.md` 中的详细步骤，使用GitHub仓库作为代码源。

## 六、常见问题

### 1. Git命令无法识别

- 检查Git是否正确安装
- 重启命令提示符或计算机
- 确认Git的安装路径已添加到系统环境变量

### 2. 推送失败（Permission denied）

- 检查SSH密钥是否正确配置
- 确认GitHub账号是否有仓库的推送权限

### 3. 中文乱码

在Git Bash中运行：
```bash
git config --global core.quotepath false
export LANG="zh_CN.UTF-8"
export LC_ALL="zh_CN.UTF-8"
```

## 七、后续操作

每次修改代码后，您可以使用以下命令更新GitHub仓库：

```bash
git add .
git commit -m "描述您的修改"
git push
```

祝您发布成功！