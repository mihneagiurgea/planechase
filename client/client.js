Meteor.startup(function () {

    // Contact the server to find the list of cards, asynchronously.
    Meteor.call('getCards', 1, 5, function (error, result) {
        if (error) {
            console.log('Method getCards error: ' + JSON.stringify(error));
            alert('Something went wrong, please refresh.');
            return;
        }
        console.log('Method getCards result: ' + result);
        cards = result;
        shuffle(cards);
    });

});

Template.play.events({
    'click #die': roll
});

Template.play.rendered = function() {
    // Assuming you're using jQuery
    $('body').on('keyup', function (e) {
        // if (typeof console !== 'undefined')
        //     console.log("Key up: " + e.which);
        switch (e.which) {

            case 82: // "r" key
                roll();
                break;
            case 39: // "->" right arrow
            case 80: // "p" key
                planeswalk();
                break;

            case 37: // "<-" left arrow
            case 85: // "u" key
                undoPlaneswalk();
                break;
        }
    });
};

var current = -1;
var cards = null;

function rand(limit) {
    // Returns a random integer in interval [0, limit).
    return Math.floor(Math.random() * limit);
}

function shuffle(arr) {
    N = arr.length;
    for (i = 0; i < N; i++) {
        r = i + rand(N - i);
        if (r != i) {
            t = arr[i];
            arr[i] = arr[r];
            arr[r] = t;
        }
    }
}

function setPlainImage() {
    // Set the image to the current plain.
    if (current == -1)
        img_src = '0.jpg';
    else
        img_src = 'cards/' + cards[current];
    $('#planecard').attr('src', img_src);
}

function planeswalk() {
    // If the cards resource is not yet ready (getCards is async), do nothing.
    if (cards == null) return;

    current++;
    if (current >= cards.length) {
        // Re-shuffle deck & start-over.
        shuffle(cards);
        current = 0;
    }
    setPlainImage();
}

function undoPlaneswalk() {
    if (current >= 0) {
        current--;
        setPlainImage();
    }
}

function roll() {
    d6 = rand(6) + 1;
    switch (d6) {
        case 1:
            color = 'Blue';
            result = 'Planewalk';
            die_image = 'planeswalk.jpg';
            break;
        case 6:
            color = 'Red';
            result = 'Chaos';
            die_image = 'chaos.jpg';
            break;
        default:
            color = 'DarkGray';
            result = 'blank';
            die_image = 'blank.jpg';
    }
    console.log('Roll result: ' + result + ' (' + d6 + ')');
    $('#die').attr('src', die_image);
    $('#dieResult').css('color', color);
    $('#dieResult').text(result);
    $('#dieResult').stop(true, true);
    $('#dieResult').show();
    $('#dieResult').fadeOut(2000);
}
