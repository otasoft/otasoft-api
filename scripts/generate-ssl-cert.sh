openssl req -x509 -newkey rsa:4096 -sha256 -keyout ./config/private-key.key -out ./config/public-cert.crt -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=api.otasoft.org" -nodes
