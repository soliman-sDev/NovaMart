import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import Container from "@/Components/Container";
import Footer from "@/Components/Footer";
import Pheader from "@/Components/Pheader";
import { getError } from "@/Utils/error";

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>E-commerce - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-[#e4ebf5] w-full min-h-screen">
        <Pheader />
        <Container>
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Update Profile</h1>

            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2  focus:outline-none focus:shadow-outline"
                id="name"
                autoFocus
                {...register("name", {
                  required: "Please enter name",
                })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
                className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2  focus:outline-none focus:shadow-outline"
                id="email"
              ></input>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Please enter password",
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
                className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2  focus:outline-none focus:shadow-outline"
                id="password"
                autoFocus
              ></input>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2  focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter your password again"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please enter confirm password",
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className="text-red-500 ">
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className="text-red-500 ">Password do not match</div>
                )}
            </div>
            <div className="mb-4">
              <button className="ml-3 flex items-center px-3 py-2 bg-black dark:bg-white dark:text-black text-white text-sm uppercase font-medium rounded">
                Update Profile
              </button>
            </div>
          </form>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

ProfileScreen.auth = true;