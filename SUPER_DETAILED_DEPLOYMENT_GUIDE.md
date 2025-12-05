# 工作状态打卡系统 - 超级详细发布指南

## 前言

本指南将带您完成从Git安装到网站上线的全过程，每一步都配有详细说明和操作截图（文字描述）。请按照步骤一步步执行。

## 第一部分：Git安装与配置

### 步骤1：下载Git安装包

1. 打开浏览器，访问Git官网：https://git-scm.com/
2. 点击右上角的「Downloads」按钮
3. 网站会自动检测您的Windows版本（32位或64位）并开始下载

**截图说明**：
- Git官网首页顶部有明显的「Downloads」按钮
- 下载开始后，浏览器底部会显示下载进度

### 步骤2：安装Git（详细步骤）

1. **双击安装程序**
   - 找到下载的Git安装包（通常在「下载」文件夹中，文件名类似 `Git-2.45.1-64-bit.exe`）
   - 双击安装包开始安装

2. **选择安装语言**
   - 安装程序启动后，会弹出语言选择窗口
   - 选择「中文(简体)」，点击「确定」

3. **欢迎界面**
   - 点击「下一步」

4. **选择安装路径**
   - 保持默认安装路径（通常是 `C:\Program Files\Git`）
   - 点击「下一步」

5. **选择组件**
   - 保持所有选项都勾选（默认配置即可）
   - 选项包括：Git Bash Here、Git GUI Here、桌面图标等
   - 点击「下一步」

6. **选择开始菜单文件夹**
   - 保持默认名称「Git」
   - 点击「下一步」

7. **选择Git默认编辑器**
   - 建议选择「Vim」（默认选项）
   - 点击「下一步」

8. **调整Git新仓库的默认分支名称**
   - 保持默认选项「main」
   - 点击「下一步」

9. **调整环境变量**
   - 选择「Git Bash Here和Git GUI Here」（第一个选项）
   - 点击「下一步」

10. **选择HTTPS传输后端**
    - 保持默认选项「Use the OpenSSL library」
    - 点击「下一步」

11. **配置行尾符号转换**
    - 保持默认选项「Checkout Windows-style, commit Unix-style line endings」
    - 点击「下一步」

12. **配置终端模拟器**
    - 选择「Use Windows' default console window」
    - 点击「下一步」

13. **配置额外选项**
    - 保持所有选项都勾选（默认配置）
    - 点击「下一步」

14. **开始安装**
    - 点击「安装」按钮
    - 等待安装进度条完成

15. **安装完成**
    - 点击「完成」按钮

### 步骤3：验证Git安装

1. 按下 `Win + R` 组合键，打开「运行」对话框
2. 输入 `cmd`，点击「确定」，打开命令提示符
3. 在命令提示符中输入：
   ```bash
   git --version
   ```
4. 按下回车键
5. 如果看到类似 `git version 2.45.1.windows.1` 的输出，说明Git安装成功

**截图说明**：
- 命令提示符中会显示Git的版本信息

### 步骤4：配置Git用户名和邮箱

1. 在命令提示符中输入以下命令（替换为您的GitHub用户名）：
   ```bash
   git config --global user.name "your_github_username"
   ```
   （例如：`git config --global user.name "zhangsan"`）

2. 按下回车键

3. 输入以下命令（替换为您的GitHub注册邮箱）：
   ```bash
   git config --global user.email "your_email@example.com"
   ```
   （例如：`git config --global user.email "zhangsan@example.com"`）

4. 按下回车键

5. 验证配置是否成功：
   ```bash
   git config --list
   ```
6. 按下回车键，您应该能看到刚刚设置的用户名和邮箱

**截图说明**：
- 命令执行后没有错误提示，说明配置成功
- `git config --list` 会显示所有Git配置信息

## 第二部分：GitHub仓库创建

### 步骤1：登录GitHub

