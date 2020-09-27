<script>
    import { startEncryption, startDecode } from '../JS/eventHandling.js';
</script>

<div id="options" class="w-full flex flex-row justify-around items-center pt-10 px-20">
    <button on:click={startEncryption} class="h-20 w-40 bg-black text-white font-semibold hover:text-black hover:bg-transparent hover:border-black border 2 py-2 px-4">
        Encrypt Message
    </button>
    <button on:click={startDecode} class="h-20 w-40 bg-black text-white font-semibold hover:text-black hover:bg-transparent hover:border-black border 2 py-2 px-4">
        Decode Message
    </button>
</div>