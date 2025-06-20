package com.homework.meal.utils;

import com.homework.meal.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

/**
 * @Author: JM
 * @Date: 2025-06-19-22:18
 * @Description:邮箱工具类
 */
@Component
public class MailUtils {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String mailFrom;

    /**
     * 发送邮件基础方法
     *
     * @param recipients 收件人数组
     * @param title      邮件标题
     * @param content    邮件正文
     * @param isHtml     是否html格式
     */
    private void sendMail(String[] recipients, String title, String content, boolean isHtml) {
        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMailMessage, true, "utf-8");
            messageHelper.setFrom(mailFrom, "吃点啥");
            messageHelper.setTo(recipients);
            messageHelper.setSubject(title);
            messageHelper.setText(content, isHtml);
            javaMailSender.send(mimeMailMessage);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new ApiException("邮件发送出错！");
        }
    }


    /**
     * 发送邮箱验证码
     *
     * @param recipient        收件人邮箱
     * @param verificationCode 验证码
     */
    @Async("taskExecutor")
    public void sendVerificationMail(String recipient, String verificationCode) {
        String template;
        String title;
        template = "你正在绑定【吃点啥】邮箱，你的验证码为 %s ，5分钟内有效。";
        title = "【吃点啥】邮箱绑定验证码";

        String mailBody = String.format(template, verificationCode);
        sendMail(new String[]{recipient}, title, mailBody, false);
    }

    /**
     * 生成邮箱验证码，码长6位，字母与数字混合
     *
     * @return 6位验证码
     */
    public String getVerificationCode() {
        // 增大数字权重，去除部分相似字母
        final String CHARACTERS = "0123456789012345678901234567890123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 6; i++) {
            sb.append(CHARACTERS.charAt((int) (Math.random() * (CHARACTERS.length()))));
        }
        return sb.toString();
    }

}
