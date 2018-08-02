# VLACKJACK :spades: :hearts: :clubs: :diamonds:

## :rocket: Play Now

https://kevinleedrum.github.io/vlackjack/

## Introduction

Vlackjack is a single-player HTML5 blackjack game built with [vue](https://vuejs.org/) and [vuex](https://vuex.vuejs.org/) with optional basic strategy hints.

All of the animations are performed via CSS3, Vue transitions, and SVG animation.

## Yarn / NPM Scripts

``` bash
# install dependencies
yarn

# serve with hot reload
yarn serve

# build
yarn build

# run unit tests
yarn test:unit
```

## Rules
- To keep the game simple, the initial bet is always one coin
- 6 Decks, shuffled after 75% have been played
- Blackjack pays 2-to-1
- Dealer stands on any 17 (`S17`)
- Double down on any two cards (`D2`)
- Double down after splitting (`DAS`) (except Aces)
- No resplitting (`NR`)
- No insurance (`NI`)

The basic strategy suggestions are based on this ruleset.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-Present, Kevin Lee Drum
