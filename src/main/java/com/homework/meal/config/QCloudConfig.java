package com.homework.meal.config;

import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.http.HttpProtocol;
import com.qcloud.cos.region.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: JM
 * @Date: 2025-06-13-15:48
 * @Description: cos客户端
 */

@Configuration
public class QCloudConfig {

    @Autowired
    private QCloudProperties qCloudProperties;

    @Bean
    public COSClient cosClient(){
        // 初始化用户身份信息(secretId, secretKey)
        COSCredentials cred = new BasicCOSCredentials(qCloudProperties.getSecretId(), qCloudProperties.getSecretKey());
        // 设置bucket的区域
        ClientConfig clientConfig = new ClientConfig(new Region(qCloudProperties.getRegion()));
        clientConfig.setHttpProtocol(HttpProtocol.https);
        // 生成cos客户端
        COSClient cosclient = new COSClient(cred, clientConfig);
        return cosclient;
    }
}
