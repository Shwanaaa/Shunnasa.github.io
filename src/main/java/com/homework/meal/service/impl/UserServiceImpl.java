package com.homework.meal.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.dto.UserDTO;
import com.homework.meal.exception.ApiException;
import com.homework.meal.mapper.UserMapper;
import com.homework.meal.po.User;
import com.homework.meal.service.UserService;
import com.homework.meal.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * @Author: JM
 * @Date: 2025-06-13-19:51
 * @Description:
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private final UserMapper userMapper;

    private final TokenUtils tokenUtils;

    /**
     * 用户注册
     * @param userDTO
     */
    @Override
    public void register(UserDTO userDTO) {
        String userName = userDTO.getUserName();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_name", userName);
        User user = userMapper.selectOne(queryWrapper);
        if(user != null){
            throw new ApiException("该用户名已被注册！");
        }
        User newUser = User.builder().password(BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt()))
                .userName(userDTO.getUserName())
                .build();
        userMapper.insert(newUser);
    }

    /**
     * 用户登录
     * @param userDTO
     */
    @Override
    public String login(UserDTO userDTO) {
        String userName = userDTO.getUserName();
        String password = userDTO.getPassword();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_name", userName);
        User user = userMapper.selectOne(queryWrapper);
        if(user == null) throw new ApiException("用户未注册，请先注册");

        //校验密码
        if(!BCrypt.checkpw(password, user.getPassword())){
            throw new ApiException("密码错误！");
        }

        //发放token
        String token = tokenUtils.grantToken(user.getUid());

        return token;
    }
}
