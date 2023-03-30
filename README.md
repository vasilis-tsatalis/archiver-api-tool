# archiver-api-tool
Zipping functionalities for different cases

# Create SSL Commands

```bash
$ cd archiver-api-tool
$ mkdir certs
$ cd certs
```

```bash
openssl genrsa -out key.pem
```

```bash
openssl req -new -key key.pem -out csr.pem
```

```Info SSL Data
Country Name (2 letter code) []:GR
State or Province Name (full name) []:Attica
Locality Name (eg, city) []:Athens
Organization Name (eg, company) []:Test Company
Organizational Unit Name (eg, section) []:Software Development
Common Name (eg, fully qualified host name) []:Test Company Name
Email Address []:test@email.com
```

```bash
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

# Create Environment File

```bash
$ cd archiver-api-tool
$ touch .env
$ vim .env
```

# Create Logs Directory

```bash
$ cd middleware
$ mkdir logs
```

# Create Zip files Directory

```bash
$ cd ./
$ mkdir assets
$ cd assets
$ mkdir zip_files
```

# Create Temporary Directory

```bash
$ cd ./
$ mkdir temp
```

# Browser website
https://localhost:{PORT}/{BASE_URL}