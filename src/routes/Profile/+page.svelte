<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="">
    <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center mr-20">
            <img class=" rounded-full aspect-square" src="{data.user?.pic}" alt="">
            <div class=" flex justify-center">
                <p class="h1">{data.user?.name}</p>
            </div>
        </div>
        
        
        <form action="?/Save" method="post" class=" w-2/3 ">
            <header class="h2 mb-5">Description</header>
            <div class="flex flex-col items-center">
                <textarea rows="6" name="desc" id="" class="textarea">{data.user?.desc}</textarea>
                <button class="btn bg-primary-500 w-1/6 mt-5">Save</button>
            </div>
            
        </form>
    </div>
    
    <div class="flex flex-row justify-center gap-56 mt-20">
        {#if data.activities}
            <div class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden w-2/5">
                <header class="previewer-header h2 bg-surface-200-700-token p-4 flex justify-between items-center gap-4 ">My Activities</header>
                <div class="previewer-viewport p-4 md:p-10 space-y-4 bg-gradient-to-br variant-gradient-primary-secondary ">
                    <div class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full ">
                        <section class="w-full text-token card p-4 space-y-4">
                            <ul class="list">
                                {#each data.activities as activity}
                                    <div class="">
                                        <h2 class="h2">{activity.name}</h2>
                                        <h3 class="h3">{activity.description}</h3>
                                        <header>Created at:</header>
                                        <h3 class="w-36 overflow-hidden h-6">{activity.createdAt}</h3>
                                        
                                        
                                        
                                    </div>
                                {/each}
                            </ul>
                        </section>
                    </div> 
                </div>
            </div>
            <div class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden w-2/5">
                <header class="previewer-header h2 bg-surface-200-700-token p-4 flex justify-between items-center gap-4 ">My Applications</header>
                <div class="previewer-viewport p-4 md:p-10 space-y-4 bg-gradient-to-br variant-gradient-primary-secondary ">
                    <div class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full ">
                        <section class="w-full text-token card p-4 space-y-4">
                            <ul class="list">
                                {#each data.application as application}
                                    <h3 class="h3">Telefonnummer: {application.telefonnummer}</h3>
                                    <h2>{application.epost}</h2>
                                    <h2>{application.tid}</h2>
                                    <h2 class="h4">{application.information}</h2>
                                {/each}
                            </ul>
                        </section>
                    </div> 
                </div>
            </div>
        {/if}
    </div>
    
    
        
    
    
    
        
</main>