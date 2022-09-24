import {
  Box,
  Typography,
  Slider,
  useTheme
} from "@mui/material";
import Moving from "./icons/moving";
import Fire from './icons/fire'

import styles from "../../styles/Projects.module.css";
import Moment from 'react-moment';
import Link from "next/link";
import { dong, mediaBaseURL } from "../../utils/constants";


const Project = (props) => {
  const theme = useTheme()
  return (
    <Link href={`/projects/${props?.company?.id}`}>
    <Box className={styles.container}>
     
     <Box style={{ position: "relative" , minHeight:"11rem"}}>
       <img
         className={styles.image}
         src={`${mediaBaseURL + props?.company?.coverImage?.url}`}
         srcSet={`${mediaBaseURL + props?.company?.coverImage?.url}`}
         alt={"image"}
         loading="lazy"
        
       />
       <Box className={styles.imageHeader}>
         <Box className={styles.imageHeaderTrending}>
           <Moving />
           Trending
         </Box>

         <Box display="flex">
           <Box className={styles.imageHeaderEnergy}>{props?.company?.companyCategory?.name}</Box>

           {/* <Box className={styles.imageHeaderTechnology}>Technology</Box> */}
         </Box>
       </Box>
       <Box className={styles.imageLogoContainer}>
         <img
           className={styles.imageLogo}
           src={`${mediaBaseURL + props?.company?.logoImage?.url}`}
           srcSet={`${mediaBaseURL + props?.company?.logoImage?.url}`}
           alt={"logo"}
           loading="lazy"
         />
       </Box>
     </Box>
     <Box style={{ marginTop: "2rem" }}>
       <Typography variant="h5" fontWeight="700" color="#3B4E56">{props?.company?.companyName}</Typography>
       <Typography variant="body2" lineHeight={1.5} marginTop="3px" color="#3B4E56">
        
         {props?.company?.abstract?.length > 100 ? props?.company?.abstract.slice(0,100) + "..." : props?.company?.abstract}
       </Typography>
     </Box>
     <Box>
     <Box className={styles.textSliderValue}>
       <Box className={styles.textSliderValuePrimary} style={{color:theme.palette.primary.dark}} >
         {" "}
         {props?.company?.collectedBudget} {dong}  <span style={{fontSize:"16px" , fontWeight:"normal"}}>Raised</span>
       </Box>
       <Box fontWeight={"600"}>
         <span style={{fontWeight:"normal"}}>of </span> {props?.company?.investmentTarget} {dong}
       </Box>
     </Box>
     <Box>
       <Slider
         aria-label="Temperature"
         value={props?.company?.collectedBudget}
         // getAriaValueText={valuetext}
        //  color="primary"
        // color={"#FFF"}
         // track={false}
         className={styles.slider}
         size="1rem"
         // disabled={true}
         min={1}
         max={props?.company?.investmentTarget}
         sx={{
           color: theme.palette.primary.dark,
          //  color:"#EBEBEB",
           '& .MuiSlider-thumb': {
             display: "none"
           },
           "& .css-14pt78w-MuiSlider-rail": {
            color:"#EBEBEB"
           },
           
         }}
       />
     </Box>
     <Box className={styles.footerGrid}>
       <Box>
         <Box display={"grid"} justifyContent="center" fontWeight={"600"}>
           2,620
         </Box>
         <Box>Investors</Box>
       </Box>
       <Box>
         <Box display="flex" justifyContent={"center"} alignItems="center" gap="0.3rem">
           <Fire /> 
           <Moment format="DD" style={{fontWeight:"600"}}>{props?.company?.closingDate}</Moment> Days
         </Box>
         <Box> Left to invest</Box>
       </Box>
     </Box>
     </Box>
    
   </Box>
    </Link>
  );
};

export default Project;
