SourceUndead
============

Multi-player [in progress] zombie game built with MySQL, Express, and NodeJS (The MEN stack).

I left out my settings.js file because it has private credentials in it. But here is the schema I used (a simple JS Object) to have my settings all in one file:

    var settings = {};
    
    settings.db = {};
    
    settings.db.user = "what is html"; //not real
    settings.db.database = "dat db"; //not my db
    settings.db.password = "asswordp"; //not my password either
    
    module.exports = settings;

Setting up your own server is easy! The following steps should help you create and setup your server.

1. Install an Ubtuntu 14.04 instance
2. Create your non-root user and give sudo permissions
3. Install a mysql server by running `sudo apt-get install mysql`
4. Install npm by running `sudo apt-get install npm`
5. Run `npm install` to install the project dependencies
6. Login to mysql using the credentials you created
7. Run `database.sql` to create the database and tables
8. Finally -- `node server.js` to start up the server!

Game Premise:

11 players begin a match, all scattered around the map. One player is randomly infected by the virus! The zombie must then locate and infect all remaining humans to win. To survive the zombie, players must find each other, band together and fight back by crafting fortified cells, weapons, and more. BUT BEWARE! For each infection, the zombie will get stronger, so pay attention to who has infected the most humans!

The game is won when either the humans have destroyed every zombie, or the zombies have infected every human.

This game is a work in progress, so please feel free to contribute ideas and or make pull requests!
