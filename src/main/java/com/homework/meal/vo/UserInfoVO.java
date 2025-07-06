package com.homework.meal.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: JM
 * @Date: 2025-06-19-19:41
 * @Description: 用户信息vo
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoVO {
    private String userName;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 性别
     */
    private String gender;

    private String phone;

    /**
     * 生日
     */
    private String birthday;

    /**
     * 个人简介
     */
    private String introduction;

    /**
     * 邮箱
     */
    private String email;
}
