# SOC Ticketing

Passion project for helping SOC Ticketing and Alert

<div align="center">

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## Quick Start Guide

1. Run npm install
    
```
$ npm install
```
2. Config postgresql pg_hba.conf for linux if using postgres user
```
$ sudo -u postgres psql -c "SHOW hba_file;"
$ sudo nano "/path of the hba_file"
_____________________________________________________

# Make sure this line is available
# IPv4 localhost
host    all     all     127.0.0.1/32    scram-sha-256

# IPv6 localhost
host    all     all     ::1/128         scram-sha-256

# Restart the postgresql service
$ sudo systemctl restart postgresql
```
3. Run npx prisma migrate dev
```
$ npx prisma migrate dev
```