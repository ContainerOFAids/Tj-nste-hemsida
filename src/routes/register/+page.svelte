<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData, PageData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
    let s ="";
</script>

<main class="flex items-center justify-center flex-col">
    <header class="bg-surface-100-800-token w-1/3 pl-5 text-2xl font-bold capitalize pt-3 pb-3">Register</header>
    <div class="registerContainer flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary w-1/3 pb-10 pt-4">
        <div class="registerContainerForm">
            <form action="?/register" method="post" use:enhance>
                <div class="test">
                    <label class="font-bold text-xl">Username: <input type="text" name="username" class="input font-bold text-white"></label>
                    <label class="font-bold text-xl">Password: <input type="password" name="password" class="input font-bold text-white"></label>
                    <label class="font-bold text-xl">Repeat Password: <input type="password" name="password-repeat" class="input font-bold text-white"></label>
                    <label class="font-bold text-xl">Profile Picture: <input type="text" bind:value={s} class="input font-bold text-white"></label>
                    <label><input type="hidden" value={s} name="pic"></label>
                    <div class=" justify-center flex">
                        <button class="btn bg-secondary-500 mt-3 w-24 font-">Log In</button>
                    </div>
                   
                </div>
            </form>
        </div>
        <a href="/login" class=" text-white font-bold mt-2 hover:text-primary-300">Already have account?</a>
    </div>
</main>

 