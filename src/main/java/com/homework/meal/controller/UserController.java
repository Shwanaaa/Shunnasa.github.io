package com.homework.meal.controller;

import com.homework.meal.bean.JsonResponse;
import io.swagger.util.Json;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: JM
 * @Date: 2025-06-10-21:50
 * @Description:
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping(value = "/hello")
    public JsonResponse hello(){
        return JsonResponse.success("你好！！");
    }
}
