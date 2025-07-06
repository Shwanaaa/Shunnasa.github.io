package com.homework.meal.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @Author: JM
 * @Date: 2025-06-20-19:37
 * @Description: 历史订单初处理vo
 */
@Data
public class SingleOrderVO {

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
     * 单品id
     */
    private Integer mid;

    /**
     * 套餐id
     */
    private Integer setMealId;
}
