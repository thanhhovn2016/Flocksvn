import { filterCategoriesProjects } from "../../../services/projects"

const searchProject = async(req, res) => {
    if(!req.query.query) return;
    const searchQuery = req.query.query;
    try {
        const data = await filterCategoriesProjects(searchQuery);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
}

export default searchProject;