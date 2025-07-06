package com.homework.meal.controller;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.homework.meal.bean.JsonRequest;
import com.homework.meal.bean.JsonResponse;
import com.homework.meal.dto.OrderSubmitDTO;
import com.homework.meal.exception.ApiException;
import com.homework.meal.po.Menu;
import com.homework.meal.po.Orders;
import com.homework.meal.service.MenuService;
import com.homework.meal.service.OrdersService;
import com.homework.meal.vo.MenuVO;
import com.homework.meal.dto.ShoppingCartDTO;
import com.homework.meal.vo.OrdersVO;
import com.homework.meal.vo.ShoppingListVO;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
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
public class OrderController extends BaseController{

    private final MenuService menuService;

    private final OrdersService ordersService;


    /**
     * [O001]根据菜品类型获取菜品信息
     * @param type
     * @return
     */
    @GetMapping("/getMenuByType")
    public JsonResponse getMenuByType(@RequestParam("type") String type){
        if(type == null) throw new ApiException("菜品类型不为空");

        QueryWrapper<Menu> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("type", type);
        List<Menu> menus = menuService.list(queryWrapper);
        if(BeanUtil.isEmpty(menus)) return JsonResponse.success("无菜品信息");

        int uid = getUid();
        List<MenuVO> menuVOS = menuService.getMenuByType(uid, type);

        return JsonResponse.success(menuVOS);
    }

    /**
     * [O002]加入购物车
     * @param jsonRequest
     * @return
     */
    @PostMapping("/addToShoppingList")
    public JsonResponse addToShoppingList(@Validated @RequestBody JsonRequest<ShoppingCartDTO> jsonRequest){
        ShoppingCartDTO data = jsonRequest.getData();
        Integer mid = data.getId();
        //添加或者减少数量 1--添加 0--减少
        Integer type = data.getType();
        if(type == null || (type != 0 && type != 1)) throw new ApiException("操作指令错误，0或1");
        Menu menu = menuService.getById(mid);
        if(menu == null) throw new ApiException("商品不存在！");

        int uid = getUid();

        ordersService.addToShoppingList(mid, uid, type);
        return JsonResponse.success("操作成功");
    }

    /**
     * [O003]获取购物车清单
     * @return
     */
    @GetMapping("/getShoppingList")
    public JsonResponse<List<ShoppingListVO>> getShoppingList(){
        int uid = getUid();

        List<ShoppingListVO> shoppingList = ordersService.getShoppingList(uid);
        return JsonResponse.success(shoppingList);
    }

    /**
     * [O004]提交订单
     * @param jsonRequest
     * @return
     */
    @PostMapping("/orderSubmit")
    public JsonResponse orderSubmit(@RequestBody JsonRequest<List<OrderSubmitDTO>> jsonRequest){
        List<OrderSubmitDTO> data = jsonRequest.getData();

        if(data.isEmpty()) throw new ApiException("提交的订单为空！");

        int uid = getUid();
        ordersService.orderSubmit(uid, data);

        return JsonResponse.success("订单提交成功！");
    }

    /**
     * [O005]获取历史订单
     * @return
     */
    @GetMapping("/getHistoryOrders")
    public JsonResponse<List<OrdersVO>> getHistoryOrders(){
        int uid = getUid();

        List<OrdersVO> historyOrders = ordersService.getHistoryOrders(uid);
        return JsonResponse.success(historyOrders);
    }

    /**
     * [O006]根据套餐种类展示套餐详情
     * @param setType
     * @return
     */
    @GetMapping("/getMenuBySetType/{setType}")
    public JsonResponse<List<MenuVO>> getMenuBySetType(@PathVariable("setType") Integer setType){
        if(setType == null) throw new ApiException("套餐种类不为空");
        int uid = getUid();

        List<MenuVO> menuBySetType = menuService.getMenuBySetType(uid, setType);
        return JsonResponse.success(menuBySetType);

    }


    /**
     * [O007]套餐加购
     * @param jsonRequest
     * @return
     */
    @PostMapping("/addSetToShoppingList")
    public JsonResponse addSetToShoppingList(@Validated @RequestBody JsonRequest<ShoppingCartDTO> jsonRequest){
        ShoppingCartDTO data = jsonRequest.getData();
        Integer setId = data.getId();
        //添加或者减少数量 1--添加 0--减少
        Integer type = data.getType();
        if(type == null || (type != 0 && type != 1)) throw new ApiException("操作指令错误，0或1");
        int uid = getUid();

        ordersService.addSetToShoppingList(setId, uid, type);
        return JsonResponse.success("操作成功");
    }

}
