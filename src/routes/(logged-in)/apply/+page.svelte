<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: activities = data.activities;
</script>
<main>
    {#each activities as activity}
    <li class="bg-surface-100-800-token m-5 p-5">
        <a class="h2" href="/apply/{activity.id}">{activity.name}</a>
        <p class="h3">{activity.description}</p>
        <div class="flex items-center">
            <i class="fa-solid fa-heart mr-2"></i>{activity.likeCount} Likes
            {#if data.existingUser?.isAdmin}
                <form action="?/likeup" method="post">
                    <button class="btn text-green-500 hover:bg-white h-10 w-10"><i class="fa-solid fa-plus"></i></button>
                </form>
                <button class="btn bg-primary-500">lägg till tjänst</button>
            {/if}
        </div>
    </li>
    {/each}
</main>