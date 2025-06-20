package com.homework.meal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

/**
 * @Author: JM
 * @Date: 2025-06-19-22:39
 * @Description:
 */

@Data
public class MailDTO {

    // 邮箱
    //@Pattern(regexp = "/^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$/", message = "邮箱格式不正确")
    @Email(message = "邮箱格式不正确")
    private String email;

}
