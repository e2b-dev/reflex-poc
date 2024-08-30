# You can use most Debian-based base images
FROM python:3.9-slim

WORKDIR /home/user

# COPY start-command.sh /home/user/start-command.sh

RUN apt update
RUN apt install -y unzip curl
RUN pip3 install --no-cache-dir reflex

RUN reflex init --template=blank --name=e2b
