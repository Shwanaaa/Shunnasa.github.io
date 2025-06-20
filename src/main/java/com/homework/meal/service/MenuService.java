package com.homework.meal.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.meal.po.Menu;
import com.homework.meal.vo.MenuVO;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:42
 * @Description:
 */
public interface MenuService extends IService<Menu> {
    //根据菜品种类获取菜品
    List<MenuVO> getMenuByType(int uid, String type);
}
