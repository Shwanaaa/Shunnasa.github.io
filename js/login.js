// API基础配置
const API_BASE_URL = "http://8.134.154.79:8088/meal/user";
const DEFAULT_AVATAR = "https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/img/default_avatar.jpg";

// DOM元素
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const formContainer = document.getElementById('formContainer');
const registerSendCodeBtn = document.getElementById('registerSendCodeBtn');

// 状态变量
let registerCountdown = 60;
let registerTimer = null;

// 初始化事件监听
function initEventListeners() {
    //默认激活注册页面
    document.getElementById('registerForm').classList.add('active');
    registerToggle.classList.add('active');

    // 表单切换
    loginToggle.addEventListener('click', () => {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('registerForm').classList.remove('active');

        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    });
    
    registerToggle.addEventListener('click', () => {
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');

        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    });
    
    // 登录表单提交
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    
    // 注册验证码
    registerSendCodeBtn.addEventListener('click', handleSendVerificationCode);
    
    // 注册表单提交
    document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
}

// 工具函数
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// 验证码倒计时
function startRegisterCountdown() {
    clearInterval(registerTimer); // 清除已有计时器
    registerCountdown = 60; // 重置倒计时
    
    registerSendCodeBtn.disabled = true;
    registerSendCodeBtn.textContent = `${registerCountdown}秒后重试`;
    
    registerTimer = setInterval(() => {
        registerCountdown--;
        registerSendCodeBtn.textContent = `${registerCountdown}秒后重试`;
        
        if (registerCountdown <= 0) {
            clearInterval(registerTimer);
            registerSendCodeBtn.disabled = false;
            registerSendCodeBtn.textContent = '获取验证码';
            registerCountdown = 60;
        }
    }, 1000);
}

// 表单验证
function validateForm(fields) {
    let isValid = true;
    
    fields.forEach(field => {
        const { value, errorId, message, validator } = field;
        if (validator ? !validator(value) : !value) {
            showError(errorId, message);
            isValid = false;
        } else {
            hideError(errorId);
        }
    });
    
    return isValid;
}

// API请求处理
async function makeApiRequest(url, method, body) {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
        headers["Authorization"] =token;
    }
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `请求失败: ${response.status}`);
    }
    
    return response.json();
}

// 登录处理
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // 表单验证
    if (!validateForm([
        { value: email, errorId: 'loginEmailError', message: '请输入有效的邮箱地址', validator: validateEmail },
        { value: password, errorId: 'loginPasswordError', message: '请输入密码' }
    ])) return;

    try {
        const result = await makeApiRequest('/login', 'POST', {
            data: { email, password }
        });
        
       if (result.code === 200) {
            // 确保token存在
            if (!result.data?.token) {
                throw new Error('登录成功但未返回token');
            }
            const token = result.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email);
            
            // 跳转到订单页面
            window.location.href = 'order.html';
        } else {
            // 处理特定错误码
            if (result.code === 402) {
                showError('loginPasswordError', result.msg);
            } else {
                alert(result.msg || '登录失败');
            }
        }
    } catch (error) {
        console.error("登录请求失败:", error);
        showError('loginPasswordError', error.message || '登录失败，请重试');
    }
}

// 发送验证码
async function handleSendVerificationCode() {
    const email = document.getElementById('registerEmail').value.trim();
    
    // 验证邮箱格式
    if (!validateForm([
        { value: email, errorId: 'registerEmailError', message: '请输入有效的邮箱地址', validator: validateEmail }
    ])) return;

    try {
        // 显示加载状态
        registerSendCodeBtn.disabled = true;
        registerSendCodeBtn.textContent = '发送中...';
        
        // 验证码接口URL
        const result = await makeApiRequest('/sendRegisterEmailCode', 'POST', {
            data: { email }
        });
        
        if (result.code === 200) {
            // 成功发送验证码
            alert('验证码已发送，请查收');
            startRegisterCountdown();
        } else {
            // 处理特定错误码
            handleVerificationCodeError(result);
        }
    } catch (error) {
        console.error("验证码发送失败:", error);
        
        // 根据错误类型显示不同提示
        if (error.message.includes("操作频繁")) {
            // 提取等待时间（如果有）
            const waitTime = error.message.match(/(\d+)s/)?.[1] || '30';
            showError('registerEmailError', `操作频繁，请${waitTime}秒后重试`);
            
            // 禁用按钮并显示倒计时
            registerSendCodeBtn.disabled = true;
            let countdown = parseInt(waitTime);
            registerSendCodeBtn.textContent = `${countdown}秒后重试`;
            
            const timer = setInterval(() => {
                countdown--;
                registerSendCodeBtn.textContent = `${countdown}秒后重试`;
                if (countdown <= 0) {
                    clearInterval(timer);
                    registerSendCodeBtn.disabled = false;
                    registerSendCodeBtn.textContent = '获取验证码';
                    hideError('registerEmailError');
                }
            }, 1000);
        } else if (error.message.includes("已被绑定")) {
            showError('registerEmailError', error.message);
            registerSendCodeBtn.disabled = false;
            registerSendCodeBtn.textContent = '获取验证码';
        } else {
            alert(error.message || '验证码发送失败，请重试');
            registerSendCodeBtn.disabled = false;
            registerSendCodeBtn.textContent = '获取验证码';
        }
    }
}

