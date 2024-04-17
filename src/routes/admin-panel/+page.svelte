<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="flex flex-col justify-center items-center">
    <h1 class="h1">Welcome to the Admin Panel</h1>



    <div class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden w-1/2 mb-16">
        <header class="previewer-header h2 bg-surface-200-700-token p-4 flex justify-between items-center gap-4 ">Applications</header>
        <div class="previewer-viewport p-4 md:p-10 space-y-4 bg-gradient-to-br variant-gradient-primary-secondary ">
            <div class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full ">
                <section class="w-full text-token card p-4 space-y-4">
                    <ul class="list">
                        {#each data.activities as activity}
                            <div class="">
                                <h2 class="h2">{activity.name}</h2>
                                <h3 class="h3">{activity.description}</h3>
                                <header>Time</header>
                                <h3 class="w-36 overflow-hidden h-6">{activity.createdAt}</h3>
                                
                                <div class="flex justify-center gap-4">
                                    <form action="?/approve" method="post" use:enhance>
                                        <input type="hidden" name="activityId" value="{activity.id}">
                                        <button class="btn bg-primary-500 w-24">Approve</button>
                                    </form>
                                    <form action="?/deny" method="post" use:enhance>
                                        <input type="hidden" name="activityId" value="{activity.id}">
                                        <button class="btn bg-primary-500 w-24">Deny</button>
                                    </form>
                                </div>
                                
                            </div>
                        {/each}
                    </ul>
                </section>
            </div> 
        </div>
    </div>
    


    <div class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden w-1/2 ">
        <header class="previewer-header h2 bg-surface-200-700-token p-4 flex justify-between items-center gap-4 ">Applications</header>
        <div class="previewer-viewport p-4 md:p-10 space-y-4 bg-gradient-to-br variant-gradient-primary-secondary ">
            <div class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full ">
                <section class="w-full text-token card p-4 space-y-4">
                    <ul class="list">
                        {#each data.application as application}
                            <h3 class="h3">Telefonnummer: {application.telefonnummer}</h3>
                            <h2>{application.epost}</h2>
                            <h2>{application.tid}</h2>
                            <h2 class="h4">{application.information}</h2>
                            <form action="?/denyapplication" method="post" use:enhance>
                                <input type="hidden" name="applicationId" value="{application.id}">
                                <button class="btn bg-primary-500 w-24">Deny</button>
                            </form>
                        {/each}
                    </ul>
                </section>
            </div> 
        </div>
    </div>
    
</main>

