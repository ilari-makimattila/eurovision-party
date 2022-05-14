import { writable } from 'svelte/store';

const gameKey = 'eurovisionPartyState';
const voteKey = 'eurovisionPartyVotes';

const updater = (key) => (value) => localStorage.setItem(key, JSON.stringify(value));

const storedGameState = JSON.parse(localStorage.getItem(gameKey) || '{}');
const storedVoteState = JSON.parse(localStorage.getItem(voteKey) || '{}');

export const gameState = writable(storedGameState);
export const voteState = writable(storedVoteState);

gameState.subscribe(updater(gameKey));
voteState.subscribe(updater(voteKey));