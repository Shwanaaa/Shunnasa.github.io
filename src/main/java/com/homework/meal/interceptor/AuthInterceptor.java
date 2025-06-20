package com.homework.meal.interceptor;

import com.alibaba.fastjson.JSON;
import com.homework.meal.bean.JsonResponse;
import com.homework.meal.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 拦截器
 */
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

    public static final String TOKEN_HEADER = "Token";

    @Autowired
    private TokenUtils tokenUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Authorization,Origin,X-Requested-With,Content-Type,Accept,"
                + "content-Type,origin,x-requested-with,content-type,accept,authorization,token,id,X-Custom-Header,X-Cookie,Connection,User-Agent,Cookie,*");
        response.setHeader("Access-Control-Request-Headers", "Authorization,Origin, X-Requested-With,content-Type,Accept");
        response.setHeader("Access-Control-Expose-Headers", "*");
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 无token参数拒绝，放通的登录接口除外
        if (request.getHeader(TOKEN_HEADER) == null || request.getHeader(TOKEN_HEADER).isEmpty()) {
            response.getWriter().write(JSON.toJSONString(JsonResponse.tokenError("用户未登录")));
            return false;
        }
        // Token 校验
        String token = request.getHeader(TOKEN_HEADER);

        try {
            int uid = tokenUtils.getTokenUid(token);
            tokenUtils.refreshToken(token, uid); // 刷新有效期
            request.setAttribute("uid", uid);
        } catch (Exception e) {
            response.getWriter().write(JSON.toJSONString(JsonResponse.tokenError(e.getMessage())));
            return false;
        }

        return true; // 直接放行
    }
}
