package com.homework.meal.controller;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.homework.meal.bean.JsonResponse;
import com.homework.meal.exception.ApiException;
import com.homework.meal.po.Menu;
import com.homework.meal.service.MenuService;
import com.homework.meal.vo.MenuVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-19-20:47
 * @Description: 点餐功能相关
 */
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final MenuService menuService;


    /**
     * 根据菜品类型获取菜品信息
     * @param type
     * @return
     */
    @GetMapping("/getMenuByType/{type}")
    public JsonResponse getMenuByType(@PathVariable String type){
        if(type == null) throw new ApiException("菜品类型不为空");

        QueryWrapper<Menu> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("type", type);
        List<Menu> menus = menuService.list(queryWrapper);
        if(BeanUtil.isEmpty(menus)) return JsonResponse.success("无菜品信息");

        ArrayList<MenuVO> menuVOS = new ArrayList<>();
        for(Menu menu : menus){
            MenuVO menuVO = new MenuVO();
            BeanUtil.copyProperties(menu, menuVO);
            menuVOS.add(menuVO);
        }

        return JsonResponse.success(menuVOS);
    }

}
