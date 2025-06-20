package com.homework.meal.controller;

import cn.hutool.core.bean.BeanUtil;
import com.homework.meal.bean.JsonRequest;
import com.homework.meal.bean.JsonResponse;
import com.homework.meal.dto.*;
import com.homework.meal.exception.ApiException;
import com.homework.meal.po.User;
import com.homework.meal.service.UserService;
import com.homework.meal.utils.COSUtils;
import com.homework.meal.utils.TokenUtils;
import com.homework.meal.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: JM
 * @Date: 2025-06-10-21:50
 * @Description:
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController extends BaseController{

    private final UserService userService;

    private final COSUtils cosUtils;

    private final TokenUtils tokenUtils;

    /**
     * [U001]用户注册
     * @param jsonRequest
     * @return
     */
    @PostMapping("/register")
    public JsonResponse register(@RequestBody @Validated JsonRequest<UserRegisterDTO> jsonRequest){
        UserRegisterDTO data = jsonRequest.getData();
        String email = data.getEmail();
        String verificationCode = data.getVerificationCode();
        String password = data.getPassword();
        if (email == null || verificationCode == null || password == null) {
            throw new ApiException("参数错误");
        }

        userService.register(email, verificationCode, password);
        return JsonResponse.success("注册成功！");
    }

    /**
     * [U002]用户登录
     * @param jsonRequest
     * @return
     */

    @PostMapping("/login")
    public JsonResponse<Object> login(@RequestBody @Validated JsonRequest<UserLoginDTO> jsonRequest){
        UserLoginDTO data = jsonRequest.getData();
        String token = userService.login(data);
        HashMap<String, String> result = new HashMap<>();
        result.put("token", token);
        return JsonResponse.success(result);
    }

    /**
     * [U003]上传图片
     * @param file
     * @return
     */
    @PostMapping("/uploadImg")
    public JsonResponse<Object> uploadImg(@RequestParam("file") MultipartFile file) {
        String url = cosUtils.uploadPhoto(file);
        HashMap<String, String> map = new HashMap<>();
        map.put("url", url);
        return JsonResponse.success(map);
    }

    /**
     * [U004]修改头像
     * @param avatarModifyDTO
     * @return
     */
    @PostMapping("/avatarModify")
    public JsonResponse avatarModify(@RequestBody JsonRequest<AvatarModifyDTO> avatarModifyDTO){
        AvatarModifyDTO dto = avatarModifyDTO.getData();
        if(dto == null) throw new ApiException("未上传图片！");
        String avatarUrl = dto.getAvatarUrl();

        int uid = getUid();
        userService.avatarModify(uid, avatarUrl);
        return JsonResponse.success("修改成功！");
    }

    /**
     * [U005]获取个人信息
     * @return
     */
    @GetMapping("/getUserInfo")
    public JsonResponse<UserInfoVO> getUserInfo(){
        int uid = getUid();
        User user = userService.getById(uid);
        UserInfoVO userInfoVO = new UserInfoVO();
        BeanUtil.copyProperties(user, userInfoVO);
        return JsonResponse.success(userInfoVO);
    }

    /**
     * [U006]完善用户信息
     * @param jsonRequest
     * @return
     */
    @PostMapping("/userInfoComplete")
    public JsonResponse userInfoComplete(@Validated @RequestBody JsonRequest<UserInfoDTO> jsonRequest){
        UserInfoDTO data = jsonRequest.getData();
        if(data == null) throw new ApiException("提交信息为空！");

        int uid = getUid();
        User user = userService.getById(uid);
        BeanUtil.copyProperties(data, user);

        userService.updateById(user);
        return JsonResponse.success("修改成功！");
    }

    /**
     * [U007]退出登录
     * @return
     */
    @PostMapping("/exit")
    public JsonResponse<Object> exit() {
        tokenUtils.safeExit(getUid());
        return JsonResponse.success("安全退出成功");
    }

    /**
     * [U008]发送验证码
     * @param jsonRequest
     * @return
     */
    @PostMapping("/sendRegisterEmailCode")
    public JsonResponse<Object> sendRegisterEmailCode(@Validated @RequestBody JsonRequest<MailDTO> jsonRequest){
        MailDTO data = jsonRequest.getData();
        String email = data.getEmail();

        // 判断邮箱是否已被绑定
        if (userService.checkEmailIsBind(email)) {
            throw new ApiException("该邮箱已被绑定！");
        }

        // 发送注册邮箱验证码
        userService.sendRegisterVerification(email);
        return JsonResponse.success("发送成功");
    }
}
