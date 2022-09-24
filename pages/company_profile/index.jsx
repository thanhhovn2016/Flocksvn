import { Box } from "@mui/material"
import { useQuery } from "react-query"
import { Raisings } from "../../components/profile"
import axiosInstance from "../../services/axiosWithAuth"
import { apiRoutes } from "../../utils/constants"
import raisingData from "../../data/raisings.json";

const CompanyProfile = () => {

    const getCompanyStatistic = async () => {
        const {data} = await axiosInstance.get(apiRoutes.companyStatistic)
        return data
      }
      const companyStatistic = useQuery("companyStatistic" , getCompanyStatistic)
      console.log("company statistic" , companyStatistic)

    //   const getUserRelatedCompany =  async () => {
    //     const {data} = await axiosInstance.get(apiRoutes.companyUserRelatedCompany 
    //       + `?expand=cover_image,company_category,logo_image&fields=cover_image.url,company_category.name,logo_image.url,number_investors,investment_target,created_at,closing_date,collected_budget,id`)
    //     return data
    //   }
    
    //   const userRelatedCompany = useQuery("userRelatedCompany" , getUserRelatedCompany)
    return(
        <Box> 
            <Raisings
                  // statistics={raisingData.statistics}
                  statistics={companyStatistic?.data ? companyStatistic?.data : false}
                  chartData={raisingData.raisedProjectsChart}
                //   raisedProjects={raisingData.raisedProjects}
                //   raisedProjects={userRelatedCompany?.data?.results}
                />

                <Box>

                </Box>
        </Box>
    )
}
export default CompanyProfile