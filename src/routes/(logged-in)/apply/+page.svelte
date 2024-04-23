<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: activities = data.activities;
</script>
<main class="flex justify-center flex-col items-center">
    <h1 class="h1">Here you can view activities you can apply for</h1>
    {#each activities as activity}
    <div class="bg-surface-100-800-token m-5 p-5 w-2/3">
        <a class="h2" href="/apply/{activity.id}">{activity.name}</a>
        <p class="h3">{activity.description}</p>
        <div class="flex items-center">
            <i class="fa-solid fa-heart mr-2"></i>{activity.likeCount} Likes
            {#if data.existingUser?.isAdmin}
                <button class="btn bg-error-500 ml-3"><i class="fa-solid fa-trash-can mr-1"></i>disapprove</button>
            {/if}
        </div>
        
        
    </div>
    {/each}
</main>