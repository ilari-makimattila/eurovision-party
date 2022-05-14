<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Vote from './Vote.svelte';

    export let artists = [];
    export let participants = [];
    export let votes: {[key: string]: {[key: string]: number}} = {};
    export let finished = false;

    const dispatch = createEventDispatcher();

    let artistScores = [];
    let winner = -1;

    function artistName(artist) {
        if (artist.includes(':')) {
            const [country, song] = artist.split(':', 2);
            return `<span class="country">${country}</span><span class="song">${song}</span>`;
        } else {
            return artist;
        }
    }

    function updateArtistVote(event) {
        dispatch('vote', event.detail)
    }

    function artistScore(artist) {
        if (votes[artist]) {
            const totalVotes = Object.values(votes[artist]).filter((c) => c > 0).length;
            if (totalVotes > 0) {
                return Object.values(votes[artist]).reduce((m, c) => m + c) / totalVotes;
            }
        }
        return '';
    }

    function initialVote(artist, participant) {
        if (votes[artist] && votes[artist][participant]) {
            return votes[artist][participant];
        }
        return 0;
    }

    $: {
        artistScores = Object.keys(votes).map(artistScore);
        winner = finished ? artistScores
            .map((score, idx) => ({score, idx}))
            .reduce((w, c) => c.score > w.score ? c : w, {score: 0, idx: -1}).idx : -1;
    }
</script>

<style>
    div {
        overflow-x: scroll;
        overflow-y: visible;
        padding: 0 0 5em;
    }
    table {
        table-layout: fixed;
        border-collapse: collapse;
    }

    th, td {
        margin: 0;
        padding: 12px 3px 0;
    }

    thead tr {
        border-bottom: 2px solid black;
        text-align: left;
        vertical-align: top;
        height: 120px;
    }

    :global(.votepanel-title span.country) {
        display: block;
    }

    :global(.votepanel-title span.song) {
        font-weight: normal;
    }

    tbody tr {
        border-bottom: 1px solid #a0a0a0;
        background-color: white;
    }
    tr.odd {
        background-color: #f7f7f7;
        border-bottom: 1px solid #a0a0a0;
    }

    td.vote {
        padding: 12px 3px 0;
    }

    tr.voter {
        height: 70px;
    }

    .participants {
        position: absolute;
        left: 8px;
        top: auto;
        width: 21em;
        text-align: right;
    }

    .participants th {
        padding: 0 8px 0 0;
    }

    .votes {
        margin-left: 20em;
    }

    tfoot {
        vertical-align: middle;
        background-color: #d0d0d0;
        font-size: 150%;
    }

    tfoot th {
        height: 2em;
        margin: 0;
        padding: 0;
    }

    .winner {
        background-color: crimson;
    }
</style>

<div>
    <table class="participants">
        <thead>
            <tr><th></th></tr>
        </thead>
        <tbody>
            {#each participants as participant, idx}
            <tr class:odd={idx % 2 === 1} class:even={idx % 2 === 0} class="voter">
                <th>{participant}</th>
            </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th>Total Score:</th>
            </tr>
        </tfoot>
    </table>
    <table class="votes">
        <thead>
            <tr class="votepanel-title">
                {#each artists as artist, idx}
                <th class:winner={idx === winner}>{@html artistName(artist)}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each participants as participant, idx}
            <tr class:odd={idx % 2 === 1} class:even={idx % 2 === 0} class="voter">
                {#each artists as artist, idx}
                <td class="vote" class:winner={idx === winner}><Vote finished={finished} participant={participant} artist={artist} vote={initialVote(artist, participant)} on:vote={updateArtistVote}></Vote></td>
                {/each}
            </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                {#each artistScores as score, idx}
                <th class:winner={idx === winner}>{score}</th>
                {/each}
            </tr>
        </tfoot>
    </table>
</div>