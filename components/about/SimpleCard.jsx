import { Card, CardContent, Box, Typography } from "@mui/material";

const SimpleCard = ({ icon:Icon, text}) => {

    return (
        <Card variant="outlined" sx={{minHeight:150, borderRadius: 5}}>
            <CardContent p={5} sx={{textAlign: 'center'}}>
                <Typography variant="body1" color="primary">
                    <Box component="span" sx={{marginRight:2}}>
                        <Icon />
                    </Box>
                    <Box component="span">
                    {text}
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SimpleCard;