1. 打开浏览器，访问GitHub官网：https://github.com/
2. 点击右上角的「Sign in」按钮
3. 输入您的GitHub用户名/邮箱和密码，点击「Sign in」

**截图说明**：
- GitHub登录页面有明显的用户名、密码输入框和登录按钮

### 步骤2：创建新仓库

1. 登录成功后，点击右上角的「+」图标
2. 在下拉菜单中选择「New repository」

3. **填写仓库信息**：
   - **Repository name**：输入仓库名称，建议使用 `work-status-system`
   - **Description**：（可选）输入仓库描述，如「工作状态打卡系统 - 实时团队状态管理工具」
   - **Visibility**：选择「Public」（公开仓库，免费）
   - **Initialize this repository with**：不要勾选任何选项（保持空仓库）

4. 点击页面底部的「Create repository」按钮

**截图说明**：
- 仓库创建页面包含名称、描述、可见性等选项
- 点击「Create repository」后，页面会跳转到新创建的仓库页面

### 步骤3：获取仓库SSH URL

1. 在新创建的仓库页面中，点击绿色的「Code」按钮
2. 选择「SSH」选项卡
3. 点击「复制」图标，复制仓库的SSH URL

**截图说明**：
- SSH URL格式类似：`git@github.com:your_username/work-status-system.git`
- 复制按钮点击后会显示「Copied」提示

## 第三部分：本地代码提交

### 步骤1：打开Git Bash

1. 找到您的项目文件夹：`c:\Users\haoli\Desktop\v\v\work_status_system`
2. 在该文件夹上点击右键
3. 在右键菜单中选择「Git Bash Here」

**截图说明**：
- 右键菜单中会有「Git Bash Here」选项
- 点击后会打开Git Bash终端窗口

### 步骤2：初始化本地Git仓库

1. 在Git Bash终端中，输入以下命令：
   ```bash
   git init
   ```
2. 按下回车键
3. 您会看到类似 `Initialized empty Git repository in .../.git/` 的提示

**截图说明**：
- 命令执行后，项目文件夹中会创建一个隐藏的 `.git` 文件夹

### 步骤3：检查Git状态

1. 输入以下命令：
   ```bash
   git status
   ```
2. 按下回车键
3. 您会看到所有未跟踪的文件列表

**截图说明**：
- 红色文字显示的是未跟踪的文件

### 步骤4：添加所有文件到暂存区

1. 输入以下命令：
   ```bash
   git add .
   ```
2. 按下回车键

**截图说明**：
- 该命令没有输出，表示执行成功

### 步骤5：再次检查Git状态

1. 输入以下命令：
   ```bash
   git status
   ```
2. 按下回车键
3. 您会看到所有文件现在都变成了绿色，表示已添加到暂存区

**截图说明**：
- 绿色文字显示的是已暂存的文件

### 步骤6：提交代码

1. 输入以下命令：
   ```bash
   git commit -m "Initial commit: 工作状态打卡系统完整代码"
   ```
2. 按下回车键
3. 您会看到提交信息和文件统计

**截图说明**：
- 命令执行后会显示提交哈希值和更改的文件数

### 步骤7：关联远程GitHub仓库

1. 输入以下命令（替换为您从GitHub复制的SSH URL）：
   ```bash
   git remote add origin git@github.com:your_username/work-status-system.git
   ```
2. 按下回车键

**截图说明**：
- 该命令没有输出，表示执行成功

### 步骤8：推送代码到GitHub

1. 输入以下命令：
   ```bash
   git push -u origin main
   ```
2. 按下回车键

3. **首次推送时的SSH密钥确认**：
   - 如果是首次使用SSH，会弹出「SSH密钥确认」窗口
   - 点击「是」按钮确认

**截图说明**：
- 推送过程会显示文件传输进度
- 推送完成后会显示「100%」和成功提示

### 步骤9：验证GitHub仓库

