package com.homework.meal.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:29
 * @Description: 菜品
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("menu")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    /***
     * 菜品id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 菜品名
     */
    @TableField(value = "name")
    private String name;

    /**
     * 菜品价格
     */
    @TableField("price")
    private Double price;

    /**
     * 菜品类型
     */
    @TableField("type")
    private String type;

    /**
     * 菜品介绍
     */
    @TableField("description")
    private String description;

    /**
     * 销售量
     */
    @TableField("sales")
    private Integer sales;

    /**
     * 菜品图
     */
    @TableField("img")
    private String img;

    /**
     * 套餐种类
     */
    @TableField("set_type")
    private Integer setType;

}
