import { writable } from "svelte/store";

export const currentPage = writable("Camera");

export async function getPage() {
  try {
    let pageLocalItem = localStorage.getItem("emotion-cam-page");

    if (!pageLocalItem) {
      pageLocalItem = "Camera";
      localStorage.setItem("emotion-cam-page", pageLocalItem);
      currentPage.set(pageLocalItem);
    }
    return pageLocalItem;
  } catch (e) {
    console.log(e);
  }
}

export function setPage(page) {
  localStorage.setItem("emotion-cam-page", page);
  currentPage.set(page);
}
