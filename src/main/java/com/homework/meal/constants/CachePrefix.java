package com.homework.meal.constants;

/**
 * @author Leslie Leung
 * @description 缓存key前缀
 * @date 2021/11/10
 */
public class CachePrefix {
    private CachePrefix() {
        throw new IllegalStateException();
    }

    public static final String TOKEN_PREFIX = "user_%s"; // token
    public static final String VERIFICATION_CODE_PREFIX = "verification_code_%s"; // 验证码
    public static final String VERIFICATION_EMAIL_PREFIX = "verification_email_%s"; // 验证码邮箱
    public static final String EMAIL_LOCK = "email_lock_user_%s"; // 邮件发送锁
    public static final String RETRACT_ORDER= "retract_order_%s"; // 撤销订单

    public static final String STUDENT_UPLOAD_MATERIAL = "student_upload_material_%s"; //学生端上传贫困生证明材料
    public static final String SOUTH_ADMIN_SAVE_ANNOUNCEMENT = "south_admin_save_announcement";//南校区管理员保存公告数据
    public static final String NORTH_ADMIN_SAVE_ANNOUNCEMENT = "north_admin_save_announcement";//北校区管理员保存公告数据

}
