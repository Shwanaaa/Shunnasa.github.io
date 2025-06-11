package com.homework.meal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: JM
 * @Date: 2025-06-10-21:50
 * @Description:
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/hello")
    public String hello(){
        return "hello world";
    }
}
