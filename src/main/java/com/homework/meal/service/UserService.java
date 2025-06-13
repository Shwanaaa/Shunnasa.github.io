package com.homework.meal.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.meal.dto.UserDTO;
import com.homework.meal.po.User;

/**
 * @Author: JM
 * @Date: 2025-06-13-19:32
 * @Description: 用户服务类
 */
public interface UserService extends IService<User> {
    //用户注册
    void register(UserDTO userDTO);

    //用户登录
    String login(UserDTO userDTO);
}
