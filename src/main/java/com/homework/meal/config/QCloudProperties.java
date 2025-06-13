package com.homework.meal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: JM
 * @Date: 2025-06-13-15:48
 * @Description: cos配置类
 */

@Configuration
@ConfigurationProperties(prefix = "qcloud")
@Data
public class QCloudProperties {
    private String secretId;
    private String secretKey;
    private String region;
    private String URL;
    private String bucketName;
}
