import pictureFallbackPlaceholder from "@/constant/readonly/pictureFallbackPlaceholder";

/**
 * Function to handle errors on an event target.
 *
 * @param e - The event target that triggered the error.
 * @returns void
 */
export default function onErrorHandler(e: EventTarget): void {
  (e as HTMLImageElement).src = pictureFallbackPlaceholder;
}
