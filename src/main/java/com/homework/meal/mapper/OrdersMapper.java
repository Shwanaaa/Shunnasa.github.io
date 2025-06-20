package com.homework.meal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.homework.meal.po.Orders;
import com.homework.meal.vo.MenuVO;
import com.homework.meal.vo.OrdersVO;
import com.homework.meal.vo.SingleOrderVO;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @Author: JM
 * @Date: 2025-06-20-10:05
 * @Description:
 */
@Mapper
public interface OrdersMapper extends BaseMapper<Orders> {
    //获取购物车清单
    List<MenuVO> getShoppingList(@Param("uid") int uid);

    //获取历史订单信息
    List<SingleOrderVO> getHistoryOrders(@Param("uid") int uid);
}
