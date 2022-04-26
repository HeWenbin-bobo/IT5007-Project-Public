# NUS-Crypto-Exchange-FrontEnd

## Git
* https://github.com/HeWenbin-bobo/IT5007-Project-Public.git

## Port Usage
* api server: 3000
* ui server: 8000
* rabbitmq: 5672
* rabbitmq web management: 15672

## Setup
* ```git clone https://github.com/HeWenbin-bobo/IT5007-Project-Public.git```
* ```cd IT5007-Project-Public```
* ```git checkout origin/AWS_withRabbitMQ_withMatchingEngine```
* (Automatically setup)
    * ```npm run start```
        * only need to enter ```Ctrl+A+D``` when creating screen
            * one for mongodb
            * one for api server
            * one for ui server
            * one for matching engine
* (Manully setup)
    * ```service rabbitmq-server restart```
    * (for api server)
        * ```cd api```
        * ```npm run api```
            * enter ```Ctrl+A+D```
    * (for ui server)
        * ```cd ui```
        * ```npm run ui```
            * enter ```Ctrl+A+D```
        * If need to recompile, run following commands:
            * ```npm run fast```
    * (for MatchingEngine)
        * ```cd MatchingEngine```
            * ```screen python3 main.py```

## Web Browser
* Enter ```http://35.160.80.61:8000``` on web browser

## Functions
* User registration (```/#/register``` page)
    * You can choose to register through Google API
* User login (```/#/login``` page)
    * You can choose to login through Google API
* Buy something (Buy/Sell button on ```Assets``` tag)
* Sell something (Buy/Sell button on ```Assets``` tag)
* Convert one type to another type (Buy/Sell button on ```Assets``` tag)
* Topup money (on ```Assets``` tag)
* View information of all Cryptocurrency (```Trade``` tag)
* Template for blog (```Blog``` tag)
* Update profile (```Profile``` tag)
* Update password for Non-Google logged in users (```Setting``` tag)

## Database structure(MongoDB)
* database name: NUSSwap
* collections:
    * types: Record predefined types that can be traded
        * id: *[Int]* Unique
        * symbol: *[String]* Unique
        * price: *[Float]*
    * wallet: Record what the user have bought
        * id: *[Int]*
        * userId: *[Int]*
        * symbol: *[String]*
        * balance: *[Float]*
    * history: Record the change process of balance
        * id: *[Int]*
        * userId: *[Int]*
        * time: *[String]*
        * balance: *[Float]*
    * historyCounter: Record the number of history items
        * _id: *[String]*
        * current: *[Int]*
    * users: Record the information of users
        * id: *[Int]* Unique
        * email: *[String]* Unique
        * firstName: *[String]*
        * lastName: *[String]*
        * balance: *[String]*
    * userCounter: Record the number of users
        * _id: *[String]*
        * current: *[Int]*
    * currentUser: Record the information of current user
        * _id: *[String]*
        * currentId: *[Int]*
        * email: *[String]*
    * orders: Record the information of orders
        * id: *[Int]*
        * userId: *[Int]*
        * currentState: *[String]*
        * symbol: *[String]*
        * quantity: *[Int]*
        * price: *[Double]*
        * amount: *[Double]*
    * orderCounters: Record the number of orders
        * _id: *[String]*
        * current: *[Int]*
    * rabbitmq: Record the information of rabbitmq messages
        * id: *[Int]*
        * userId: *[Int]*
        * state: *[String]*
        * symbol: *[String]*
        * orderType: *[String]*
        * side: *[String]*
        * quantity: *[Int]*
        * price: *[Double]*
        * tradeId: *[Int]*
        * note: *[String]*
    * rabbitmqCounters: Record the number of rabbitmq messages
        * _id: *[String]*
        * current: *[Int]*

## Message structure(RabbitMQ)
* ******

## RabbitMQ installation
* ```sudo apt-get install erlang-nox```
* ```erl```
* ```wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -```
* ```sudo apt-get update```
* ```sudo apt-get install rabbitmq-server```
* ```systemctl status rabbitmq-server```
* ```sudo service rabbitmq-server start```
* ```sudo service rabbitmq-server stop```
* ```sudo service rabbitmq-server restart```
* ```sudo rabbitmq-plugins enable rabbitmq_management```
* ```sudo service rabbitmq-server restart```
* ```sudo rabbitmqctl add_user test test```
* ```sudo rabbitmqctl set_user_tags test administrator```
* ```sudo rabbitmqctl set_permissions -p / test ".*" ".*" ".*"```

## Python3 installation
* ```sudo apt-get update```
* ```sudo apt-get install python3```
* ```sudo apt install python3-pip```
* ```pip install pymongo```
* ```pip install sortedcontainers```
* ```pip install pika```