1. 打开浏览器，回到您的GitHub仓库页面
2. 刷新页面，您应该能看到所有项目文件已经上传到GitHub

**截图说明**：
- GitHub仓库页面会显示所有项目文件和提交信息

## 第四部分：部署到Vercel（推荐）

Vercel是一个免费的前端部署平台，支持从GitHub直接导入项目并自动部署。

### 步骤1：注册/登录Vercel

1. 打开浏览器，访问Vercel官网：https://vercel.com/
2. 点击右上角的「Sign Up」按钮
3. 选择使用「GitHub」登录
4. 按照提示授权Vercel访问您的GitHub账号

**截图说明**：
- Vercel登录页面支持多种登录方式，推荐使用GitHub登录

### 步骤2：导入GitHub仓库

1. 登录成功后，点击页面中央的「New Project」按钮
2. 在「Import Git Repository」部分，点击「GitHub」
3. 您会看到所有GitHub仓库列表，找到并选择 `work-status-system` 仓库
4. 点击「Import」按钮

**截图说明**：
- 仓库列表中会显示仓库名称和描述
- 点击「Import」后会进入项目配置页面

### 步骤3：配置项目

1. **Project Name**：保持默认名称（或自定义）
2. **Framework Preset**：选择「Other」
3. **Root Directory**：保持为空（默认）
4. **Build Command**：保持为空（默认）
5. **Output Directory**：保持为空（默认）

**截图说明**：
- 配置页面包含项目名称、框架选择、构建命令等选项

### 步骤4：部署项目

1. 点击页面底部的「Deploy」按钮
2. Vercel会开始构建和部署您的项目
3. 等待部署完成（通常需要1-2分钟）

**截图说明**：
- 部署过程会显示构建日志和进度条
- 部署完成后会显示「Deployed」提示

### 步骤5：获取网站URL

1. 部署完成后，您会看到「Congratulations!」页面
2. 页面上会显示您的网站URL（类似 `work-status-system.vercel.app`）
3. 点击该URL可以访问您的网站
4. 点击「Go to Dashboard」可以进入项目管理页面

**截图说明**：
- 部署成功页面有明显的网站URL显示
- URL链接可以直接点击访问

## 第五部分：测试网站

1. 打开浏览器，访问您的Vercel网站URL
2. 测试网站功能：
   - 选择用户
   - 更改工作状态
   - 添加状态消息
   - 点击「更新状态」按钮
3. 验证状态是否正确显示

**截图说明**：
- 网站应该能正常加载和使用
- 状态更新应该能实时显示

## 第六部分：后续维护

### 如何更新代码

1. 在本地修改代码
2. 在Git Bash中执行以下命令：
   ```bash
   git add .
   git commit -m "描述您的修改"
   git push
   ```
3. Vercel会自动检测到GitHub仓库的更新，并自动重新部署网站

### 如何查看网站日志

1. 登录Vercel控制台
2. 选择您的项目
3. 点击「Deployments」标签
4. 选择最新的部署记录
5. 点击「Logs」可以查看构建和运行日志

## 常见问题与解决方案

### 问题1：Git命令无法识别

**解决方案**：
- 确保Git已经正确安装
- 重启命令提示符或Git Bash
- 检查系统环境变量是否包含Git的安装路径

### 问题2：SSH密钥认证失败

**解决方案**：
- 检查SSH密钥是否正确配置
- 重新生成SSH密钥并添加到GitHub
- 确保Git仓库URL是SSH格式，不是HTTPS格式

### 问题3：Vercel部署失败

**解决方案**：
- 检查构建日志，查看具体错误信息
- 确保项目文件结构正确
- 尝试重新部署

## 结束语

恭喜您！您的工作状态打卡系统已经成功发布到互联网上。现在，您的团队成员可以通过您的Vercel网站URL访问和使用这个系统了。

如果在发布过程中遇到任何问题，请查看本指南的「常见问题与解决方案」部分，或搜索相关错误信息。