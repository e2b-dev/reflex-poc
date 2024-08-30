# You can use most Debian-based base images
FROM python:3.9-slim

WORKDIR /home/user

RUN apt update
RUN apt install -y unzip curl
RUN pip3 install --no-cache-dir reflex

RUN reflex init --template=blank --name=e2b

# Dry-run for 15s for caching purposes
RUN reflex run & sleep 15 && kill $!
