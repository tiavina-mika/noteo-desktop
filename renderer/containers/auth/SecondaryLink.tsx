import { Box, Typography } from '@mui/material';
import Link from '../../components/Link';

type Props = {
  label?: string;
  link: string;
  linkText: string;
}
const SecondaryLink = ({ label, link, linkText }: Props) => {
  return (
    <Box display="flex" alignItems="center" mt={2}>
      {label && <Typography sx={{ mr: 1 }}>{label}</Typography>}
      <Link href={link}>{linkText}</Link>
    </Box>
  );
};

export default SecondaryLink;
