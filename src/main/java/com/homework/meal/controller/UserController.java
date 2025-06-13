package com.homework.meal.controller;

import com.homework.meal.bean.JsonRequest;
import com.homework.meal.bean.JsonResponse;
import com.homework.meal.dto.UserDTO;
import com.homework.meal.service.UserService;
import io.swagger.util.Json;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * @Author: JM
 * @Date: 2025-06-10-21:50
 * @Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController extends BaseController{

    private final UserService userService;

    /**
     * 用户注册
     * @param jsonRequest
     * @return
     */
    @PostMapping("/register")
    public JsonResponse register(@RequestBody @Validated JsonRequest<UserDTO> jsonRequest){
        UserDTO userDTO = jsonRequest.getData();
        userService.register(userDTO);
        return JsonResponse.success("注册成功！");
    }

    /**
     * 用户登录
     * @param jsonRequest
     * @return
     */

    @PostMapping("/login")
    public JsonResponse<Object> login(@RequestBody @Validated JsonRequest<UserDTO> jsonRequest){
        UserDTO userDTO = jsonRequest.getData();
        String token = userService.login(userDTO);
        HashMap<String, String> result = new HashMap<>();
        result.put("token", token);
        return JsonResponse.success(result);
    }

}
