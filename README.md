# meal-reviews-in-ranking

# Init Set Up

## 1. clone repo
```
git clone https://github.com/ibu00024/meal-reviews-in-ranking.git
cd meal-reviews-in-ranking
```

## 2. setting env
cp .env.example .env
and add `GOOGLE_MAPS_API_KEY` in `.env` file

```
GOOGLE_MAPS_API_KEY = 'your_api_key'
```

## 3. module install
```
cd server
npm install
```

```
cd client
npm install
```

## Init Database:
```
docker compose build
docker compose up -d
```

# Start-Up
## server(backend) start-up
```
cd client 
npm run dev
```

## client(frontend) start-up
```
cd server 
npm run dev
```
