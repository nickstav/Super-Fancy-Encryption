<script>
    import { sendEncodedMessage } from '../JS/eventHandling.js';

    let password = '';
    let message = '';

</script>

<div id="instructions">
    <p>Enter the encrypted message and your password before clicking 'submit'</p>
</div>
<div id="message" class="py-5">
    <label for="messageBox">Enter your encrypted message:</label>
    <textarea bind:value={message} id="messageBox" name="messageBox" rows="4" cols="70"></textarea>
</div>
<div id="passwordEntry" class="py-5 flex flex-col">
    <label for="password">Password:</label>
    <input bind:value={password} type="password" maxlength="12" id="password" name="password1">
</div>
<div id="submitButton" class="py-5">
    <button on:click={()=> sendEncodedMessage(password, message)} class="text-xs bg-black hover:bg-transparent text-white font-semibold hover:text-black border-black border 2 py-2 px-4">
        Submit
    </button>
</div>