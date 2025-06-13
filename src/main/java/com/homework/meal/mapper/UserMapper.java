package com.homework.meal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.homework.meal.controller.BaseController;
import com.homework.meal.po.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Author: JM
 * @Date: 2025-06-13-19:52
 * @Description:
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
