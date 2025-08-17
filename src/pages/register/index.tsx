import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, User } from "../../api/usersApi";

const schema = yup.object({
  fullName: yup.string().required(),
  age: yup.number().required(),
  jobTitle: yup.string().required(),
  location: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup.string().required(),
});

export default function Register() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser, {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User & { confirmPassword: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: User & { confirmPassword: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="card formCard">
      <h1 className="title">Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <input {...register("fullName")} placeholder="Full Name" className="input" />
        <input type="number" {...register("age")} placeholder="Age" className="input" />
        <input {...register("jobTitle")} placeholder="Job Title" className="input" />
        <input {...register("location")} placeholder="Location" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input {...register("username")} placeholder="Username" className="input" />
        <input {...register("phone")} placeholder="Phone" className="input" />
        <input type="password" {...register("password")} placeholder="Password" className="input" />
        <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" className="input" />
        <div>
          <label><input type="radio" {...register("gender")} value="Male" /> Male</label>
          <label><input type="radio" {...register("gender")} value="Female" /> Female</label>
          <label><input type="radio" {...register("gender")} value="Other" /> Other</label>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {Object.values(errors).map((e, i) => (
        <p key={i} style={{ color: "red" }}>{e?.message}</p>
      ))}
    </div>
  );
}
