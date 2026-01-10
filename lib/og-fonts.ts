/**
 * Google Fonts loader for OG images
 *
 * This extracts the actual font file URL from Google Fonts CSS
 * to avoid getting HTML error pages instead of font data.
 */

const FONT_URL_REGEX = /src: url\((.+)\) format\('(opentype|truetype)'\)/;

export async function loadGoogleFont(
  font: string,
  text: string,
  weight = 400,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();
  const match = css.match(FONT_URL_REGEX);

  if (match?.[1]) {
    const response = await fetch(match[1]);
    if (response.status === 200) {
      return response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font: ${font}`);
}

export async function loadOutfitFont(
  text: string,
  weight: 400 | 500 | 600 | 700 = 700,
): Promise<ArrayBuffer> {
  return loadGoogleFont("Outfit", text, weight);
}
