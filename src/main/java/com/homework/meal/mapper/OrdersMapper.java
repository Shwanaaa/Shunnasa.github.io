package com.homework.meal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.homework.meal.po.Orders;
import com.homework.meal.vo.MenuVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-20-10:05
 * @Description:
 */
@Mapper
public interface OrdersMapper extends BaseMapper<Orders> {
    //获取购物车清单
    List<MenuVO> getShoppingList(@Param("uid") int uid);
}
