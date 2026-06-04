build:
	rm -rf frontend/dist
	npm run build
install:
	npm ci
start:
	npx start-server -s ./frontend/dist