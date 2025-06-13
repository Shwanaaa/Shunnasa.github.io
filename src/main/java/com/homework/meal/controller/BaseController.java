package com.homework.meal.controller;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: JM
 * @Date: 2025-06-13-9:44
 * @Description: 获取目前用户id
 */
public class BaseController {

    /**
     * 获取当前用户信息
     * @return
     */
    private Map<String, Object> getCurrentUser(){
        ServletRequestAttributes attributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        assert attributes != null;
        HttpServletRequest request = attributes.getRequest();
        HashMap<String, Object> result = new HashMap<>();
        result.put("uid", request.getAttribute("uid"));
        return result;
    }

    /**
     * 获取用户id
     * @return
     */
    public int getUid(){
        return (int)getCurrentUser().get("uid");
    }
}
