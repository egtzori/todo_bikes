db_start:
	docker-compose up -d

db_stop:
	docker-compose stop

db_connect:
	PGPASSWORD=admin@123999 psql -U postgres -h localhost -p 5439
