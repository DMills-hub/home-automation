run-dev:
	@run-app;
	@run-backend;

run-backend: 
	cd backend; docker-compose up -d; source ./bin/activate; flask run --debug

run-app:
	cd app; npm start