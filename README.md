# ChadGPT

Forked from [cocktailpeanut/dalai](https://github.com/cocktailpeanut/dalai)

## About

A Cha(d)tBot that leverages [Stanford's Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html) Model.

Uses invisible prompt engineering to coerce the predictive LLM into an "informative and helpful" virtual assistant.

## Requirements

~4GB of Ram

## Installation

```
npm install
./chad alpaca install 7B
./chad serve
```

## Todos

- Rebuild frontend in React
- Parse out responses for a cleaner chat interface
- Stop model if it attempts to respond for the user
- Fine tune the invisible prompts

## Disclaimer

The Alpaca model is uncensored and may contain bais and misinformation. Use at your own risk.