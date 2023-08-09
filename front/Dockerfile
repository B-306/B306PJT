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

FROM node:18-alpine

# FROM nginx

WORKDIR /app

COPY package.json .

RUN yarn install

# RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "build"]