// Get user initials for avatar
export const getUserInitials = (user) => {
  if (!user?.name) return "U";
  const names = user.name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return user.name.substring(0, 2).toUpperCase();
};
