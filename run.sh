#!/bin/bash
name=erdmui

docker run -p 3000:3000 -p 3030:3030 --name $name --env-file env $name
