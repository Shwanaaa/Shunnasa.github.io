package com.homework.meal.dto;

import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @Author: JM
 * @Date: 2025-06-13-17:10
 * @Description: 注册dto
 */
@Validated
@Data
public class UserDTO {

    @NotBlank(message = "用户名不为空")
    @Size(max = 20, message = "用户名长度不得超过20")
    private String userName;

    @Size(max = 30, message = "密码长度不得超过30")
    @NotBlank(message = "密码不为空")
    private String password;
}
