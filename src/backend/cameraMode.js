import { writable } from "svelte/store";

export const currentCamera = writable("Cameron");

export async function getCamera() {
  try {
    let cameraLocalItem = localStorage.getItem("emotion-cam-camera");

    if (!cameraLocalItem) {
      cameraLocalItem = "Cameron";
      localStorage.setItem("emotion-cam-camera", cameraLocalItem);
      currentPage.set(cameraLocalItem);
    }
    return cameraLocalItem;
  } catch (e) {
    console.log(e);
  }
}

export function changeCamera(command) {
  if (command === "next") {
    localStorage.setItem("emotion-cam-camera", "Maroon");
    currentCamera.set("Maroon");
  } else if (command === "back") {
    localStorage.setItem("emotion-cam-camera", "Cameron");
    currentCamera.set("Cameron");
  }
}
