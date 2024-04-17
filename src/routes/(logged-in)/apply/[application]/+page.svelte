<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: activities = data.activities;
</script>

<main class="flex justify-center flex-col items-center">
    <h1 class="h1">Create Application</h1>
    <div class="card w-2/3 flex justify-center flex-col items-center">
        <div class="w-5/6">
            <div class="flex items-center justify-center">
                <h1 class="h2">{activities?.name}</h1>
            </div>
            <form action="?/apply" method="post" class="flex gap-4 flex-col">
                <input type="text" class="input" name="tele" placeholder="070-123 456 78" >
                <input type="text" class="input" name="epost" placeholder="example@something.com">
                <input type="Date" class="input" name="tid" placeholder="Önskemål om tid">
                <textarea name="info" class="textarea"></textarea>
                <div class="flex justify-center">
                    <button class="btn bg-primary-500">Apply</button>
                </div>
            </form>
        </div>
    </div>
</main>