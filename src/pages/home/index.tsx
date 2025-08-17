import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../api/usersApi";
import type { User } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: users, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading)
    return <div className="flex justify-center items-center h-64 text-lg">Loading...</div>;
  if (isError)
    return <div className="flex justify-center items-center h-64 text-red-500 font-semibold">Failed to load users</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Users List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-center">Update</th>
              <th className="px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.jobTitle}</td>
                <td className="px-4 py-2">{user.location}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate("/register", { state: user })}
                    className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-white border border-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => mutation.mutate(user.id)}
                    className="px-3 py-1 text-sm font-medium text-red-600 hover:text-white border border-red-500 hover:bg-red-600 rounded-lg transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center text-gray-500 py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
