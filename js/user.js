console.log('脚本加载时的 token:', localStorage.getItem('token'));
// API基础配置
const API_BASE_URL = "http://8.134.154.79:8088/meal/user";

// DOM元素
const saveBtn = document.querySelector('.btn-primary');
const cancelBtn = document.querySelector('.btn-secondary');
const avatarUpload = document.querySelector('.upload-avatar');
const fileInput = document.querySelector('.file-input');
const formControls = document.querySelectorAll('.form-control');

// 初始化用户数据
async function initUserData() {
    const token = localStorage.getItem('token');
    console.log('[init] 当前token:', token);

    if (!token) {
        alert('请先登录');
        window.location.href = 'login.html';
        return;
    }
    try {
        console.log('[init] 正在获取用户信息...');
        const response = await fetch(`${API_BASE_URL}/getUserInfo`, {
            method: 'GET',
            headers: {
                "token": token,
                "Accept": "application/json",
                "Cache-Control": "no-cache", // 确保不获取缓存数据
                "Pragma": "no-cache"
            }
        });

        if (!response.ok) {
            throw new Error('获取用户信息失败');
        }
        console.log('[init] 响应状态:', response.status);
        const result = await response.json();
        console.log('[init] API响应:', result);

        console.log('API响应数据:', JSON.stringify(result, null, 2));
        if (result.code === 200) {
            if (!result.data) {
                throw new Error('用户数据为空');
            }
            fillUserData(result.data);
        } else {
            alert(result.msg || '获取用户信息失败');
        }

        // 检查401未授权状态
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

    } catch (error) {
        console.error("初始化用户数据失败:", error);
        if (error.message.includes('401')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        } else {
            alert(error.message || '获取用户信息失败');
        }
    }
}

// 填充用户数据到表单
function fillUserData(userData) {
    console.log('[fill] 正在填充数据:', userData);

    // 确保userData是对象
    if (typeof userData !== 'object' || userData === null) {
        console.error('[fill] 无效的用户数据:', userData);
        return;
    }

   // 1. 更新侧边栏信息
    updateElementText('.user-info .user-name', userData.userName);
    updateElementText('.user-id', `ID: ${userData.userId || ''}`);

    // 2. 更新表单数据
    updateInputValue('input[name="userName"]', userData.userName);
    updateInputValue('input[name="phone"]', userData.phone);
    updateInputValue('input[placeholder="请输入你的邮箱"]', userData.email);
    updateInputValue('input[name="birthday"]', userData.birthday);
    updateInputValue('input[name="introduction"]', userData.introduction);

    // 3. 更新性别选择
    const genderSelect = document.querySelector('select[name="gender"]');
    if (genderSelect) {
        genderSelect.value = userData.gender === '男' ? 'male' : 
                           (userData.gender === '女' ? 'female' : '');
    }

    // 4. 更新头部用户信息（关键修改2：新增这部分）
    updateElementText('.user span', userData.userName);
    if (userData.avatar) {
        document.querySelectorAll('.user-avatar img, .user img').forEach(img => {
            img.src = userData.avatar;
        });
    }

    console.log('[fill] 数据填充完成');
}

// 更新文本内容
function updateElementText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text || '';
}

// 更新输入框值
function updateInputValue(selector, value) {
    const input = document.querySelector(selector);
    if (input) input.value = value || '';
}

