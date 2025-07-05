package com.homework.meal.po;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: JM
 * @Date: 2025-06-19-20:48
 * @Description: 订单信息
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("orders")
@Builder
public class Orders implements Serializable {
    private static final long serialVersionUID = 1L;

    /***
     * 记录id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 用户id
     */
    @TableField("uid")
    private Integer uid;

    /**
     * 菜品id
     */
    @TableField("mid")
    private Integer mid;

    /**
     * 商品状态 0--未下单 1--已下单
     */
    @TableField("status")
    private Integer status;

    /**
     * 逻辑删除
     */
    @TableLogic("null")
    private Date deletedAt;

    /**
     * 菜品数量
     */
    @TableField("cnt")
    private Integer cnt;

    /**
     * 修改时间
     */
    @TableField("gmt_modified")
    private LocalDateTime gmt_modified;

    /**
     * 套餐id
     */
    @TableField("set_meal_id")
    private Integer setMealId;

}
