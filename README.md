SourceUndead
============

Multi-player [in progress] zombie game built with NodeJS, Express.IO, MySQL and AngularJS (a modified MEAN stack)

I left out my settings.js file because it has private credentials in it. But here is the schema I used (a simple JS Object) to have my settings all in one file:

    var settings = {};
    
    settings.db = {};
    
    settings.db.user = "what is html"; //not real
    settings.db.database = "dat db"; //not my db
    settings.db.password = "asswordp"; //not my password either
    
    module.exports = settings;
