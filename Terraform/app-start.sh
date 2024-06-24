#!/bin/bash
echo "fixing path"
export PATH=$PATH:/root/.nvm/versions/node/v20.11.0/bin
cd /opt/colman-clouds-project/Back-End && nohup npm run start &
cd /opt/colman-clouds-project/Front-End && nohup npm run build
cd /opt/colman-clouds-project/Front-End/dist && nohup serve -s & 