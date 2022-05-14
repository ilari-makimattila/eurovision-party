import { writable } from 'svelte/store';

const gameKey = 'eurovisionPartyState';

const updater = (key) => (value) => localStorage.setItem(key, JSON.stringify(value));

const storedGameState = JSON.parse(localStorage.getItem(gameKey) || '{}');

export const gameState = writable(storedGameState);

gameState.subscribe(updater(gameKey));