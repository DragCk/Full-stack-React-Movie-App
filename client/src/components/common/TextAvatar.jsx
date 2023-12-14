import { Avatar } from "@mui/material";

const TextAvatar = ({ text }) => {
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i += 1) {
      //將 hash 左移5位，再減去原始的 hash，這是一種簡單的位元運算哈希技巧。
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(text),
        width: 40,
        height: 40,
      }}
      children={`${text.split(" ")[0][0]}`}
    />
  );
};

export default TextAvatar;
