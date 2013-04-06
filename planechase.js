if (Meteor.isClient) {

}

if (Meteor.isServer) {

    Meteor.startup(function () {
        // code to run on server at startup


    });

    Meteor.methods({
        'getCards': function () {
            var fs = Npm.require('fs');

            cards = fs.readdirSync('public/cards');
            console.log('Read ' + cards.length + ' cards from fs.');

            return cards;
        }
    });
}
