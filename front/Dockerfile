# FROM node:18-alpine

# COPY . ./openvidu-call-react

# WORKDIR /openvidu-call-react

# # Install openvidu-call-react dependencies and build it
# RUN yarn install 
    
# RUN yarn build 

# RUN /bin/sh -c /bin/sh cp -r ./build/ ./openvidu-basic-node/public

# # Copy openvidu-basic-node
# RUN /bin/sh -c /bin/sh cp -r ./openvidu-basic-node /opt/openvidu-basic-node 

# RUN /bin/sh -c /bin/sh rm -rf ../openvidu-call-react

# # Install openvidu-basic-node dependencies
# RUN /bin/sh -c yarn --prefix /opt/openvidu-basic-node install

# RUN chmod +x /path/to/entrypoint.sh

# WORKDIR /opt/openvidu-basic-node

# COPY entrypoint.sh /path/to/entrypoint.sh

# ENTRYPOINT [ "./entrypoint.sh" ]


#####################원래 하던 거###########################


# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN yarn install
  
# COPY . .

# EXPOSE 3000

# CMD ["yarn", "start"]

######################################################


# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN yarn install
  
# COPY . .

# EXPOSE 3000

# CMD ["yarn", "build"]

## 502 Bad Gateway


########################################################

FROM node:18-alpine as builder

WORKDIR /app
COPY ./package.json /app

RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx
EXPOSE 3000
COPY --from=builder /app/build /usr/share/nginx/html

## 502 Bad Gateway

#######################################################


# Node 이미지를 기반으로 애플리케이션을 빌드합니다.
# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package.json .
# COPY yarn.lock .

# RUN yarn install

# COPY . .

# # 프로덕션 모드로 애플리케이션을 빌드합니다.
# RUN yarn build

# # Nginx 이미지를 기반으로 프로덕션 환경을 설정합니다.
# FROM nginx

# # 빌드된 애플리케이션 파일을 Nginx 서버에 복사합니다.
# COPY --from=build /app/build /usr/share/nginx/html

# # 포트를 열어 Nginx 서버를 실행합니다.
# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]

## 502 Bad Gateway