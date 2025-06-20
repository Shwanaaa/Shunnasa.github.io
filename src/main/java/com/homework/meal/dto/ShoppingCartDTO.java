package com.homework.meal.dto;

import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

/**
 * @Author: JM
 * @Date: 2025-06-20-9:45
 * @Description: 购物车VO
 */

@Data
@Validated
public class ShoppingCartDTO {

    /**
     * 商品id
     */
    @NotNull(message = "商品信息不为空")
    private Integer id;

    /**
     * 1--加入购物车 0--购物车对应菜品数量减一
     */
    @NotNull(message = "操作指令不为空！")
    private Integer type;

}
