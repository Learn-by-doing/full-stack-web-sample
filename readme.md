# Sample full-stack web

This is the sample full-stack web site that we worked on during the meetup on June 20th, 2016

## Requirements

Before you can run this project, you need the following:
* [Nodejs](https://nodejs.org/en/) - If you are using Mac, I recommend installing nodejs via [nvm](https://github.com/creationix/nvm).
* [MySQL](https://www.mysql.com/) with [phpMyAdmin](https://www.phpmyadmin.net/) (or some other visual tool for administrating your MySQL database). If you are using Windows or Mac, I recommend installing [XAMPP](https://www.apachefriends.org/index.html). It includes both MySQL server and phpMyAdmin.
* [Git](https://git-scm.com/)


## Goals

Create simple web page to display data from a database

* The nodejs app does the following:
  * Connects to database (knexjs)
  * Gets data from database table (knexjs)
  * Renders the data in an HTML template (handlebars)
  * Starts a web server (express) to connect everything together


## Getting Started

Using phpMyAdmin (or some other MySQL admin tool):
* Create a database named __learn_web_app__
* Create a table in the database named __books__ with the following structure:
```sql
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;
```
* Add a user to the __learn_web_app__ database with the same name. Sample SQL statement to do this:
```sql
CREATE USER 'learn_web_app'@'localhost' IDENTIFIED BY  'password';

GRANT USAGE ON * . * TO  'learn_web_app'@'localhost' IDENTIFIED BY  'password' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

GRANT ALL PRIVILEGES ON  `learn_web_app` . * TO  'learn_web_app'@'localhost';
```
* Insert some data into the __books__ table

Clone this repository to your local environment by using the following command from a terminal window:
```
git clone https://github.com/Learn-by-doing/full-stack-web-sample.git
```

Change into the directory that was just created:
```
cd full-stack-web-sample
```

Install node modules:
```
npm install
```

Run the web server:
```
node index.js
```

Open your browser and navigate to the following URL:
[localhost:3000/books](http://localhost:3000/books)

You should see a list of the books from your database.
