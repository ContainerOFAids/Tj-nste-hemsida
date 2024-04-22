<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="flex items-center flex-col">
    <header class="bg-surface-100-800-token w-1/3 pl-5 text-2xl font-bold capitalize pt-3 pb-3">Suggest an activity</header>
    <div class=" bg-gradient-to-br variant-gradient-primary-secondary w-1/3 p-5 pb-5">
        <div class="">
            <a href="http://localhost:5173/tj%C3%A4nster"><i class="fa-solid fa-2xl mb-5 fa-rotate-left rounded-full hover:variant-soft-primary "></i></a>
        </div>
        <form action="?/suggest" method="post" use:enhance >
            <label class="h3">Activity Name: <input type="text" name="name" class="input text-white "></label>
            <label class="h3">Description: <textarea  name="desc" class="textarea text-white"></textarea></label>
            <button class="btn variant-filled-primary hover:bg-orange-200">Suggest</button>
        </form>
    </div>
</main>