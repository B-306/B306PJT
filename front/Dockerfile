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

# # FROM nginx

# WORKDIR /app

# COPY package.json .

# RUN yarn install

# # RUN yarn build

# COPY . .

# EXPOSE 3000

# CMD ["yarn", "start"]

######################################################

FROM node:18-alpine as builder

WORKDIR /app
COPY ./package.json /app

RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx
EXPOSE 3000
COPY --from=builder /app/build /user/share/nginx/html