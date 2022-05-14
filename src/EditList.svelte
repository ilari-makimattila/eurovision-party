<script>
    import { createEventDispatcher } from 'svelte';
    export let items;
    let dirty = false;
    let newItem = '';
    let editList = {};

    function moveUp(idx) {
        if (idx <= 0 || idx >= editList.length) {
            return;
        }
        let prev = editList[idx - 1];
        
        editList[idx - 1] = editList[idx];
        editList[idx] = prev;
        editList = editList;
        dirty = true;
    }

    function moveDown(idx) {
        if (idx < 0 || idx >= editList.length - 1) {
            return;
        }
        let prev = editList[idx + 1];
        
        editList[idx + 1] = editList[idx];
        editList[idx] = prev;
        editList = editList;
        dirty = true;
    }

    function remove(idx) {
        if (idx < 0 || idx >= editList.length) {
            return;
        }
        editList.splice(idx, 1);
        editList = editList;
        dirty = true;
    }

    function addItem() {
        editList.push(newItem);
        editList = editList;
        dirty = true;
    }


    const dispatch = createEventDispatcher();

    function save() {
        dispatch('save', {
            items: editList,
        })
        dirty = false;
    }
    function cancel() {
        dispatch('cancel', {})
        dirty = false;
    }


    $: {
        editList = dirty ? editList : items.map((value) => value)
    }
</script>


<style>

</style>

<table>
    {#each editList as item, idx}
        <tr>
            <td>{item}</td>
            <td><button on:click={() => moveUp(idx)}>⇧</button></td>
            <td><button on:click={() => moveDown(idx)}>⇩</button></td>
            <td><button on:click={() => remove(idx)}>🗑</button></td>
        </tr>
    {/each}
    <tr>
        <td><input type="text" bind:value={newItem}></td>
        <td colspan="3"><button on:click={addItem}>Add</button></td>
    </tr>
    <tfoot>
        <tr>
            <td colspan="2"><button on:click={save}>Save changes</button></td>
            <td colspan="2"><button on:click={cancel}>Cancel</button></td>
        </tr>
    </tfoot>
</table>