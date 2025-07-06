package com.homework.meal.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.dto.OrderSubmitDTO;
import com.homework.meal.exception.ApiException;
import com.homework.meal.mapper.MenuMapper;
import com.homework.meal.mapper.MenuSetMapper;
import com.homework.meal.mapper.OrdersMapper;
import com.homework.meal.po.Menu;
import com.homework.meal.po.MenuSet;
import com.homework.meal.po.Orders;
import com.homework.meal.service.OrdersService;
import com.homework.meal.vo.MenuVO;
import com.homework.meal.vo.OrdersVO;
import com.homework.meal.vo.ShoppingListVO;
import com.homework.meal.vo.SingleOrderVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private final MenuSetMapper menuSetMapper;


    /**
     * 通用购物车
     * @param addType
     * @param idChose
     * @param uid
     * @param type
     */
    public void addToShoppingListCommon(String addType, Integer idChose, Integer uid, Integer type) {
        QueryWrapper<Orders> ordersQueryWrapper = new QueryWrapper<>();
        ordersQueryWrapper.eq(addType, idChose)
                .eq("uid", uid)
                .ne("status", 1);
        Orders order = ordersMapper.selectOne(ordersQueryWrapper);

        //添加过购物车的情况
        if(order == null) {
            if(type == 0) throw new ApiException("未添加过购物车，删除操作失败");
            Orders newOrder = Orders.builder()
                    .cnt(1)
                    .uid(uid)
                    .status(0)
                    .build();
            if(addType.equals("mid")) newOrder.setMid(idChose);
            else newOrder.setSetMealId(idChose);
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
     * 单个菜品加入购物车
     * @param mid
     * @param uid
     * @param type
     */
    @Override
    public void addToShoppingList(Integer mid, Integer uid, Integer type) {
        try {
            addToShoppingListCommon("mid", mid, uid, type);
        } catch (Exception e) {
            throw new ApiException("操作失败");
        }
    }

    /**
     * 套餐购物车加购
     * @param setId
     * @param uid
     * @param type
     */
    @Override
    public void addSetToShoppingList(Integer setId, int uid, Integer type) {
        try {
            addToShoppingListCommon("set_meal_id", setId, uid, type);
        } catch (Exception e) {
            throw new ApiException("操作失败");
        }
    }

    /**
     * 获取购物车清单
     * @param uid
     * @return
     */
    @Override
    public List<ShoppingListVO> getShoppingList(int uid) {
        List<MenuVO> shoppingItems = ordersMapper.getShoppingList(uid);
        List<ShoppingListVO> result = new ArrayList<>();

        // 处理普通单品
        for (MenuVO menu : shoppingItems) {
            ShoppingListVO item = new ShoppingListVO();
            item.setId(menu.getId());
            item.setName(menu.getName());
            item.setPrice(menu.getPrice());
            item.setCnt(menu.getCnt());
            item.setType(0);
            item.setImg(menu.getImg());
            result.add(item);
        }

        // 查询套餐订单（mid 为 null）
        QueryWrapper<Orders> wrapper = new QueryWrapper<>();
        wrapper.eq("uid", uid)
                .eq("status", 0)
                .isNull("deleted_at")
                .isNull("mid")
                .isNotNull("set_meal_id");
        List<Orders> setMealOrders = ordersMapper.selectList(wrapper);

        for (Orders order : setMealOrders) {
            Integer setMealId = order.getSetMealId();
            Integer cnt = order.getCnt();

            // 查询套餐信息
            MenuSet menuSet = menuSetMapper.selectById(setMealId);
            if (menuSet == null) continue;

            // 查询套餐中的菜品
            QueryWrapper<Menu> menuWrapper = new QueryWrapper<>();
            menuWrapper.eq("set_type", setMealId);
            List<Menu> menus = menuMapper.selectList(menuWrapper);

            List<MenuVO> menuVOList = menus.stream().map(m -> {
                MenuVO vo = MenuVO.builder().build();
                BeanUtil.copyProperties(m, vo);
                return vo;
            }).collect(Collectors.toList());

            ShoppingListVO vo = new ShoppingListVO();
            vo.setId(menuSet.getId());
            vo.setName(menuSet.getName());
            vo.setPrice(menuSet.getPrice());
            vo.setCnt(cnt);
            vo.setType(1);
            vo.setMenuVOList(menuVOList);
            vo.setImg(null);
            result.add(vo);
        }

        return result;
    }


    /**
     * 购物车结算
     * @param orderSubmitDTOS
     */
    @Transactional
    @Override
    public void orderSubmit(Integer uid, List<OrderSubmitDTO> orderSubmitDTOS) {
        if (BeanUtil.isEmpty(orderSubmitDTOS)) return;

        //找出已下单的单品的id
        List<Integer> singleMenuIds = orderSubmitDTOS.stream().filter(dto -> dto.getType() == 0)
                .map(OrderSubmitDTO::getId).collect(Collectors.toList());
        List<Integer> setMenuIds = orderSubmitDTOS.stream().filter(dto -> dto.getType() == 1)
                .map(OrderSubmitDTO::getId).collect(Collectors.toList());



        // 1. 查询当前 uid 用户下，mid in (singleMenuIds) 或者set_meal_id in (setMenuIds) 且 status = 0 的订单项
        LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Orders::getUid, uid)
                .eq(Orders::getStatus, 0)
                .and(wrapper -> {
                    if (!singleMenuIds.isEmpty()) {
                        wrapper.or(w -> w.in(Orders::getMid, singleMenuIds));
                    }
                    if (!setMenuIds.isEmpty()) {
                        wrapper.or(w -> w.in(Orders::getSetMealId, setMenuIds));
                    }
                });


        List<Orders> orderList = ordersMapper.selectList(queryWrapper);

        if (orderList.isEmpty()) return;

        // 2. 更新订单状态为已下单（status = 1）
        UpdateWrapper<Orders> wrapper = new UpdateWrapper<>();
        wrapper.eq("uid", uid)
                .in("mid", singleMenuIds)
                .or()
                .in("set_meal_id", setMenuIds)
                .set("status", 1);
        ordersMapper.update(null, wrapper);

        // 3. 遍历每个订单项，更新 menu 表中对应菜单的销量（sales += cnt）
        for (Orders order : orderList) {
            Integer mid = order.getMid();
            Integer setMealId = order.getSetMealId();
            Integer cnt = order.getCnt();

            if(mid != null){
                UpdateWrapper<Menu> menuUpdateWrapper = new UpdateWrapper<>();
                menuUpdateWrapper.eq("id", mid)
                        .setSql("sales = sales + " + cnt);
                menuMapper.update(null, menuUpdateWrapper);
            }else{
                QueryWrapper<Menu> queryWrapper1 = new QueryWrapper<>();
                queryWrapper1.eq("set_type", order.getSetMealId());
                List<Menu> menus = menuMapper.selectList(queryWrapper1);
                for(Menu menu : menus){
                    Integer sale = menu.getSales() + 1;
                    menu.setSales(sale);
                    menuMapper.updateById(menu);
                }
            }

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
                //按订单生成时间进行降序排序
                .sorted((e1, e2) -> e2.getKey().compareTo(e1.getKey()))
                .map(
                entry -> {
                    LocalDateTime key = entry.getKey();
                    List<SingleOrderVO> value = entry.getValue();

                    //如果是套餐
                    String setMealName = value.stream().filter(v -> v.getMid() == null)
                            .map(v -> menuSetMapper.selectById(v.getSetMealId()).getName() + "x" + v.getCnt())
                            .collect(Collectors.joining(","));
                    double setMealPrice = value.stream().filter(i -> i.getMid() == null)
                            .mapToDouble(i -> {
                                MenuSet menuSet = menuSetMapper.selectById(i.getSetMealId());
                                return menuSet.getPrice() * i.getCnt();
                            }).sum();

                    //单品与套餐价格和名字的拼接
                    double price = value.stream().filter(i -> i.getSetMealId() == null)
                            .mapToDouble(i -> {
                                Menu menu = menuMapper.selectById(i.getMid());
                                return menu.getPrice() * i.getCnt();
                            }).sum() + setMealPrice;
                    String name = value.stream()
                            .filter(i -> i.getSetMealId() == null)
                            .map(i -> menuMapper.selectById(i.getMid()).getName() + "x" + i.getCnt())
                            .collect(Collectors.joining(",")) + "," + setMealName;

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
