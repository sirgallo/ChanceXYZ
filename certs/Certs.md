# Certs

To generate local `self-signed` certs, run:

```bash
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout <name>.key -out <name>.crt -subj "/CN=<host>/O=<host>"
  
  cat <name>.key <name>.crt > <name>.pem
```