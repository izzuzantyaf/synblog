*Notes: all of these command are based on Linux, if you are using other OS please adjust on your own*

## How to run
Clone this repository
```bash
git clone https://github.com/izzuzantyaf/synblog.git && cd synblog
```
Create a file named `.env.local` and fill the variables
```bash
cp .env.example .env.local
```
Right here you can choose using Docker or manual

## Using Docker
Prerequisites
- Install Docker and docker compose

Run using 
```bash
docker compose up
```

## Manual
Prerequisites
- Install Node.js >= v18.17.0

Install dependencies
```bash
npm install
```
Start the development server
```bash
npm run dev
```
And that's it, by default you can access through [http://localhost:3000](http://localhost:3000)