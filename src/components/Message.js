const Message = ({ message, backgroundColor }) => {
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    backgroundColor: backgroundColor,
    color: "#fff",
    fontWeight: "bold"
  };

  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
