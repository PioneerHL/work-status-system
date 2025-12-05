// 全局变量
let socket;
let users = {};
let statusData = {};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载用户数据
    loadUsers();
    
    // 加载初始状态
    loadInitialStatus();
    
    // 初始化WebSocket连接
    initWebSocket();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 启动心跳机制
    startHeartbeat();
});

// 加载用户数据
function loadUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            users = data;
            populateUserSelect();
            renderStatusGrid();
        })
        .catch(error => {
            console.error('加载用户数据失败:', error);
            // 使用默认用户数据
            users = {
                "user1": {"name": "张三", "department": "技术部"},
                "user2": {"name": "李四", "department": "产品部"},
                "user3": {"name": "王五", "department": "设计部"},
                "user4": {"name": "赵六", "department": "市场部"}
            };
            populateUserSelect();
            renderStatusGrid();
        });
}

// 加载初始状态
function loadInitialStatus() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            statusData = data;
            renderStatusGrid();
            updateLastUpdate();
        })
        .catch(error => {
            console.error('加载初始状态失败:', error);
        });
}

// 初始化WebSocket连接
function initWebSocket() {
    // 连接到SocketIO服务器
    socket = io();
    
    // 连接事件
    socket.on('connect', function() {
        console.log('已连接到服务器');
    });
    
    // 断开连接事件
    socket.on('disconnect', function() {
        console.log('与服务器断开连接');
    });
    
    // 状态更新事件
    socket.on('status_update', function(data) {
        statusData = data;
        renderStatusGrid();
        updateLastUpdate();
    });
    
    // 连接错误事件
    socket.on('connect_error', function(error) {
        console.error('WebSocket连接错误:', error);
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 更新状态按钮
    const updateBtn = document.getElementById('update-btn');
    updateBtn.addEventListener('click', function() {
        updateStatus();
    });
    
    // 回车键更新状态
    const statusMessage = document.getElementById('status-message');
    statusMessage.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateStatus();
        }
    });
}

// 更新状态
function updateStatus() {
    const userSelect = document.getElementById('user-select');
    const statusSelect = document.getElementById('status-select');
    const statusMessage = document.getElementById('status-message');
    
    const user_id = userSelect.value;
    const status = statusSelect.value;
    const message = statusMessage.value;
    
    if (!user_id || !status) {
        alert('请选择用户和状态');
        return;
    }
    
    // 发送状态更新
    socket.emit('update_status', {
        user_id: user_id,
        status: status,
        message: message
    });
    
    // 清空消息输入框
    statusMessage.value = '';
    
    // 显示成功提示
    showNotification('状态更新成功！', 'success');
}

// 填充用户选择下拉框
function populateUserSelect() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '';
    
    // 添加默认选项
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '请选择用户';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    userSelect.appendChild(defaultOption);
    
    // 添加用户选项
    for (const [user_id, user_info] of Object.entries(users)) {
        const option = document.createElement('option');
        option.value = user_id;
        option.textContent = `${user_info.name} (${user_info.department})`;
        userSelect.appendChild(option);
    }
}

// 渲染状态网格
function renderStatusGrid() {
    const statusGrid = document.getElementById('status-grid');
    statusGrid.innerHTML = '';
    
    // 如果没有用户数据
    if (Object.keys(users).length === 0) {
        statusGrid.innerHTML = '<p class="no-data">暂无用户数据</p>';
        return;
    }
    
    // 创建状态卡片
    for (const [user_id, user_info] of Object.entries(users)) {
        const status = statusData[user_id] || {
            status: 'offline',
            message: '未设置状态',
            timestamp: new Date().toISOString()
        };
        
        const card = createStatusCard(user_id, user_info, status);
        statusGrid.appendChild(card);
    }
}

// 创建状态卡片
function createStatusCard(user_id, user_info, status) {
    const card = document.createElement('div');
    card.className = `status-card ${status.status}`;
    
    // 格式化时间戳
    const timestamp = new Date(status.timestamp);
    const formattedTime = timestamp.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-name">${user_info.name}</div>
            <div class="card-status">${getStatusText(status.status)}</div>
        </div>
        <div class="card-department">${user_info.department}</div>
        <div class="card-message">${status.message || getDefaultMessage(status.status)}</div>
        <div class="card-timestamp">更新于: ${formattedTime}</div>
    `;
    
    return card;
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'online': '在线',
        'busy': '忙碌',
        'away': '离开',
        'offline': '离线',
        'lunch': '午餐',
        'meeting': '会议中'
    };
    return statusMap[status] || status;
}

// 获取默认消息
function getDefaultMessage(status) {
    const messageMap = {
        'online': '在线',
        'busy': '忙碌中，请稍后联系',
        'away': '暂时离开',
        'offline': '离线',
        'lunch': '午餐时间',
        'meeting': '正在开会'
    };
    return messageMap[status] || '';
}

// 启动心跳机制
function startHeartbeat() {
    setInterval(function() {
        const userSelect = document.getElementById('user-select');
        const selectedUserId = userSelect.value;
        
        if (selectedUserId && socket && socket.connected) {
            socket.emit('heartbeat', {
                user_id: selectedUserId
            });
        }
    }, 30000); // 每30秒发送一次心跳
}

// 更新最后更新时间
function updateLastUpdate() {
    const lastUpdateElement = document.getElementById('last-update');
    const now = new Date();
    const formattedTime = now.toLocaleString('zh-CN');
    lastUpdateElement.textContent = `最后更新: ${formattedTime}`;
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 设置样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateX(100%);
    `;
    
    // 根据类型设置背景色
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
    } else {
        notification.style.backgroundColor = '#667eea';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // 动画结束后移除元素
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}