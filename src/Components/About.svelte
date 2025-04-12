<script>
    import { setPage } from "../backend/pages";
</script>

<div class="camera">
    <div class="camera-top">
        <div class="camera-header">
            <img
                alt="chicken"
                style="width: 36px"
                class="camera-icon"
                src="/assets/sun-solid.svg"
            />
            <p class="camera-title">About</p>
        </div>

        <div class="camera-style" title="Change your camera mode">
            <div class="camera-selected">© 2025 florin's revivals</div>
        </div>
    </div>

    <div class="camera-middle">
        <div class="camera-info">
            <div class="camera-info-top">
                <img src="/assets/expand.svg" style="width: 16px;" alt="Icon" />

                <p class="camera-name">Cameron ‘03</p>
            </div>

            <p class="camera-more-info">
                Released in 2003, known for its rotary keypad, was marketed as
                an “imaging phone” because of its VGA camera with camcorder
                capabilities.
            </p>

            <p class="camera-more-info-quick-facts">
                0.3MP (VGA) - 640x480 - Grainy - Soft - 2003
            </p>
        </div>

        <div class="camera-info">
            <div class="camera-info-top">
                <img src="/assets/expand.svg" style="width: 16px;" alt="Icon" />

                <p class="camera-name">Maroon ‘07</p>
            </div>

            <p class="camera-more-info">
                Released in 2007, known for starting the smartphone revolution,
                not even offering video recording, it’s camera is a perfect time
                capsule.
            </p>

            <p class="camera-more-info-quick-facts">
                2.0MP - 1200x900 - Almost HD - Nostalgic - 2007
            </p>
        </div>

        <div class="camera-info">
            <div class="camera-info-top">
                <img src="/assets/heart.svg" style="width: 16px;" alt="Icon" />

                <p class="camera-name">EmotionCam uses:</p>
            </div>

            <div class="camera-more-info">
                <ul>
                    <li>Icons: Pixel Icon Library by Hackernoon</li>
                    <li>Font: PixGamer by Meyerfonts</li>
                    <li>
                        Cameron Preview Photo: "Lion Dance at Super 88" by Azyxa
                        - Flickr - 2006
                    </li>
                    <li>
                        Maroon Preview Photo: "A shot of the Empire State
                        Building" by Scott Stein/CNET - CNET - 2017
                    </li>
                </ul>
            </div>

            <p class="camera-more-info-quick-facts">Code & design by florin.</p>
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

                & .camera-selected {
                    margin-left: auto;
                    margin-right: 5px;
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
            margin-left: 5px;
            max-height: 155px;
            overflow-x: auto;

            & .camera-info {
                width: 170px;

                & .camera-info-top {
                    display: flex;
                    gap: 6px;
                }

                & .camera-more-info {
                    margin-top: 0;

                    & ul {
                        margin: 0;

                        & li {
                            margin-left: -20px;
                        }
                    }
                }

                & .camera-more-info-quick-facts {
                    color: darkblue;
                }
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
