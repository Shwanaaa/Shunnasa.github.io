package com.homework.meal;

import org.jasypt.util.text.BasicTextEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MealApplicationTests {

    @Test
    void contextLoads() {

    }

    @Test
    void jasyptTest(){
        BasicTextEncryptor encryptor = new BasicTextEncryptor();
        encryptor.setPassword("2025meal"); // 加密密钥
        String encrypted = encryptor.encrypt("AKIDtfKwMZbS6Z7YmneIk281iDVZP5YnriMn"); // 明文
        System.out.println("ENC(" + encrypted + ")");
    }

}
