package com.homework.meal.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @Author: JM
 * @Date: 2025-06-20-15:50
 * @Description: 订单vo
 */
@Data
@Builder
public class OrdersVO {

    /**
     * 订单生成时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     * 商品总量
     */
    private Integer cnt;

    /**
     * 订单菜品
     */
    private String name;

    /**
     * 价钱
     */
    private Double price;

    /**
     * 订单编号
     */
    private String number;

}
