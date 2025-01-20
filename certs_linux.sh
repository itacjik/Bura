#!/bin/bash
# This script was made for Ubuntu/Debian distros but will probably work for others.
sudo apt install libnss3-tools -y
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
/usr/local/bin/mkcert -install

mkdir -p ~/dev/certs/
mkcert -cert-file ~/dev/certs/bura.loc.dev.crt -key-file ~/dev/certs/bura.loc.dev.key bura.loc.dev
