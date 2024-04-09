<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main class="flex items-center justify-center flex-col">
    <header class="bg-surface-100-800-token w-1/3 pl-5 text-2xl font-bold capitalize pt-3 pb-3">Login</header>
    <div class="loginContainer flex flex-col items-center bg-gradient-to-br variant-gradient-primary-secondary w-1/3 pb-10 pt-4">
        <div class="loginContainerForm flex justify-center">
            <form action="?/login" method="post" use:enhance>
                <label class="font-bold text-xl">Username: <input type="text" name="username" class="input font-bold text-white" placeholder="" /></label>
                <label class="font-bold text-xl">Password: <input type="password" name="password" class="input font-bold text-white" minlength="6" /></label>
                <div class=" justify-center flex">
                    <button class="btn bg-secondary-500 mt-3 w-24 font-">Log In</button>
                </div>
            </form>
        </div>
        <a href="/register" class=" text-white font-bold mt-2 hover:text-primary-300">Don't have an account?</a>
    </div>
</main>



   