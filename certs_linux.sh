#!/bin/bash
# This script was made for Ubuntu/Debian distros but will probably work for others.
sudo apt install libnss3-tools -y
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
/usr/local/bin/mkcert -install

mkdir -p ~/dev/certs/
mkcert -cert-file ~/dev/certs/app.lottony.dev.crt -key-file ~/dev/certs/app.lottony.dev.key app.lottony.dev
mkcert -cert-file ~/dev/certs/lottony.dev.crt -key-file ~/dev/certs/lottony.dev.key lottony.dev
mkcert -cert-file ~/dev/certs/admin.lottony.dev.crt -key-file ~/dev/certs/admin.lottony.dev.key admin.lottony.dev
mkcert -cert-file ~/dev/certs/grafana.lottony.dev.crt -key-file ~/dev/certs/grafana.lottony.dev.key grafana.lottony.dev
