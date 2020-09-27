<script>
	import TopBar from './Components/TopBar.svelte';
	import Buttons from './Components/Buttons.svelte';
	import Encrypt from './Components/Encrypt.svelte';
	import Decode from './Components/Decode.svelte';
	import EncryptionResult from './Components/EncryptionResult.svelte';
	import DecodeResult from './Components/DecodeResult.svelte';
	import { appStatus } from './JS/store.js';
</script>

<main class="w-full h-full">
	<div class="w-full h-full bg-gray-400 flex flex-col items-center text-center">
		<TopBar/>
		<h1 class="py-10 text-4xl font-bold">[super-fancy-encryption]</h1>
		{#if $appStatus.appMode === 'menu'}
			<Buttons/>
		{:else if $appStatus.appMode === 'encrypt'}
			<Encrypt/>
		{:else if $appStatus.appMode === 'decode'}
			<Decode/>
		{:else if $appStatus.appMode === 'encryptionResult'}
			<EncryptionResult/>
		{:else if $appStatus.appMode === 'decodeResult'}
			<DecodeResult/>
		{/if}
	</div>
</main>