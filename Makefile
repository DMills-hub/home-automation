run-backend: 
	cd backend; docker-compose up -d; flask run --debug

run-app:
	cd app; npm start