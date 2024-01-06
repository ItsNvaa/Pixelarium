import path from "path";

/**
 * Retrieves the extension name of a picture from a given URL path.
 *
 * @param urlpath - The URL path of the picture.
 * @returns The extension name of the picture.
 */
export default function getPictureExtensionName(urlpath: string) {
  if (!urlpath) throw new Error("Urlpath must be provided!");

  const findExtName: string = path.extname(urlpath).slice(1);

  const extName: string = "image/" + findExtName;

  return extName;
}