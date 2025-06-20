package com.homework.meal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.constants.CachePrefix;
import com.homework.meal.dto.MailDTO;
import com.homework.meal.dto.UserLoginDTO;
import com.homework.meal.dto.UserRegisterDTO;
import com.homework.meal.exception.ApiException;
import com.homework.meal.mapper.UserMapper;
import com.homework.meal.po.User;
import com.homework.meal.service.UserService;
import com.homework.meal.utils.MailUtils;
import com.homework.meal.utils.RedisUtils;
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

    private final RedisUtils redisUtils;

    private final MailUtils mailUtils;

    /**
     * 用户注册
     * @param email
     * @param verificationCode
     * @param password
     */
    @Override
    public void register(String email, String verificationCode, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
        User user = userMapper.selectOne(queryWrapper);
        if(user != null){
            throw new ApiException("该邮箱已被注册！");
        }

        String trueCode;
        try {
            // 获取 redis 中存的信息
            trueCode = (String) redisUtils.get(String.format(CachePrefix.VERIFICATION_CODE_PREFIX, email));
        } catch (Exception e) {
            throw new ApiException("验证码已过期");
        }

        // 判断验证码是否正确
        if (!verificationCode.equals(trueCode)) {
            throw new ApiException("验证码错误");
        }

        User newUser = User.builder().password(BCrypt.hashpw(password, BCrypt.gensalt()))
                .userName("我是大吃货")
                .email(email)
                .avatar("meal/photo/e14100bb6b672c6ad1428d3fad844644.png")
                .build();
        userMapper.insert(newUser);

        // 删掉 redis 中的相关信息
        redisUtils.del(String.format(CachePrefix.VERIFICATION_CODE_PREFIX, email), String.format(CachePrefix.VERIFICATION_EMAIL_PREFIX, email));

    }

    /**
     * 用户登录
     * @param userLoginDTO
     */
    @Override
    public String login(UserLoginDTO userLoginDTO) {
        String email = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
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

    /**
     * 修改头像
     * @param uid
     * @param avatarUrl
     */
    @Override
    public void avatarModify(int uid, String avatarUrl) {
        User user = userMapper.selectById(uid);
        user.setAvatar(avatarUrl);
        try {
            userMapper.updateById(user);
        } catch (Exception e) {
            throw new ApiException("头像修改失败！");
        }
    }

    /**
     * 验证邮箱是否被绑定
     * @param email
     * @return
     */
    @Override
    public boolean checkEmailIsBind(String email) {
        // 判断 email 是否已被绑定
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("email", email));
        return user != null;
    }

    /**
     * 发送邮箱验证码
     * @param email
     */
    @Override
    public void sendRegisterVerification(String email) {
        if (redisUtils.hasKey(String.format(CachePrefix.EMAIL_LOCK,email))) {
            throw new ApiException("操作频繁,请30s后重试");
        }
        // 生成一个六位的验证码
        String verificationCode = mailUtils.getVerificationCode();
        // redis 存验证码和待绑定的 email 信息，有效期5分钟（300s）
        redisUtils.set(String.format(CachePrefix.VERIFICATION_CODE_PREFIX, email), verificationCode, 300);
        redisUtils.set(String.format(CachePrefix.VERIFICATION_EMAIL_PREFIX, email), email, 300);
        // 邮件发送锁
        redisUtils.set(String.format(CachePrefix.EMAIL_LOCK, email), 1, 30);
        // 发送邮件
        mailUtils.sendVerificationMail(email, verificationCode);
    }
}
