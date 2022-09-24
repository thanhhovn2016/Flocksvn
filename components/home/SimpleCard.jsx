import { Card, CardContent, Typography } from "@mui/material";

const SimpleCard = ({title, icon:Icon, body}) => {

    return (
        <Card variant="outlined" sx={{minHeight:250, borderRadius: 5, cursor: "pointer"}}>
            <CardContent sx={{textAlign: "center", padding: 5}}>
                <Icon />
                <Typography variant="h5" gutterBottom color={"primary"} fontFamily={"Segoui"}>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom color={"primary"}>
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SimpleCard;