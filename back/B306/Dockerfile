#FROM ubuntu:latest
#LABEL authors="SSAFY"
#
#ENTRYPOINT ["top", "-b"]

FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]

