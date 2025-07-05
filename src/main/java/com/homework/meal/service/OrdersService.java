package com.homework.meal.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.meal.po.Orders;
import com.homework.meal.vo.MenuVO;
import com.homework.meal.vo.OrdersVO;

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

    //购物车结算
    void orderSubmit(Integer uid, List<Integer> ids);

    //获取历史订单
    List<OrdersVO> getHistoryOrders(int uid);

    //套餐购物车加购
    void addSetToShoppingList(Integer setId, int uid, Integer type);
}
