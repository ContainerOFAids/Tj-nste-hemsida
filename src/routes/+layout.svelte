<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.css';
	
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data: PageData;


	
</script>
<div class="appbar flex flex-row bg-surface-100-800-token p-3 mb-10 shadow-2xl">
	
	<a href="https://github.com/ContainerOFAids/Mall" class="btn-icon text-black hover:text-white"><i class="fa-brands fa-github fa-4x ml-5"></i></a>
	
	<div class=" justify-center flex flex-row gap-10 w-full">
		<a href="http://localhost:5173/" class="btn h2 font-bold hover:variant-soft-primary">Home</a>
		<a href="" class="btn h2 font-bold hover:variant-soft-primary">About Us</a>
		<a href="" class="btn h2 font-bold hover:variant-soft-primary">Profile</a>

	</div>
	
	<img src="" alt="" class="profilepic aspect-square">

</div>
<slot />
