import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

import { useAppTheme, useTranslation } from "../../../hooks";

const InvestedProjectsChart = ({ data }) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  return (
    <Card sx={{ p: 3 , borderRadius:"4px"}}>
      <CardContent>
        <Typography color="secondary.dark" fontWeight="bold">
          {t?.invested_projects_chart}
        </Typography>
        <ResponsiveContainer height={300} style={{width:"100%"}}>
          {data?.length > 0 && (
            <AreaChart
            
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="projectTitle" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="raisedAmount"
                stroke="#8884d8"
                fill="#FFF"
              />
            </AreaChart>
            // <BarChart
            //   data={data}
            //   barCategoryGap={"20%"}
            //   margin={{
            //     top: 15,
            //     right: 50,
            //     left: 0,
            //     bottom: 50,
            //   }}
            // >
            //   <CartesianGrid strokeDasharray="3" vertical={false} />
            //   <XAxis
            //     dataKey="projectTitle"
            //     angle={-45}
            //     tickMargin={22}
            //     tickSize={10}
            //   ></XAxis>
            //   <YAxis />
            //   <Tooltip />
            //   <Legend
            //     verticalAlign="top"
            //     align="right"
            //     height={40}
            //     margin={{
            //       bottom: 100,
            //     }}
            //   />
            //   <Bar
            //     dataKey="investedAmount"
            //     fill={theme.palette.primary.main}
            //     unit={"$"}
            //     style={{ borderRadius: "10px" }}
            //   />
            // </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InvestedProjectsChart;
