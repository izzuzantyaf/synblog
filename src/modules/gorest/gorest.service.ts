import axios from "axios";

/**
 * A service intended to interact with Gorest API - https://gorest.co.in
 */
class GorestService {
  private readonly baseUrl = "https://gorest.co.in/public/v2";
  private readonly accessKey = process.env.GOREST_ACCESS_TOKEN;

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

  /**
   * Get Gorest users
   * @param options
   * @returns
   */
  async getUsers(
    options: {
      page?: number;
      per_page?: number;
    } = {}
  ) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 15;

    options.page = options.page ?? DEFAULT_PAGE;
    options.per_page = options.per_page ?? DEFAULT_PER_PAGE;

    const url = new URL(`${this.baseUrl}/users`);
    url.searchParams.append("page", options.page.toString());
    url.searchParams.append("per_page", options.per_page.toString());

    const response = await axios.get<Gorest.User[]>(url.toString());

    return response;
  }

  async createUser(data: Gorest.User) {
    const response = await axios.post(`${this.baseUrl}/users`, data, {
      headers: {
        Authorization: `Bearer ${this.accessKey}`,
      },
    });
    return response;
  }

  async updateUser(id: Gorest.User["id"], data: Gorest.User) {
    const response = await axios.patch(`${this.baseUrl}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${this.accessKey}`,
      },
    });
    return response;
  }

  async deleteUser(id: Gorest.User["id"]) {
    const response = await axios.delete(`${this.baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessKey}`,
      },
    });
    return response;
  }
}

export const gorestService = new GorestService();
