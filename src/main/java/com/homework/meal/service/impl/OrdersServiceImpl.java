package com.homework.meal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.exception.ApiException;
import com.homework.meal.mapper.MenuMapper;
import com.homework.meal.mapper.OrdersMapper;
import com.homework.meal.po.Menu;
import com.homework.meal.po.Orders;
import com.homework.meal.service.OrdersService;
import com.homework.meal.vo.MenuVO;
import com.homework.meal.vo.OrdersVO;
import com.homework.meal.vo.SingleOrderVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Author: JM
 * @Date: 2025-06-20-10:06
 * @Description:
 */

@Service
@RequiredArgsConstructor
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper, Orders> implements OrdersService {

    private final OrdersMapper ordersMapper;

    private final MenuMapper menuMapper;

    /**
     * 加入购物清单
     * @param mid
     * @param type 0--减少数量 1--增加数量
     */
    @Override
    public void addToShoppingList(Integer mid, Integer uid, Integer type) {
        QueryWrapper<Orders> ordersQueryWrapper = new QueryWrapper<>();
        ordersQueryWrapper.eq("mid", mid)
                .eq("uid", uid)
                .ne("status", 1);
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

    /**
     * 购物车结算
     * @param ids
     */
    @Transactional
    @Override
    public void orderSubmit(Integer uid, List<Integer> ids) {
        if (ids == null || ids.isEmpty()) return;

        // 1. 查询当前 uid 用户下，mid in (ids) 且 status = 0 的订单项
        List<Orders> orderList = ordersMapper.selectList(
                new QueryWrapper<Orders>()
                        .eq("uid", uid)
                        .in("mid", ids)
                        .eq("status", 0)
        );

        if (orderList.isEmpty()) return;

        // 2. 更新订单状态为已下单（status = 1）
        UpdateWrapper<Orders> wrapper = new UpdateWrapper<>();
        wrapper.eq("uid", uid)
                .in("mid", ids)
                .set("status", 1);
        ordersMapper.update(null, wrapper);

        // 3. 遍历每个订单项，更新 menu 表中对应菜单的销量（sales += cnt）
        for (Orders order : orderList) {
            Integer mid = order.getMid();
            Integer cnt = order.getCnt();

            UpdateWrapper<Menu> menuUpdateWrapper = new UpdateWrapper<>();
            menuUpdateWrapper.eq("id", mid)
                    .setSql("sales = sales + " + cnt);

            menuMapper.update(null, menuUpdateWrapper);
        }
    }

    /**
     * 获取历史订单
     * @param uid
     * @return
     */
    @Override
    public List<OrdersVO> getHistoryOrders(int uid) {
        List<SingleOrderVO> historyOrders = ordersMapper.getHistoryOrders(uid);

        Map<LocalDateTime, List<SingleOrderVO>> timeListMap = historyOrders
                .stream()
                .collect(Collectors.groupingBy(SingleOrderVO::getCreateTime));

        return timeListMap.entrySet().stream()
                .sorted((e1, e2) -> e2.getKey().compareTo(e1.getKey()))
                .map(
                entry -> {
                    LocalDateTime key = entry.getKey();
                    List<SingleOrderVO> value = entry.getValue();

                    double price = value.stream().mapToDouble(i -> i.getPrice() * i.getCnt()).sum();
                    String name = value.stream().map(i -> i.getName() + "x" + i.getCnt())
                            .collect(Collectors.joining(","));

                    String number = key.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

                    return OrdersVO.builder()
                            .number(number)
                            .price(price)
                            .createTime(key)
                            .name(name)
                            .build();

                }
        ).collect(Collectors.toList());
    }

}
