if (Meteor.isClient) {

}

if (Meteor.isServer) {

    Meteor.startup(function () {
        // code to run on server at startup


    });

    Meteor.methods({
        'getCards': function () {
            try {
                var fs = Npm.require('fs');

                function endsWith(str, suffix) {
                    console.log(str + ' <- ' + suffix);
                    return str.indexOf(suffix, str.length - suffix.length) !== -1;
                }

                files = fs.readdirSync('./public/cards');
                cards = _.filter(files, function(f) { return endsWith(f, '.jpg'); });

                return cards;
            } catch (err) {
                return JSON.stringify(err);
            }
        }
    });
}
