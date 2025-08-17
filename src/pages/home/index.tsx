import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../api/usersApi";
import type { User } from "../../api/usersApi";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <div className="center">Loading...</div>;

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={user.id} className={i % 2 === 0 ? "rowAlt" : ""}>
              <td>{user.fullName}</td>
              <td>{user.age}</td>
              <td>{user.jobTitle}</td>
              <td>{user.location}</td>
              <td>
                <button
                  onClick={() => user.id && mutation.mutate(user.id)}
                  className="btn btn-ghost"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
