// import { useRouter } from "next/router";
import { getProjects } from "../../../services/projects"

const getCategories = async(req, res) => {
//     const router = useRouter()
// console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", router)
    try {
        const data = await getProjects( );
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error?.response?.status).json(error?.response?.data)
    }
}

export default getCategories;