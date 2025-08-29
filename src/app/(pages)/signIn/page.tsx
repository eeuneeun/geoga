"use client";

import { useUserStore } from "../../_store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  userId: string;
  password: string;
};
export default function SignIn() {
  const router = useRouter();
  const { signIn } = useUserStore();

  async function login(data: User) {
    const res = await signIn(data.userId, data.password);
    if (res === true) {
      router.push("/");
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    login(data);
  };
  return (
    <div>
      <h2>로그인</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userId">
          ID
          <input
            type="text"
            id="userId"
            {...register("userId", { required: true })}
          />
        </label>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
        </label>

        <button>로그인</button>
        <Link href={"/signUp"} className="signup-btn">
          회원가입
        </Link>
      </form>
    </div>
  );
}
