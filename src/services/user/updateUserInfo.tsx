import { User } from "@/types/User";

export const updateUserInfo = async (user: User) => {
  const res = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar usuario");
  }

  return await res.json();
};
