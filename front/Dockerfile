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

# # FROM node:18-alpine

# # WORKDIR /app

# # COPY package.json .

# # RUN yarn install

# # COPY . .

# # EXPOSE 3000

# # CMD ["npm", "start"]

FROM node:18-alpine

COPY . /openvidu-call-react

WORKDIR /openvidu-call-react

# Install openvidu-call-react dependencies and build it
RUN yarn install
RUN yarn build

# Copy the built files to openvidu-basic-node's public folder
RUN cp -r ./build/ /openvidu-basic-node/public

# Install openvidu-basic-node dependencies
WORKDIR /opt/openvidu-basic-node
COPY entrypoint.sh /opt/openvidu-basic-node/entrypoint.sh
RUN yarn install

# Give executable permission to the entrypoint.sh script
RUN chmod +x /opt/openvidu-basic-node/entrypoint.sh

# Change back to the working directory of openvidu-call-react
WORKDIR /openvidu-call-react

# Cleanup unnecessary files
RUN rm -rf /openvidu-call-react

# Set the entrypoint to execute the entrypoint.sh script
ENTRYPOINT [ "/opt/openvidu-basic-node/entrypoint.sh" ]
