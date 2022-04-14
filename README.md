# apps-portal
Apps Portal

### Built With
-   Django
-   Django REST Framework
-   PostgreSQL
-   React
-   Material UI

### Prerequisites
-   Docker 20.10.7
-   docker-compose 1.29.2

### Commands
 - to shut down the Docker containers: ```docker-compose down```
 - to prune volumes: ```docker volume prune```

### How to use?
1. clone the repository -> ```git clone https://github.com/gedomer/apps-portal.git```
2. navigate to the `apps-portal` directory -> ```cd apps-portal```
3. copy `config/env.sample` file to `backend/.env` -> ```cp config/env.sample .env```
4. start containers -> ```docker-compose up```
5. after container started open second terminal
6. in second terminal type: ```docker-compose run backend python manage.py migrate```
7. in second terminal type: ```docker-compose run --volume $PWD/fixtures/:/backend/fixtures/ backend python manage.py loaddata fixtures/user.json```
8. in second terminal type: ```docker-compose run --volume SCREENSHOT_FOLDER:/backend/files/ backend python manage.py import_application_data --folder files```

SCREENSHOT_FOLDER: absolute path of the `files` directory. e.g. `/home/omer/Download/files/` Onur Alp Derinoz sent me this folder as an attachment to mail.

9. visit ```http://localhost:3000```
10. default credentials -> username: appz,  password: `123456&*


## Release History
* 0.0.1
* Work in progress

## Meta
- gedomer – [@gedomer](https://github.com/gedomer)
- distributed under the MIT license. See ``LICENSE`` for more information.
- time spent: 15 hr.