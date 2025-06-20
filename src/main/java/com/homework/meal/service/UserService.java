package com.homework.meal.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.meal.dto.UserLoginDTO;
import com.homework.meal.dto.UserRegisterDTO;
import com.homework.meal.po.User;

/**
 * @Author: JM
 * @Date: 2025-06-13-19:32
 * @Description: 用户服务类
 */
public interface UserService extends IService<User> {
    //用户注册
    void register(String email, String verificationCode, String password);

    //用户登录
    String login(UserLoginDTO userLoginDTO);

    //修改头像
    void avatarModify(int uid, String avatarUrl);

    //验证邮箱是否被绑定
    boolean checkEmailIsBind(String email);

    //发送验证码
    void sendRegisterVerification(String email);
}
