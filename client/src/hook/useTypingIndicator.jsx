import { useEffect, useState } from "react";

const useTypingIndicator = (socket, activeUserId) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!socket || !activeUserId) return;

    const handleTyping = ({ typingId }) => {
      if (typingId === activeUserId) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ typingId }) => {
      if (typingId === activeUserId) {
        setIsTyping(false);
      }
    };

    socket.on("userTyping", handleTyping);
    socket.on("userStoppedTyping", handleStopTyping);

    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStoppedTyping", handleStopTyping);
    };
  }, [socket, activeUserId]);

  return isTyping;
};

export default useTypingIndicator;
