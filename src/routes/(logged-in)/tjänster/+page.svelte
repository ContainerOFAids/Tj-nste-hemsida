<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;

    $: activities = data.activities;
    $: activities.sort((a, b) => b.likeCount - a.likeCount)

    
</script>

<main class="flex flex-col items-center pb-10">
    <h1 class="h1">Tjänster</h1>
    <span class="h3">Här kan du lägga till tjänster 😁</span>
    <ul class="w-1/2">
        {#each activities as activity}
            <li class="bg-surface-100-800-token m-5 p-5">
                <a class="h2" href="/activities/perform/{activity.id}">{activity.name}</a>
                <p class="h3">{activity.description}</p>
                <form action="?/like" method="post" use:enhance>
                    <input type="hidden" name="activityId" value="{activity.id}" class="input">
                    <button class="btn-icon hover:bg-white hover:text-black"><i class="fa-{activity.liked ? "solid" : "regular"} fa-heart"></i></button>
                    {activity.likeCount} Likes
                </form>
                {#if data.existingUser?.isAdmin}
	                <h1 class="h1">Is admin</h1>
                {/if}
                
            </li>
        {/each}
    </ul>
    <a href="/tjänster/suggest" class="btn variant-filled-primary">lägg till en tjänst</a>
</main>