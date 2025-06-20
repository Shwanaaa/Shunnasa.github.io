package com.homework.meal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.mapper.MenuMapper;
import com.homework.meal.po.Menu;
import com.homework.meal.service.MenuService;
import com.homework.meal.vo.MenuVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:42
 * @Description:
 */
@Service
@RequiredArgsConstructor
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

    private final MenuMapper menuMapper;

    /**
     * 根据菜品种类获取菜品
     * @param uid
     * @param type
     * @return
     */
    @Override
    public List<MenuVO> getMenuByType(int uid, String type) {
        List<MenuVO> menus = menuMapper.getMenuByType(uid, type);
        return menus;
    }
}
