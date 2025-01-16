# VLACKJACK ♠️♥️♣️♦️

> [!NOTE]
> As of January 2025, Vlackjack is now written in Vue 3! 🥳 If you would still like to view the source code for the Vue 2 / vuex
> version, see the [vue2 branch](https://github.com/kevinleedrum/vlackjack/tree/vue2).

## Play Now 🚀

https://kevinleedrum.github.io/vlackjack/

## Introduction

Vlackjack is a single-player HTML5 blackjack game built with [Vue 3](https://vuejs.org/).

![Screenshot](./public/screenshot.png)

All of the sounds in this game are from [Freesound](https://freesound.org) and have a CC0 license.

## NPM Scripts

```bash
# install dependencies
npm install

# serve for development
npm run dev

# build
npm run build
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

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-Present, Kevin Lee Drum
