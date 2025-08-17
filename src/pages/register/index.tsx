import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../../api/usersApi";
import type { CreateUser, User } from "../../api/usersApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object({
  fullName: yup.string().required(),
  age: yup.number().typeError("Age is required").required(),
  jobTitle: yup.string().required(),
  location: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
  gender: yup.string().required(),
});

type FormValues = CreateUser & { confirmPassword: string };

export default function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state as User | null;

  const createMutation = useMutation({
    mutationFn: (payload: CreateUser) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset(); // formni tozalash
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateUser> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/"); // update'dan keyin Home'ga qaytish
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingUser) {
      Object.entries(editingUser).forEach(([key, value]) => {
        if (key !== "id") setValue(key as keyof FormValues, value);
      });
      setValue("confirmPassword", editingUser.password);
    }
  }, [editingUser, setValue]);

  const onSubmit = (data: FormValues) => {
    const { confirmPassword, ...userData } = data;
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data: userData });
    } else {
      createMutation.mutate(userData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {editingUser ? "Update User" : "Registration"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "age", placeholder: "Age", type: "number" },
            { name: "jobTitle", placeholder: "Job Title" },
            { name: "location", placeholder: "Location" },
            { name: "email", placeholder: "Email" },
            { name: "username", placeholder: "Username" },
            { name: "phone", placeholder: "Phone" },
            { name: "password", placeholder: "Password", type: "password" },
            {
              name: "confirmPassword",
              placeholder: "Confirm Password",
              type: "password",
            },
          ].map(({ name, placeholder, type = "text" }) => (
            <div key={name}>
              <input
                type={type}
                {...register(name as keyof FormValues)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof FormValues]?.message}
              </p>
            </div>
          ))}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Gender
            </label>
            <div className="flex gap-4">
              {["Male", "Female", "NonSelect"].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("gender")}
                    value={value}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700">{value}</span>
                </label>
              ))}
            </div>
            <p className="text-red-500 text-sm mt-1">
              {errors.gender?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {editingUser ? "Update" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
