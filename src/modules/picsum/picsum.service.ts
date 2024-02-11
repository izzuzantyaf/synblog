/**
 * A service intended to interact with Picsum API - https://picsum.photos
 */
class PicsumService {
  private readonly baseUrl = "https://picsum.photos";

  /**
   * Generate a static random image URL
   *
   * @param seed Your random string
   * @param options
   * @returns Generated url
   * @example
   * ```tsx
   * const url = picsumService.getStaticRandomImageUrl("ini_adalah_random_string")
   * url // https://picsum.photos/seed/inirandomstring/320/180
   * ```
   */
  getStaticRandomImageUrl(
    seed: string,
    options: {
      /**
       * Width in px
       */
      width?: number;
      /**
       * Height in px
       */
      height?: number;
    } = {}
  ) {
    const DEFAULT_WIDTH = 320;
    const DEFAULT_HEIGHT = 180;

    options.width = options.width ?? DEFAULT_WIDTH;
    options.height = options.height ?? DEFAULT_HEIGHT;

    const url = `${this.baseUrl}/seed/${seed}/${options.width}/${options.height}`;

    return url;
  }
}

export const picsumService = new PicsumService();
