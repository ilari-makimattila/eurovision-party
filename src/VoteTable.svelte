<script>
    import { createEventDispatcher } from 'svelte';
    import Vote from './Vote.svelte';

    export let artists = [];
    export let participants = [];
    export let votes = {};
    export let finished = false;

    const dispatch = createEventDispatcher();

    let artistScores = [];

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
    }
</script>

<table>
    <thead>
        <tr>
            <th></th>
            {#each artists as artist}
            <th>{artist}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each participants as participant}
        <tr>
            <th>{participant}</th>
            {#each artists as artist}
            <td><Vote finished={finished} participant={participant} artist={artist} vote={initialVote(artist, participant)} on:vote={updateArtistVote}></Vote></td>
            {/each}
        </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th>Total Score:</th>
            {#each artistScores as score}
            <th>{score}</th>
            {/each}
        </tr>
    </tfoot>
</table>