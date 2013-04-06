if (Meteor.isClient) {

}

if (Meteor.isServer) {

    Meteor.startup(function () {
        // code to run on server at startup
        var fs = __meteor_bootstrap__.require('fs');
        // var files = fs.readdirSync(); //Etc.
    });
}
