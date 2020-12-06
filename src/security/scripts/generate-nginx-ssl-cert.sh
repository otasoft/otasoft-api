openssl req -x509 -newkey rsa:4096 -sha256 -keyout ../secrets/private-key.key -out ../secrets/public-cert.crt -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=localhost" -nodes