// 验证码错误处理专用函数
function handleVerificationCodeError(result) {
    switch (result.code) {
        case 400:
            if (result.msg.includes("操作频繁")) {
                const waitTime = result.msg.match(/(\d+)s/)?.[1] || '30';
                showError('registerEmailError', `操作频繁，请${waitTime}秒后重试`);
                
                // 设置特定时间的禁用状态
                registerSendCodeBtn.disabled = true;
                let countdown = parseInt(waitTime);
                registerSendCodeBtn.textContent = `${countdown}秒后重试`;
                
                const timer = setInterval(() => {
                    countdown--;
                    registerSendCodeBtn.textContent = `${countdown}秒后重试`;
                    if (countdown <= 0) {
                        clearInterval(timer);
                        registerSendCodeBtn.disabled = false;
                        registerSendCodeBtn.textContent = '获取验证码';
                        hideError('registerEmailError');
                    }
                }, 1000);
            } else if (result.msg.includes("已被绑定")) {
                showError('registerEmailError', result.msg);
                registerSendCodeBtn.disabled = false;
                registerSendCodeBtn.textContent = '获取验证码';
            } else {
                alert(result.msg || '验证码发送失败');
                registerSendCodeBtn.disabled = false;
                registerSendCodeBtn.textContent = '获取验证码';
            }
            break;
        default:
            alert(result.msg || '验证码发送失败');
            registerSendCodeBtn.disabled = false;
            registerSendCodeBtn.textContent = '获取验证码';
    }
}

// 注册处理
async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value.trim();
    const verificationCode = document.getElementById('registerVerificationCode').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    // 表单验证
    if (!validateForm([
        { value: email, errorId: 'registerEmailError', message: '请输入有效的邮箱地址', validator: validateEmail },
        { value: verificationCode, errorId: 'registerVerificationCodeError', message: '请输入验证码' },
        { value: password, errorId: 'registerPasswordError', message: '密码至少需要6个字符', validator: val => val.length >= 6 },
        { value: confirmPassword, errorId: 'registerConfirmPasswordError', message: '两次密码输入不一致', validator: val => val === password }
    ])) return;

    try {
        const username = email.split('@')[0]; // 使用邮箱前缀作为用户名
        const result = await makeApiRequest('/register', 'POST', {
            data: {
                userName: username,
                email,
                verificationCode,
                password,
                avatar: DEFAULT_AVATAR
            }
        });
        
        if (result.code === 200) {
            alert(result.msg || "注册成功！");
            document.getElementById('registerFormElement').reset();
            formContainer.classList.remove('register-mode');
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
        } else {
            // 处理特定错误
            handleRegisterError(result);
        }
    } catch (error) {
        console.error("注册请求失败:", error);
        alert(error.message || "网络错误，请检查连接");
    }
}

// 注册错误处理
function handleRegisterError(result) {
    switch (result.code) {
        case 400:
            if (result.msg.includes("已被注册")) {
                showError('registerEmailError', result.msg);
            } else {
                alert(result.msg);
            }
            break;
        case 402:
            // 参数校验错误
            const errorField = result.msg.match(/邮箱/) ? 'registerEmailError' : 
                             result.msg.match(/验证码/) ? 'registerVerificationCodeError' : 
                             result.msg.match(/密码/) ? 'registerPasswordError' : null;
            if (errorField) {
                showError(errorField, result.msg);
            } else {
                alert(result.msg);
            }
            break;
        default:
            alert(result.msg || "注册失败，请重试");
    }
}

// 初始化
initEventListeners();