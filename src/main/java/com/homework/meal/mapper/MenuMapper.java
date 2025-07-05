package com.homework.meal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.homework.meal.po.Menu;
import com.homework.meal.vo.MenuVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:35
 * @Description:
 */
@Mapper
public interface MenuMapper extends BaseMapper<Menu> {
    List<MenuVO> getMenuByType(@Param("uid") int uid, @Param("type") String type);

    List<MenuVO> getMenuBySetType(@Param("uid") Integer uid, @Param("setType")Integer setType);
}
