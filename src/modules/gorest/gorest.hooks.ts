import axios from "axios";
import useSWR from "swr";

export function useGetPosts(
  options: {
    page?: number;
    per_page?: number;
  } = {}
) {
  const { isLoading, error, data, mutate } = useSWR(
    `get-gorest-posts-${options.page}`,
    (key: string) =>
      axios.get<Gorest.Post[]>("/api/posts", {
        params: { page: options.page, per_page: options.per_page },
      })
  );

  return {
    isGetPostsLoading: isLoading,
    getPostsError: error,
    getPostsData: data?.data,
    getPosts: mutate,
  };
}

export function useGetPost(id: Gorest.Post["id"]) {
  const { isLoading, error, data, mutate } = useSWR(
    id ? `get-gorest-post-${id}` : null,
    (key: string) => axios.get<Gorest.Post>(`/api/posts/${id}`)
  );

  return {
    isGetPostLoading: isLoading,
    getPostError: error,
    getPostData: data?.data,
    getPost: mutate,
  };
}

export function useGetUser(id: Gorest.User["id"]) {
  const { isLoading, error, data, mutate } = useSWR(
    id ? `get-gorest-user-${id}` : null,
    key => axios.get<Gorest.User>(`/api/user/${id}`)
  );

  return {
    isGetUserLoading: isLoading,
    getUserError: error,
    getUserData: data?.data,
    getUser: mutate,
  };
}
