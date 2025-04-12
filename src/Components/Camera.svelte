<script>
    import { onMount } from "svelte";
    import { setPage } from "../backend/pages";
    import {
        currentCamera,
        getCamera,
        changeCamera,
    } from "../backend/cameraMode";
    import { loadImage, processImage } from "../backend/emotionProcessor";

    let cameraMode = "Cameron";

    let isPreview = true;
    let processedImages = {
        cameronImage: "",
        maroonImage: "",
    };

    currentCamera.subscribe((value) => {
        cameraMode = value;
    });

    onMount(async () => {
        await getCamera();
    });

    async function handleImageUpload() {
        try {
            const imageSrc = await loadImage();
            const processed = await processImage(imageSrc);
            processedImages = processed;
            isPreview = false;
        } catch (e) {
            console.error("Error loading or processing image:", e);
        }
    }
</script>

<div class="camera">
    <div class="camera-top">
        <div class="camera-header">
            <img
                alt="chicken"
                style="width: 36px"
                class="camera-icon"
                src="/assets/retro-camera-solid.svg"
            />
            <p class="camera-title">EmotionCam</p>
        </div>

        <div class="camera-style" title="Change your camera mode">
            <button
                on:click={() => changeCamera("back")}
                class="camera-selected-previous"
                off={cameraMode === "Cameron" ? true : false}
            >
                <img src="/assets/angle-left-solid.svg" alt="next" />
            </button>

            <div class="camera-selected">
                {#if cameraMode === "Cameron"}
                    Cameron '03
                {:else if cameraMode === "Maroon"}
                    Maroon '07
                {/if}
            </div>

            <button
                on:click={() => changeCamera("next")}
                class="camera-selected-next"
                off={cameraMode === "Maroon" ? true : false}
            >
                <img src="/assets/angle-right-solid.svg" alt="next" />
            </button>
        </div>
    </div>

    <div
        class="camera-middle"
        title="Click to import your photo"
        on:click={handleImageUpload}
    >
        <div class="camera-square">
            <img
                style="width: 178px; border: 1px solid black"
                src={isPreview
                    ? cameraMode === "Cameron"
                        ? "/assets/preview_03.jpg"
                        : "/assets/preview_07.jpg"
                    : cameraMode === "Cameron"
                      ? processedImages.cameronImage
                      : processedImages.maroonImage}
                alt="preview"
            />
        </div>
    </div>

    <div class="camera-bottom">
        <p on:click={() => setPage("Camera")} class="camera-options">Camera</p>
        <p on:click={() => setPage("About")} class="camera-about">About</p>
    </div>
</div>

<style>
    .camera {
        user-select: none;

        & .camera-top {
            & .camera-header {
                display: flex;
                font-size: 26px;
                gap: 8px;
            }

            & .camera-style {
                margin-top: -20px;
                background: steelblue;
                color: white;
                display: flex;
                width: 180px;

                & .camera-selected-previous {
                    margin-left: auto;
                }

                & button {
                    appearance: none;
                    background: none;
                    border: none;

                    &:hover {
                        cursor: pointer;
                    }

                    &[off="true"] {
                        filter: opacity(40%);
                    }

                    & img {
                        width: 14px;
                        filter: invert(1);
                    }
                }
            }
        }

        & .camera-middle {
            display: flex;

            & .camera-square {
                margin-left: auto;
                margin-right: auto;
                margin-top: 15px;
                cursor: pointer;
            }
        }

        & .camera-bottom {
            margin-top: -8px;
            display: flex;

            & p:hover {
                cursor: pointer;
            }

            & .camera-about {
                margin-left: auto;
            }
        }
    }
</style>
