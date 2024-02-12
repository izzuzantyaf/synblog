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

    return response;
  }

  /**
   * Get Gorest post by id
   * @param id Post id
   * @returns
   */
  async getPost(id: Gorest.Post["id"]) {
    const response = await axios.get<Gorest.Post>(
      `${this.baseUrl}/posts/${id}`
    );
    return response;
  }

  /**
   * Get Gorest user
   * @param id User id
   * @returns
   */
  async getUser(id: Gorest.User["id"]) {
    const response = await axios.get(`${this.baseUrl}/users/${id}`);
    return response;
  }
}

export const gorestService = new GorestService();
