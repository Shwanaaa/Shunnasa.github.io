package com.homework.meal.exception;

/**
 * @description 基本上有问题就会抛出的异常，会在{@link GlobalExceptionHandler}统一处理
 * ！！！注意！！！无论如何不要在代码中catch Exception，可能会误捕获ApiException
 * @author Garfield
 * @date 2025/5/8
 */
public class ApiException extends RuntimeException {

    public ApiException() {
        super();
    }

    public ApiException(String message) {
        super(message);
    }
}
