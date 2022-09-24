import { getHotProjects } from "../../services"

const getHotProject = async(req, res) => {
    try {
        const data = await getHotProjects();
        console.log(data)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
}

export default getHotProject;