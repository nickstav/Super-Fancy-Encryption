<script>
    import FinishButton from './FinishButton.svelte';
    import { appStatus } from '../JS/store.js';
</script>

<div id="result">
    {#if $appStatus.encryptedMessage}
        <h2>Encrypted Message:</h2>
        <textarea value={$appStatus.encryptedMessage} id="messageBox" rows="4" cols="70"></textarea>
    {:else}
        <p>Encrypting message...</p>
    {/if}  
</div>
<div id="returnButton">
    <FinishButton/>
</div>