import { Box } from "@mui/material"
import Image from 'next/image'

const ErrorServer = (props) =>{
    return (
        <Box display="grid"  justifyContent={"center" } alignItems="center" pt={10}>
            <Box fontSize={"1.5rem"}  textAlign={"center"} display="grid">We'll be back very soon.</Box>
            <Box textAlign={"center"} display="grid" pt={1}>This website is under construction</Box>
            <Image src={"/images/error_server.jpg"} width={400} height={400}/>
          
        </Box>       
    )
}

export default ErrorServer