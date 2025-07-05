package com.homework.meal.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: JM
 * @Date: 2025-07-05-14:03
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("menu_set")
public class MenuSet {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 套餐名
     */
    @TableField(value = "name")
    private String name;

    /**
     * 套餐价格
     */
    @TableField(value = "price")
    private Double price;
}
