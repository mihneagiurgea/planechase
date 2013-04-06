"""Fetch cards from magiccards.info & save to public/cards."""

import re
import urllib

EXTRAS_URL = 'http://magiccards.info/extras.html'
CARD_URL = 'http://magiccards.info/extras/'


def iter_tr_lines():
    html = urllib.urlopen(EXTRAS_URL).read()
    # Remove newlines, they're messy.
    html = html.replace('\n', '')
    lines = re.findall('<tr.*?>(.*?)</tr>', html)
    print 'Found %d initial lines' % len(lines)
    return lines


def iter_cards():
    for line in iter_tr_lines():
        match = re.search(r'<td><a href="(?P<link>.*?)">.*?</td>.*?<td>(?P<type>.*?)</td>.*?<td>.*?</td>', line)
        if match:
            link, card_type = match.groups()
            if card_type in ('Phenomenon', 'Plane'):
                yield link


def download_card(card):
    """Download card from a given relative path.

    Need to convert from
        /extra/phenomenon/planechase-2012-edition/chaotic-aether.html

    to url like this:

        http://magiccards.info/extras/phenomenon/planechase-2012-edition/chaotic-aether.jpg
    """
    card = card.replace('.html', '.jpg')
    name = card.rsplit('/', 1)[1]
    save_to = '../public/cards/%s' % name

    url = CARD_URL + card[7:]
    print 'Donwloading %s --> %s' % (url, save_to)
    urllib.urlretrieve(url, save_to)


def main():
    for card in iter_cards():
        download_card(card)
    print 'Done.'

if __name__ == '__main__':
    main()
