#! /usr/bin/env bash

echo -e "*** Starting installation... ***"

echo -e "*** Updating packages ***"
apt-get -qq update

echo -e "*** Installing base packages ***"
apt-get -y install vim curl git libfontconfig > /dev/null 2>&1
apt-get update

echo -e "*** Installing Node and NPM ***"
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs
apt-get install --yes build-essential

npm cache clean -f
npm install -g n
n 4.3.1

echo -e "*** Installing Gulp and Bower ***"
npm install -g gulp@3.9.0
npm install -g bower@1.7.7

echo -e "*** Configuring hosts and proxies ***"
sudo sed -i "2i0.0.0.0 localhost" /etc/hosts

echo "node -v"
node -v
echo "npm -v"
npm -v
echo "bower -v"
bower -v
echo "gulp -v"
gulp -v
