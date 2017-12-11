# VLACKJACK :spades: :hearts: :clubs: :diamonds:

a portfolio project by [Kevin Lee Drum](https://linkedin.com/in/kevinleedrum/)

## Play Now

https://kevinleedrum.github.io/vlackjack/

## Introduction

Vlackjack is an HTML5 blackjack game with only four production dependencies:
- [vue](https://vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [normalize.css](https://necolas.github.io/normalize.css/)
- [babel-runtime](https://babeljs.io/docs/plugins/transform-runtime/)

All of the animations are performed via CSS3, Vue transitions, and SVG animation.

## Yarn / NPM Scripts

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080/vlackjack
yarn dev

# build and bundle into docs directory for github pages
yarn build

# run unit tests
yarn test
```

## Docker
```
docker build -t  vlackjack .
docker build -t  vlackjack
```

## Blackjack Rules

Vlackjack follows many common casino rules for Blackjack with a few exceptions.  Insurance against dealer blackjack is not offered.  You may double down on any hand or split any pair, but you can not re-split.  Betting is simplified to one "coin" at the start of each hand, and blackjack pays 2-to-1.  The game is written to use six decks of cards, but it generously only shuffles after 75% of the cards have been played.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-Present, Kevin Lee Drum
