import axios from "axios";

/**
 * A service intended to interact with Gorest API - https://gorest.co.in
 */
class GorestService {
  private readonly baseUrl = "https://gorest.co.in/public/v2";

  /**
   * Get posts
   * @param options
   * @returns
   */
  async getPosts(
    options: {
      page?: number;
      per_page?: number;
    } = {}
  ) {
    const DEFAULT_PAGE = 1;
    const MAX_PAGE = 25;
    const DEFAULT_PER_PAGE = 15;

    options.page = options.page ?? DEFAULT_PAGE;
    options.per_page = options.per_page ?? DEFAULT_PER_PAGE;

    const url = new URL(`${this.baseUrl}/posts`);
    url.searchParams.append("page", options.page.toString());
    url.searchParams.append("per_page", options.per_page.toString());

    const response = await axios.get<Gorest.Post[]>(url.toString());
    const data = response.data;

    return {
      posts: data,
      pagination: {
        page: options.page,
        next_page: options.page + 1 <= MAX_PAGE ? options.page + 1 : null,
      },
    };
  }
}

export const gorestService = new GorestService();
