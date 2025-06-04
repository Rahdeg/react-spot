import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = (error) => reject(error);
  });
}

export function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
  ).toUpperCase();
}
