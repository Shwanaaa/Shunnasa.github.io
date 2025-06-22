package com.homework.meal;

import com.homework.meal.mapper.MenuMapper;
import com.homework.meal.po.Menu;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * @Author: JM
 * @Date: 2025-06-19-23:53
 * @Description:
 */

@SpringBootTest
@ActiveProfiles("dev")
public class MenuTest {

    @Autowired
    private MenuMapper menuMapper;
    @Test
    public void addMenuTest(){
        Menu menu = Menu.builder().price(22.0)
                .sales(22)
                .img("meal/photo/19608a92bef4641f2fffc86972ef722a.jpg")
                .type("素食轻食")
                .description("营养均衡又好吃！！！")
                .name("减脂沙拉").build();

        menuMapper.insert(menu);
    }

}
