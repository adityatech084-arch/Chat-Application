export const formatChatTime = (date) => {
  if (!date) return "";

  const msgDate = new Date(date);
  const now = new Date();

  const isToday =
    msgDate.getDate() === now.getDate() &&
    msgDate.getMonth() === now.getMonth() &&
    msgDate.getFullYear() === now.getFullYear();

  if (isToday) {
    // 👉 Today → time (7:30 PM)
    return msgDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // 👉 Older → day name (Monday, Sunday)
  return msgDate.toLocaleDateString("en-IN", {
    weekday: "long",
  });
};
