import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  id: number;
  userId: string;
  name: string;
  accessToken: string | null;
  error: string | null;
  signIn: (userId: string, password: string) => Promise<boolean>;
  signOut: (userId: string, accToken: string) => Promise<boolean>;
  fetchAccToken: (accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: 0,
      userId: "",
      name: "",
      accessToken: null,
      error: null,
      // 로그인 처리
      signIn: async (userId, password) => {
        try {
          const res = await fetch(`/api/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              password: password,
            }),
          });
          const data = await res.json();
          console.log("data", data);
          set({
            id: data.id,
            userId: data.userId,
            name: data.username,
            accessToken: "QWEQ1KJWEJLQKWEw",
          });

          return true;
        } catch (err: any) {
          console.log(err);
          return false;
        }
      },
      signOut: async (userId, accToken) => {
        //try {
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       userId: userId,
        //       password: password,
        //     }),
        //   }
        // );
        // const data = await res.json();
        // console.log("data", data);
        set({
          id: 0,
          name: "",
          accessToken: "",
        });

        return true;
        // } catch (err: any) {
        //   console.log(err);
        //   return false;
        // }
      },
      // accToken 갱신
      fetchAccToken: async (newAccToken) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/accToken`,
            {
              method: "GET",
            }
          );
          const data = await res.json();
          set({ accessToken: newAccToken });
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
