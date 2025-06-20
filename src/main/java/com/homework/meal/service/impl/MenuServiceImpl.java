package com.homework.meal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.meal.mapper.MenuMapper;
import com.homework.meal.po.Menu;
import com.homework.meal.service.MenuService;
import org.springframework.stereotype.Service;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:42
 * @Description:
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {
}
