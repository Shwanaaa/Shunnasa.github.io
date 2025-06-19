// 切换登录/注册表单
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const formContainer = document.getElementById('formContainer');

loginToggle.addEventListener('click', () => {
    formContainer.classList.remove('register-mode');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
    formContainer.classList.add('register-mode');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

// 登录界面
document.getElementById('loginFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
   // 获取并清理输入值
    const username = document.getElementById('loginUsername').value.trim().replace(/\s+/g, '');
    const password = document.getElementById('loginPassword').value.trim().replace(/\s+/g, '');
    
    // 前端基础验证
    if (!username || !password) {
        alert('用户名和密码不能为空！');
        return; // 阻止请求
    }

    // 构造请求体（直接平铺userName和password）
    const requestBody = JSON.stringify({
    data: {
        userName: username,
        password: password
        }
    });
    console.log("发送的请求体:", requestBody); // 调试用

    // 发送登录请求
    fetch("http://8.134.154.79:8088/meal/user/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`网络错误: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log("后端响应:", result);
        switch (result.code) {
            case 200:
                alert(result.msg); // "操作成功"
                localStorage.setItem('token', result.data.token); // 存储token
                window.location.href = 'order.html'; // 跳转
                break;
            case 400:
                alert(result.msg); // "密码错误" 或 "用户未注册"
                break;
            default:
                alert(`未知错误: ${result.msg}`);
        }
    })
    .catch(error => {
        console.error("请求失败:", error);
        alert('网络异常，请检查连接后重试');
    });
});

//注册界面
document.getElementById('registerFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    // 验证用户名不超过20字符
    if (username.length == 0) {
        showError('registerUsernameError', '用户名不能为空');
        isValid = false;
    } else if (username.length > 20) {
        showError('registerUsernameError', '用户名长度不得超过20');
        isValid = false;
    } else {
        hideError('registerUsernameError');
    }
    
    // 验证密码
    if (password.length < 6) {
        showError('registerPasswordError', '密码至少需要6个字符');
        isValid = false;
    } else {
        hideError('registerPasswordError');
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
        showError('registerConfirmPasswordError', '两次密码输入不一致');
        isValid = false;
    } else {
        hideError('registerConfirmPasswordError');
    }
    
     if (!isValid) return;

     // 请求体
    const requestBody = JSON.stringify({
        data: {
            userName: username,
            password: password,
            avatar: "https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/img/default_avatar.jpg" //默认头像
        }
    });
    console.log("注册请求体:", requestBody);

    // 发送注册请求
    fetch("http://8.134.154.79:8088/meal/user/register", {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json" 
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);
        return response.json();
    })
    .then(result => {
        console.log("注册响应:", result);
        switch (result.code) {
            case 200:
                alert(result.msg || "注册成功！");
                this.reset(); // 重置表单
                formContainer.classList.remove('register-mode'); // 切换到登录表单
                loginToggle.classList.add('active');
                registerToggle.classList.remove('active');
                break;
            case 400:
                if (result.msg.includes("已被注册")) {
                    showError('registerUsernameError', result.msg);
                } else {
                    alert(result.msg);
                }
                break;
            case 402:
                // 参数校验错误（如用户名为空/长度不符）
                const errorField = result.msg.match(/用户名(.+)/) ? 'registerUsernameError' : null;
                if (errorField) {
                    showError(errorField, result.msg);
                } else {
                    alert(result.msg);
                }
                break;
            default:
                alert(result.msg || "注册失败，请重试");
        }
    })
    .catch(error => {
        console.error("注册请求失败:", error);
        alert("网络错误，请检查连接");
    });
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}
