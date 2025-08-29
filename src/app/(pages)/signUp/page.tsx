"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  userId: string;
  password: string;
  name: string;
  email: string;
  nickname: string;
};
export default function SignUp() {
  const router = useRouter();

  const createUser = async (data: User) => {
    const res = await fetch(`/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
        name: data.name,
        email: data.email,
        nickname: data.nickname,
      }),
    });
    if (res.status == 201) {
      router.push("/signIn");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    createUser(data);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userID">
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
        <label htmlFor="name">
          NAME
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </label>
        <label htmlFor="nickname">
          NICK NAME
          <input
            type="text"
            id="nickname"
            {...register("nickname", { required: true })}
          />
        </label>
        <label htmlFor="email">
          E-MAIL
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
        </label>
        <button>가입</button>
      </form>
    </div>
  );
}
