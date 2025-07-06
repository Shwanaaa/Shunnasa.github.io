package com.homework.meal.dto;

import lombok.Data;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-20-15:17
 * @Description:
 */

@Data
public class OrderSubmitDTO {

    /**
     * 类型 0--单品 1--套餐
     */
    private Integer type;

    /**
     * 对应id
     */
    private Integer id;
}
