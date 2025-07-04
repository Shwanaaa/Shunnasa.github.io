package com.homework.meal.dto;

import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @Author: JM
 * @Date: 2025-06-19-19:51
 * @Description:
 */
@Validated
@Data
public class UserInfoDTO {
    private String userName;

    @Size(max = 300, message = "个人简介字数限制300字~")
    private String introduction;

    private String gender;

    private String birthday;

    @Size(max = 11, min = 11, message = "手机号格式错误！")
    private String phone;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

}
