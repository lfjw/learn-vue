#!/usr/bin/env sh
git config --global user.email "web_Jiwei@163.com"
git add .
git commit -m '更新内容'
git pull
git push
git config --global user.email "jiwei@jiweideMacBook-Pro.local"
