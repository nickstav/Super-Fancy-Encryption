<script>
    import { checkSubmission } from '../JS/eventHandling.js';

    let password1 = '';
    let password2 = '';
    let message = '';

</script>

<div id="instructions">
    <p>Enter a password (max 12 characters) and the message you wish to encrypt before clicking 'submit'</p>
</div>
<div id="passwordEntry" class="py-5 flex flex-col">
    <label for="password1">Password:</label>
    <input type="password" bind:value={password1} maxlength="12" id="password1" name="password1">
    <label for="password2">Confirm password:</label>
    <input type="password" bind:value={password2} maxlength="12" id="password2" name="password2">
</div>
<div id="message">
    <label for="messageBox">Enter your message:</label>
    <textarea bind:value={message} id="messageBox" name="messageBox" rows="4" cols="70"></textarea>
</div>
<div id="submitButton" class="py-5">
    <button on:click={()=> checkSubmission(password1, password2, message)} class="text-xs bg-black hover:bg-transparent text-white font-semibold hover:text-black border-black border 2 py-2 px-4">
        Submit
    </button>
</div>