<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="">
    <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center mr-20">
            <img class=" rounded-full aspect-square min-w-96 max-w-96" src="{data.user?.pic}" alt="">
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
    
    
        
    
    
    
        
</main>