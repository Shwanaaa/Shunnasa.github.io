package com.homework.meal.po;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import java.io.Serializable;

/**
 * @Author: JM
 * @Date: 2025-06-13-19:32
 * @Description:
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    @Min(0)
    @TableId(value = "id", type = IdType.AUTO)
    private Integer uid;

    /**
     * 用户名
     */
    @TableField(value = "user_name", updateStrategy = FieldStrategy.IGNORED)
    private String userName;

    /**
     * 用户密码
     */
    @TableField("password")
    private String password;

    /**
     * 用户头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 手机号
     */
    @TableField(value = "phone", updateStrategy = FieldStrategy.IGNORED)
    private String phone;

    /**
     * 个人简介
     */
    @TableField(value = "introduction", updateStrategy = FieldStrategy.IGNORED)
    private String introduction;

    /**
     * 性别
     */
    @TableField(value = "gender", updateStrategy = FieldStrategy.IGNORED)
    private String gender;

    /**
     * 生日
     */
    @TableField(value = "birthday", updateStrategy = FieldStrategy.IGNORED)
    private String birthday;

    /**
     * 邮箱
     */
    @TableField("email")
    private String email;

}
