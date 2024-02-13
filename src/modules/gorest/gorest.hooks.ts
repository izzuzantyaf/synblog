import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useGetPosts(
  options: {
    page?: number;
    per_page?: number;
  } = {}
) {
  const { isLoading, error, data, mutate } = useSWR(
    `get-gorest-posts-${options.page}`,
    (key: string) =>
      axios.get<Gorest.Post[]>("/api/articles", {
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
    (key: string) => axios.get<Gorest.Post>(`/api/articles/${id}`)
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
    key => axios.get<Gorest.User>(`/api/users/${id}`)
  );

  return {
    isGetUserLoading: isLoading,
    getUserError: error,
    getUserData: data?.data,
    getUser: mutate,
  };
}

export function useGetUsers(
  options: {
    page?: number;
    per_page?: number;
  } = {}
) {
  const { isLoading, error, data, mutate } = useSWR(
    `get-gorest-users-${options.page}`,
    (key: string) =>
      axios.get<Gorest.User[]>(`/api/users`, {
        params: { page: options.page, per_page: options.per_page },
      })
  );

  return {
    isGetUsersLoading: isLoading,
    getUsersError: error,
    getUsersData: data?.data,
    getUsers: mutate,
  };
}

export function useCreateUser() {
  const { isMutating, error, data, trigger } = useSWRMutation(
    `create-gorest-user`,
    (key: string, { arg }: { arg: Omit<Gorest.User, "id"> }) =>
      axios.post<Omit<Gorest.User, "id">>(`/api/users`, arg)
  );

  return {
    isCreateUserLoading: isMutating,
    createUserError: error,
    createUserData: data?.data,
    createUser: trigger,
  };
}

export function useUpdateUser() {
  const { isMutating, error, data, trigger } = useSWRMutation(
    `update-gorest-user`,
    (
      key: string,
      {
        arg,
      }: {
        arg: {
          id: Gorest.User["id"];
          data: Gorest.User;
        };
      }
    ) => axios.patch<Gorest.User>(`/api/users/${arg.id}`, arg.data)
  );

  return {
    isUpdateUserLoading: isMutating,
    updateUserError: error,
    updateUserData: data?.data,
    updateUser: trigger,
  };
}

export function useDeleteUser() {
  const { isMutating, error, data, trigger } = useSWRMutation(
    `delete-gorest-user`,
    (
      key: string,
      {
        arg,
      }: {
        arg: Gorest.User["id"];
      }
    ) => axios.delete<Gorest.User>(`/api/users/${arg}`)
  );

  return {
    isDeleteUserLoading: isMutating,
    deleteUserError: error,
    deleteUserData: data?.data,
    deleteUser: trigger,
  };
}
