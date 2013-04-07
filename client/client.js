Meteor.startup(function () {

    // Hacky, improve this!

    cards = ['30.jpg', '31.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '62.jpg', '63.jpg',
    '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg', '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg',
    '75.jpg', '76.jpg', '77.jpg', '78.jpg', '79.jpg', '9.jpg', 'academy-at-tolaria-west.jpg', 'agyrem.jpg', 'akoum.jpg',
    'aretopolis.jpg', 'astral-arena.jpg', 'bant.jpg', 'bloodhill-bastion.jpg', 'celestine-reef-pre-release-promo.jpg',
    'chaotic-aether.jpg', 'cliffside-market.jpg', 'edge-of-malacol.jpg', 'eloren-wilds.jpg', 'feeding-grounds.jpg',
    'fields-of-summer.jpg', 'furnace-layer.jpg', 'gavony.jpg', 'glen-elendra.jpg', 'glimmervoid-basin.jpg', 'goldmeadow.jpg',
    'grand-ossuary.jpg', 'grixis.jpg', 'grove-of-the-dreampods.jpg', 'hedron-fields-of-agadeem.jpg', 'horizon-boughs-gateway-promo.jpg',
    'immersturm.jpg', 'interplanar-tunnel.jpg', 'isle-of-vesuva.jpg', 'izzet-steam-maze.jpg', 'jund.jpg', 'kessig.jpg',
    'kharasha-foothills.jpg', 'kilnspire-district.jpg', 'krosa.jpg', 'lair-of-the-ashen-idol.jpg', 'lethe-lake.jpg',
    'llanowar.jpg', 'minamo.jpg', 'mirrored-depths.jpg', 'morphic-tide.jpg', 'mount-keralia.jpg', 'murasa.jpg',
    'mutual-epiphany.jpg', 'naar-isle.jpg', 'naya.jpg', 'nephalia.jpg', 'norns-dominion.jpg', 'onakke-catacomb.jpg',
    'orochi-colony.jpg', 'orzhova.jpg', 'otaria.jpg', 'panopticon.jpg', 'planewide-disaster.jpg', 'pools-of-becoming.jpg',
    'prahv.jpg', 'quicksilver-sea.jpg', 'ravens-run.jpg', 'reality-shaping.jpg', 'sanctum-of-serra.jpg', 'sea-of-sand.jpg',
    'selesnya-loft-gardens.jpg', 'shiv.jpg', 'skybreen.jpg', 'sokenzan.jpg', 'spatial-merging.jpg', 'stairs-to-infinity.jpg',
    'stensia.jpg', 'stronghold-furnace.jpg', 'takenuma.jpg', 'talon-gates.jpg', 'tazeem-release-promo.jpg', 'tember-city.jpg',
    'the-aether-flues.jpg', 'the-dark-barony.jpg', 'the-eon-fog.jpg', 'the-fourth-sphere.jpg', 'the-great-forest.jpg',
    'the-hippodrome.jpg', 'the-maelstrom.jpg', 'the-zephyr-maze.jpg', 'time-distortion.jpg', 'trail-of-the-mage-rings.jpg',
    'truga-jungle.jpg', 'turri-island.jpg', 'undercity-reaches.jpg', 'velis-vel.jpg', 'windriddle-palaces.jpg'];
    shuffle(cards);

    // Contact the server to find the list of cards, asynchronously.
    // Meteor.call('getCards', 1, 5, function (error, result) {
    //     if (error) {
    //         console.log('Method getCards error: ' + JSON.stringify(error));
    //         alert('Something went wrong, please refresh.');
    //         return;
    //     }
    //     console.log('Method getCards result: ' + result);
    //     cards = result;
    //     shuffle(cards);
    // });

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
    if (cards == null) {
        if (typeof console !== 'undefined')
            console.log("cards resource not ready.");
        return;
    }

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
