<script>
    import { createEventDispatcher } from 'svelte';
    export let vote = 0;
    export let artist;
    export let participant;
    export let finished;

    let votes = [
        { enabled: true, value: 0, label: 'No vote' },
        { enabled: true, value: 1, label: 'I hate it!' },
        { enabled: true, value: 2, label: 'It\'s okay...' },
        { enabled: true, value: 3, label: 'I like it!' },
        { enabled: false, value: 4, label: 'I love it!' },
    ];

    const dispatch = createEventDispatcher();

    function dispatchVote() {
        dispatch('vote', {
            artist,
            participant,
            score: vote,
        })
    }

    $: {
        votes[4].enabled = finished;
    }
</script>

<select bind:value={vote} on:change={dispatchVote}>
    {#each votes as v}
    {#if v.enabled}
    <option value={v.value}>
        {v.label}
    </option>
    {/if}
    {/each} 
</select>