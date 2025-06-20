package com.homework.meal.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
     * 订单id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

}
