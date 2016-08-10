# Pasoor

**Pasoor** provides a simple API for game cards. The code is based on [node-cards](https://github.com/kbjr/node-cards).

## Installation

```
npm install pasoor
```

## Usage

You can create an empty deck:

```js
import { Deck } from 'pasoor';
const deck = new Deck();
```

Or with a preset:

```js
import { Deck, presets } from 'pasoor';
const deck = Deck.create(presets.shelem);
```
