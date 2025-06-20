package com.homework.meal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.exception.ApiException;
import com.homework.meal.mapper.OrdersMapper;
import com.homework.meal.po.Orders;
import com.homework.meal.service.OrdersService;
import com.homework.meal.vo.MenuVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-20-10:06
 * @Description:
 */

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper, Orders> implements OrdersService {

    private final OrdersMapper ordersMapper;

    /**
     * 加入购物清单
     * @param mid
     * @param type 0--减少数量 1--增加数量
     */
    @Override
    public void addToShoppingList(Integer mid, Integer uid, Integer type) {
        QueryWrapper<Orders> ordersQueryWrapper = new QueryWrapper<>();
        ordersQueryWrapper.eq("mid", mid);
        Orders order = ordersMapper.selectOne(ordersQueryWrapper);

        //添加过购物车的情况
        if(order == null) {
            if(type == 0) throw new ApiException("未添加过购物车，删除操作失败");
            Orders newOrder = Orders.builder()
                    .cnt(1)
                    .mid(mid)
                    .uid(uid)
                    .status(0)
                    .build();
            ordersMapper.insert(newOrder);
            return;
        }

        //已在购物车里面的情况
        Integer cnt = order.getCnt();
        Integer id = order.getId();
        //数量加一
        if(type == 1){
            order.setCnt(cnt + 1);
        }else {
            cnt--;
            //如果当前数量为0，从购物车中删掉记录
            if(cnt == 0) {
                ordersMapper.deleteById(id);
                return;
            }
            else {
                order.setCnt(cnt);
            }
        }
        //更新记录
        updateById(order);

    }

    /**
     * 获取购物车清单
     * @param uid
     * @return
     */
    @Override
    public List<MenuVO> getShoppingList(int uid) {
        QueryWrapper<Orders> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uid", uid);
        List<Orders> orders = ordersMapper.selectList(queryWrapper);
        if(orders.isEmpty()) return List.of();

        List<MenuVO> shoppingList = ordersMapper.getShoppingList(uid);
        return shoppingList;
    }
}
