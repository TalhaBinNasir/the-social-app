import { Box } from "@mui/material";

interface userImageProps {
  image?: string | null;
  size?: string;
}

const UserImage = ({ image, size = "60px" }: userImageProps) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${process.env.REACT_APP_API_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
