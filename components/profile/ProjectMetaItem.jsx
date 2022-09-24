import { Box, Typography } from "@mui/material";
import Moment from "react-moment";

const ProjectMetaItem = ({ icon, value   , date }) => {
  return (
    <Box mr={4} sx={{ display: "flex", alignItems: "center" }}>
      {icon}
     { date ? 
     <Typography color="secondary.dark" ml={1}>
       <Moment format="YYYY/MM/DD">{value}</Moment>
     </Typography>
     : <Typography color="secondary.dark" ml={1}>
        {value}
      </Typography>}
    </Box>
  );
};

export default ProjectMetaItem;
