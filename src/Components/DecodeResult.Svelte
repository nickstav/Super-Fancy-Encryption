<script>
    import FinishButton from './FinishButton.svelte';
    import { appStatus } from '../JS/store.js';
</script>

<div id="result">
    {#if $appStatus.decodedMessage}
        <h2>Decoded Message:</h2>
        <textarea value={$appStatus.decodedMessage} id="messageBox" rows="4" cols="70"></textarea>
    {:else}
        <p>Decoding message...</p>
    {/if}  
</div>
<div id="returnButton">
    <FinishButton/>
</div>