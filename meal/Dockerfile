FROM openjdk:8

WORKDIR /work

ENV TZ=Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD target/*.jar work.jar

EXPOSE 8686

ENTRYPOINT ["java","-jar","work.jar"]