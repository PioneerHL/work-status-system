from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import os
import json
from datetime import datetime

# 初始化Flask应用
app = Flask(__name__, template_folder='../frontend', static_folder='../frontend', static_url_path='')
app.config['SECRET_KEY'] = 'work_status_secret_key'

# 初始化SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# 数据存储路径
DATA_DIR = '../data'
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
STATUS_FILE = os.path.join(DATA_DIR, 'status.json')

# 确保数据目录存在
os.makedirs(DATA_DIR, exist_ok=True)

# 全局状态管理
online_users = {}
user_status = {}

# 加载用户数据
def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        "user1": {"name": "张三", "department": "技术部"},
        "user2": {"name": "李四", "department": "产品部"},
        "user3": {"name": "王五", "department": "设计部"},
        "user4": {"name": "赵六", "department": "市场部"}
    }

# 保存用户数据
def save_users(users):
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(users, f, ensure_ascii=False, indent=2)

# 加载状态数据
def load_status():
    if os.path.exists(STATUS_FILE):
        with open(STATUS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# 保存状态数据
def save_status(status):
    with open(STATUS_FILE, 'w', encoding='utf-8') as f:
        json.dump(status, f, ensure_ascii=False, indent=2)

# 初始化数据
users = load_users()
user_status = load_status()

# 路由
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/users')
def get_users():
    return jsonify(users)

@app.route('/api/status')
def get_status():
    return jsonify(user_status)

# WebSocket事件
@socketio.on('connect')
def handle_connect():
    print('客户端已连接')
    # 发送当前状态
    emit('status_update', user_status)

@socketio.on('disconnect')
def handle_disconnect():
    print('客户端已断开连接')

@socketio.on('update_status')
def handle_update_status(data):
    user_id = data.get('user_id')
    status = data.get('status')
    message = data.get('message', '')
    
    if user_id and status:
        # 更新状态
        user_status[user_id] = {
            'status': status,
            'message': message,
            'timestamp': datetime.now().isoformat()
        }
        
        # 保存到文件
        save_status(user_status)
        
        # 广播更新
        emit('status_update', user_status, broadcast=True)
        print(f'用户 {user_id} 更新状态为: {status}')

@socketio.on('heartbeat')
def handle_heartbeat(data):
    user_id = data.get('user_id')
    if user_id:
        # 更新用户在线状态
        online_users[user_id] = datetime.now().isoformat()
        # 如果用户没有状态，设置为在线
        if user_id not in user_status:
            user_status[user_id] = {
                'status': 'online',
                'message': '在线',
                'timestamp': datetime.now().isoformat()
            }
            save_status(user_status)
            emit('status_update', user_status, broadcast=True)
        print(f'收到用户 {user_id} 的心跳')

if __name__ == '__main__':
    print('工作状态打卡系统启动中...')
    print('访问地址: http://localhost:5000')
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)