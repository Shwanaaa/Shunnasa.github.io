package com.homework.meal.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @description redis工具类
 * */
@Slf4j
@Component // 实现bean的注入
@SuppressWarnings("ConstantConditions")
public class RedisUtils {


    @Autowired
    @Qualifier("redisTemplate") //自定义缓存配置类
    private RedisTemplate<String,Object> redisTemplate;

    public boolean hasKey(String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }


    // 获取缓存值
    public <T> T get(String key) {
        return key == null ? null : (T) redisTemplate.opsForValue().get(key);
    }

    // 设置缓存值
    public boolean set(String key, Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    // 设置缓存值+时间
    public boolean set(String key, Object value, long time) {
        try {
            if (time > 0) {
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            } else {
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    //删除缓存
    public void del(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete(Arrays.asList(key));
            }
        }
    }

    /**
     * 获取剩余时间
     * -1为未设置
     * -2为键不存在
     * */
    public Long getExpire(String key){
        return redisTemplate.opsForValue().getOperations().getExpire(key);
    }

    /**
     * 设置过期时间
     * */
    public boolean  setExpire(String key, long time) {
        try {
            if (time > 0) {
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    /**
     * 获取数值类型 若键不存在则返回0
     * */
    public int getIntOrZero(String key) {
        return redisTemplate.opsForValue().get(key) == null ? 0 : (int) redisTemplate.opsForValue().get(key);
    }


    public long incr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("Incr factor must greater than zero.");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }

    public long incr(String key) {
        return redisTemplate.opsForValue().increment(key);
    }

    public long decr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("Decr factor must greater than zero.");
        }
        return redisTemplate.opsForValue().decrement(key, delta);
    }

    // HASHMAP
    public Object hget(String key, String item) {
        return redisTemplate.opsForHash().get(key, item);
    }

    public Map<Object, Object> hmget(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    public boolean hmset(String key, Map<String, Object> map) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean hmset(String key, Map<String, Object> map, long time) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if (time > 0) {
                setExpire(key, time);
            }
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean hset(String key, String item, Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public boolean hset(String key, String item, Object value, long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if (time > 0) {
                setExpire(key, time);
            }
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public void hdel(String key, Object... item) {
        redisTemplate.opsForHash().delete(key, item);
    }

    public boolean hHasKey(String key, String item) {
        return redisTemplate.opsForHash().hasKey(key, item);
    }

    public double hincr(String key, String item, double delta) {
        return redisTemplate.opsForHash().increment(key, item, delta);
    }

    public double hdecr(String key, String item, double delta) {
        return redisTemplate.opsForHash().increment(key, item, -delta);
    }

    /**
     * 设置分布式锁
     *
     * @param key    键，可以用用户主键
     * @param value  值，可以传requestId，可以保证锁不会被其他请求释放，增加可靠性
     * @param expire 锁的时间(秒)
     * @return 设置成功为 true
     */
    public Boolean setNx(String key, Object value, long expire) {
        return redisTemplate.opsForValue().setIfAbsent(key, value, expire, TimeUnit.SECONDS);
    }

    /**
     * 设置分布式锁，有等待时间
     *
     * @param key     键，可以用用户主键
     * @param value   值，可以传requestId，可以保证锁不会被其他请求释放，增加可靠性
     * @param expire  锁的时间(秒)
     * @param timeout 在timeout时间内仍未获取到锁，则获取失败
     * @return 设置成功为 true
     */
    public Boolean setNx(String key, Object value, long expire, long timeout) {
        long start = System.currentTimeMillis();
        //在一定时间内获取锁，超时则返回错误
        while (true) {
            // 获取到锁，并设置过期时间返回true
            if (Boolean.TRUE.equals(redisTemplate.opsForValue().setIfAbsent(key, value, expire, TimeUnit.SECONDS))) {
                return true;
            }
            //否则循环等待，在timeout时间内仍未获取到锁，则获取失败
            if (System.currentTimeMillis() - start > timeout) {
                return false;
            }
        }
    }

    /**
     * 释放分布式锁
     *
     * @param key   锁
     * @param value 值，可以传requestId，可以保证锁不会被其他请求释放，增加可靠性
     * @return 成功返回true, 失败返回false
     */
    public boolean releaseNx(String key, Object value) {
        Object currentValue = redisTemplate.opsForValue().get(key);
        if (String.valueOf(currentValue) != null && value.equals(currentValue)) {
            return Boolean.TRUE.equals(redisTemplate.opsForValue().getOperations().delete(key));
        }
        return false;
    }

}
