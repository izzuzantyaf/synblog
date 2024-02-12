namespace Gorest {
  export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    gender: "male" | "female";
    status: "active" | "inactive";
  }
}
