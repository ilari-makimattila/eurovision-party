<script lang="ts">
	import EditItems from "./EditList.svelte";
	import VoteTable from "./VoteTable.svelte";
	import {gameState} from './store';

	let voteProps = {
		artists: [],
		participants: [],
		votes: {},
		finished: false,
	};

	gameState.subscribe((state) => {
		voteProps.artists = state.artists || [];
		voteProps.participants = state.participants || [];
		voteProps.votes = Object.assign(
			state.votes || {},
			...voteProps.artists.map((a) => ({[a]: {}})),
			...Object.keys(state.votes || {}).filter((a) => state.artists.includes(a)).map((a) => ({[a]: state.votes[a]})),
		);
		voteProps.finished = !!state.finished;
	});


	function updateVote(event) {
        const {artist, participant, score} = event.detail;
		
		if (!voteProps.votes[artist]) {
			voteProps.votes[artist] = {};
		}
		voteProps.votes[artist][participant] = score;
		gameState.set(voteProps);
	}

	let editingParticipants = false;
	let editingArtists = false;

	function updateParticipants(event) {
		voteProps.participants = event.detail.items;
		gameState.set(voteProps);
		editingParticipants = false;
	}

	function updateArtists(event) {
		voteProps.artists = event.detail.items;
		voteProps.votes = Object.assign(
			{},
			...voteProps.artists.map((a) => ({[a]: {}})),
			...Object.keys(voteProps.votes).filter((a) => voteProps.artists.includes(a)).map((a) => ({[a]: voteProps.votes[a]})),
		);
		gameState.set(voteProps);
		editingArtists = false;
	}

	function finishGame() {
		editingArtists = false;
		editingParticipants = false;
		voteProps.finished = true;
		gameState.set(voteProps);
	}

	function newGame() {
		gameState.set({
			artists: [],
			participants: [],
			votes: {},
			finished: false,
		});
	}
</script>

<main>
	<h1>Eurovision Party!</h1>
	{#if !editingParticipants && !editingArtists}
	<VoteTable {...voteProps} on:vote={updateVote}></VoteTable>
	{/if}

	{#if !voteProps.finished}

	{#if editingParticipants}
	<EditItems items={voteProps.participants} on:save={updateParticipants} on:cancel={() => editingParticipants = false}></EditItems>
	{:else if !editingArtists}
	<button on:click={() => editingParticipants = true}>Edit participants</button>
	{/if}

	{#if editingArtists}
	<EditItems items={voteProps.artists} on:save={updateArtists} on:cancel={() => editingArtists = false}></EditItems>
	{:else if !editingParticipants}
	<button on:click={() => editingArtists = true}>Edit artists</button>
	{/if}

	<button on:click={finishGame}>Finish!</button>
	{:else}
	<button on:click={newGame}>New game</button>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>