// 保存用户信息
async function saveUserInfo() {
    const token = localStorage.getItem('token');
    const userInfo = {
        userName: document.querySelector('input[name="userName"]')?.value.trim() || '', // 必填
        gender: document.querySelector('select[name="gender"]')?.value === 'male' ? '男' : 
               (document.querySelector('select[name="gender"]')?.value === 'female' ? '女' : null),
        phone: document.querySelector('input[name="phone"]')?.value.trim() || null,   // 允许null
        birthday: document.querySelector('input[name="birthday"]')?.value || null,    // 允许null
        introduction: document.querySelector('input[name="introduction"]')?.value.trim() || null
    };

    // 必填字段验证
    if (!userInfo.userName) {
        alert('用户名不能为空');
        return;
    }

    // 手机号验证
    if (userInfo.phone && !/^1[3-9]\d{9}$/.test(userInfo.phone)) {
        alert('手机号格式不正确');
        return;
    }

    // 简介长度验证
    if (userInfo.introduction && userInfo.introduction.length > 300) {
        alert('个人简介不能超过300字');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/userInfoComplete`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "token": token,
                "Accept": "application/json"
            },
             body: JSON.stringify({ data: userInfo })
        });

        const result = await response.json();
        
         if (result.code === 200) {
                const avatarUrl = result.data?.avatarUrl;
                if (avatarUrl) {
                    document.querySelectorAll('.user-avatar img, .user img').forEach(img => {
                        img.src = `${avatarUrl}?t=${Date.now()}`;
                    });
                }
                alert(result.msg || '头像上传成功');
            } else {
                alert(result.msg || '头像上传失败');
            }
    } catch (error) {
        console.error("头像上传失败:", error);
        alert('头像上传失败，请重试');
    }
}

// 头像上传处理
function handleAvatarUpload() {
    const token = localStorage.getItem('token');
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 验证文件类型和大小
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('图片大小不能超过2MB');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);  // 注意参数名是files不是avatar

        try {
            // 第一步：上传图片到COS获取URL
            console.log('正在上传图片到COS...');
            const uploadResponse = await fetch('https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/user/uploadImg', {
                method: 'POST',
                headers: {
                    "token": token
                },
                body: formData
            });

            const uploadResult = await uploadResponse.json();
            console.log('COS上传结果:', uploadResult);

            if (!uploadResponse.ok || !uploadResult.data || !uploadResult.data.url) {
                throw new Error(uploadResult.msg || '图片上传失败');
            }

            const imageUrl = uploadResult.data.url;
            console.log('获取到的图片URL:', imageUrl);

            // 第二步：将图片URL传给修改头像接口
            console.log('正在更新头像URL...');
            const avatarResponse = await fetch(`${API_BASE_URL}/avatarModify`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({
                    avatarUrl: imageUrl
                })
            });

            const avatarResult = await avatarResponse.json();
            console.log('头像更新结果:', avatarResult);

            if (avatarResponse.ok && avatarResult.code === 200) {
                // 更新头像显示
                const timestamp = Date.now();
                document.querySelectorAll('.user-avatar img, .user img').forEach(img => {
                    img.src = `${imageUrl}?t=${timestamp}`; // 添加时间戳防止缓存
                });
                alert('头像更新成功');
            } else {
                throw new Error(avatarResult.msg || '头像更新失败');
            }
        } catch (error) {
            console.error("头像上传失败:", error);
            alert(error.message || '头像上传失败，请重试');
        } finally {
            // 重置文件输入，允许重复选择同一文件
            fileInput.value = '';
        }
    });
}

// 退出登录
function setupLogout() {
    document.querySelector('.btn-danger').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/exit`, {
                method: 'POST',
                headers: {
                    "token": token,
                    "Accept": "application/json"
                }
            });

            const result = await response.json();
            
            if (response.ok && result.code === 200) {
                // 清除本地存储并跳转到登录页
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
                alert(result.msg || '退出登录成功');
                window.location.href = 'login.html';
            } else {
                alert(result.msg || '退出登录失败');
            }
        } catch (error) {
            console.error("退出登录失败:", error);
            // 即使API调用失败也清除本地token并跳转
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initUserData();
    handleAvatarUpload();
    setupLogout();

    // 保存按钮事件
    saveBtn.addEventListener('click', saveUserInfo);
    
    // 取消按钮事件
    cancelBtn.addEventListener('click', () => {
        initUserData(); // 重新加载原始数据
    });
});