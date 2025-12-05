// 全局变量
let users = {};
let statusData = {};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载默认用户数据
    loadDefaultUsers();
    
    // 加载初始状态
    loadInitialStatus();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 启动自动刷新机制，每2秒刷新一次
    startAutoRefresh();
});

// 加载默认用户数据
function loadDefaultUsers() {
    users = {
        "user1": {"name": "陈浩林", "department": "技术部"},
        "user2": {"name": "季浩洋", "department": "技术部"},
        "user3": {"name": "张彬", "department": "产品部"},
        "user4": {"name": "马宁", "department": "设计部"},
        "user5": {"name": "崔立军", "department": "市场部"},
        "user6": {"name": "谢尚鑫", "department": "运营部"},
        "user7": {"name": "贾明洋", "department": "技术部"},
        "user8": {"name": "赵雨珊", "department": "设计部"}
    };
    populateUserSelect();
    renderStatusGrid();
}

// 加载初始状态
function loadInitialStatus() {
    // 从localStorage加载状态数据，如果没有则使用默认值
    const savedStatus = localStorage.getItem('workStatusData');
    if (savedStatus) {
        statusData = JSON.parse(savedStatus);
    } else {
        // 初始化默认状态
        statusData = {};
        for (const user_id in users) {
            statusData[user_id] = {
                status: 'online',
                message: '',
                timestamp: new Date().toISOString()
            };
        }
        // 保存到localStorage
        localStorage.setItem('workStatusData', JSON.stringify(statusData));
    }
    renderStatusGrid();
    updateLastUpdate();
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
    
    console.log('更新状态:', user_id, status, message);
    
    // 更新本地状态数据
    statusData[user_id] = {
        status: status,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    // 保存到localStorage
    localStorage.setItem('workStatusData', JSON.stringify(statusData));
    
    // 强制更新UI
    console.log('更新前状态数据:', statusData);
    renderStatusGrid();
    updateLastUpdate();
    console.log('更新后UI已刷新');
    
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

// 启动自动刷新机制
function startAutoRefresh() {
    setInterval(function() {
        // 从localStorage重新加载状态数据
        const savedStatus = localStorage.getItem('workStatusData');
        if (savedStatus) {
            statusData = JSON.parse(savedStatus);
            renderStatusGrid();
            updateLastUpdate();
        }
    }, 2000); // 每2秒自动刷新一次
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