package com.homework.meal.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:48
 * @Description:
 */
@Data
public class MenuVO {
    /**
     * 菜品名
     */
    private String name;

    /**
     * 菜品价格
     */
    private Double price;

    /**
     * 菜品类型
     */
    private String type;

    /**
     * 菜品介绍
     */
    private String description;

    /**
     * 销售量
     */
    private Integer sales;

    /**
     * 菜品图
     */
    private String img;
}
