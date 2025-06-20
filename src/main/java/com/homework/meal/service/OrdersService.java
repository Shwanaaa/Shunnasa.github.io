package com.homework.meal.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.meal.po.Orders;
import com.homework.meal.vo.MenuVO;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-20-10:05
 * @Description:
 */

public interface OrdersService extends IService<Orders> {

    //加入购物清单
    void addToShoppingList(Integer mid, Integer uid, Integer type);

    //获取购物车清单
    List<MenuVO> getShoppingList(int uid);
}
