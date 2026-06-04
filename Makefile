build:
	rm -rf frontend/dist
	npm run build --prefix frontend
install:
	npm ci
start:
	npx start-server -s ./frontend/dist