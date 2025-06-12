FROM openjdk:11-jre-slim

WORKDIR /work

ENV TZ=Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

## 安装字体（Debian 兼容）
#RUN set -xe \
#    && apt-get update \
#    && apt-get install -y --no-install-recommends \
#        fontconfig \
#        fonts-dejavu \
#    && rm -rf /var/lib/apt/lists/*

ADD target/*.jar meal.jar

EXPOSE 8088

ENTRYPOINT ["java","-jar","meal.jar"]