package com.homework.meal.vo;

import lombok.Data;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-07-05-13:41
 * @Description:
 */

@Data
public class ShoppingListVO {

    private Integer id;

    private String name;

    private Integer cnt;

    private Double price;

    /**
     *套餐1 普通单品0
     */
    private Integer type;

    private String img;

    /**
     * 套餐里面的菜品
     */
    private List<MenuVO> menuVOList;
}
