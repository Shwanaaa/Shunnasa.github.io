package com.homework.meal.dto;

import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @Author: JM
 * @Date: 2025-06-13-17:10
 * @Description: 注册dto
 */
@Validated
@Data
public class UserRegisterDTO {

    @Size(max = 30, message = "密码长度不得超过30")
    @NotBlank(message = "密码不为空")
    private String password;

    // 邮箱地址
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    // 验证码
    @NotBlank(message = "验证码不能为空")
    private String verificationCode;
}
