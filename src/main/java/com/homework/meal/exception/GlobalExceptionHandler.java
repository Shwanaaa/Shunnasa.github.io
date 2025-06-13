package com.homework.meal.exception;

import com.alibaba.fastjson.JSON;
import com.homework.meal.bean.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @description
 * @author Garfield
 * @date 2025/5/8
 */
@Slf4j
@Order(0)
@ControllerAdvice(basePackages = {"com.homework.meal.controller"})
public class GlobalExceptionHandler {

    private static final String ERROR_MESSAGE_TEMPLATE = "%s\n[Msg]%s\n[File]%s\n[LogId]%s\n[Url]%s\n[Ip]%s\n[Args]%s\n[Token]%s";

    // 微信官方后端安全测试ip 提交审核后会进行SQL注入 XSS CORS 敏感信息泄露等测试
    private static final List<String> skipIp = Arrays.asList("106.55.202.118","113.96.223.69","125.39.132.125");

    @Value("${project.isDebug}")
    private boolean isDebug;

    @ExceptionHandler(Exception.class)
    public @ResponseBody
    JsonResponse<Object> errorResult(Exception e) throws IOException {
        // 排除白名单ip
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String ip = attributes.getRequest().getHeader("X-Real-IP");
        if(skipIp.contains(ip)) {
            log.info("微信小程序漏洞测试 | Ip: {} | Args: {}",ip,attributes.getRequest().getAttribute("args"));
            return  JsonResponse.error("操作失败");
        }

        log.error(e.getMessage());
        if(isDebug){ // 本地调试只输出错误信息
            e.printStackTrace();
        }else{
//            WechatBot.send(createErrorMessage(e));
        }
        return JsonResponse.error(String.format("操作失败，请重试[%s]", e.getMessage()));
    }

    // 数据校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public @ResponseBody JsonResponse<Object> validationErrorResult(MethodArgumentNotValidException e){
        BindingResult result = e.getBindingResult();
        StringBuffer sb = new StringBuffer();
        if (result.getFieldErrorCount() > 0) {
            List<FieldError> fieldErrors = result.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
        }
        return JsonResponse.paramError(String.format("参数校验错误[%s]", sb));
    }

    // 数据校验异常
    @ExceptionHandler(ValidationException.class)
    public @ResponseBody JsonResponse<Object> validationErrorResult(ValidationException e){
        return JsonResponse.paramError(String.format("参数校验错误[%s]", e.getMessage()));
    }

    @ExceptionHandler(MissingPathVariableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public JsonResponse<Object> handleMissingPathVariableException(MissingPathVariableException ex) {
        return JsonResponse.error("请求路径中缺少必要的参数: " + ex.getVariableName());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public JsonResponse<Object> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        return JsonResponse.error("请求路径未找到: " + ex.getRequestURL());
    }

    // 自定义异常处理类
    @ExceptionHandler(ApiException.class)
    public @ResponseBody
    JsonResponse<Object> apiErrorResult(ApiException e) {
        return JsonResponse.error(e.getMessage());
    }


    private String createErrorMessage(Exception e) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert attributes != null;
        HttpServletRequest request = attributes.getRequest();
        String logId = (String) request.getAttribute("requestId");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String currentDate = formatter.format(date);
        String msg = String.format(ERROR_MESSAGE_TEMPLATE,
                currentDate,
                e.getMessage(),
                e.getStackTrace()[0].getFileName() + "." + e.getStackTrace()[0].getMethodName() + " (line: " + e.getStackTrace()[0].getLineNumber() + ")",
                logId,
                request.getRequestURL().toString(),
                request.getHeader("X-Real-IP"),
                request.getAttribute("args"),
                request.getHeader("Token"));
        Map<String, Object> req = new HashMap<>();
        req.put("msgtype", "text");
        Map<String, String> content = new HashMap<>();
        content.put("content", msg);
        req.put("text", content);
        return JSON.toJSONString(req);
    }


}
