# 🃏 Get Scritched

Scritch is a card game about betting how many hands you think you can take in a given round. It's best played around a dining room table in the winter time.

## Game Logic

The general gameplay progresses through a set of rounds up to a max hand size, then back down all the way. Each round a new suit is trump, whose cards beat all other suits. Players look at their hands and make a bet on how many hands they can win. The number of bets cannot equal the number of hands possible to be won, someone must be a loser (maybe more than one).

1. At the beginning of the game, each player is entered into the system by name in the order they are seated.
2. Once the game is started, we start the first round with 1 card, and Clubs is trump. People make their bets, and when all bets are in they can play out the round. At the end of the round, scores are marked as scritched or gotten.
3. Players progress through the rounds with the number of cards increasing until the max specified. Trump progresses in alphabetical order, Clubs, Diamonds, Hearts, Spades, and finally no trump. This repeats cyclically.
4. Once the max number is reached, the game number of cards counts back down to 1 after which the game ends, and the score are tallied up.

## Development

This application is built using [Vite](https://vite.dev/), [React](https://react.dev/), and [Chakra](https://www.chakra-ui.com/). To get it running locally:

```
npm install
npm run dev
```

To create and view a production version:

```
npm run build
npm run preview
```

## Deployment

The application is built to be hosted on Github Pages. Their is an action when changes are committed to `main` which automatically builds and publishes them.

## License

The code here is released under GPLv3. Please see the [license page](/LICENSE) to read about it.
