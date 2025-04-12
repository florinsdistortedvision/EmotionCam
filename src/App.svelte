<script>
    import { onMount } from "svelte";
    import Camera from "./Components/Camera.svelte";
    import About from "./Components/About.svelte";

    import { getPage, currentPage } from "./backend/pages";

    let isShown = "Camera";

    currentPage.subscribe((value) => {
        isShown = value;
    });

    onMount(async () => {
        await getPage();
    });
</script>

<div class="emotion-cam-main">
    {#if isShown === "Camera"}
        <Camera />
    {:else if isShown === "About"}
        <About />
    {/if}
</div>

<style>
    .emotion-cam-main {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
