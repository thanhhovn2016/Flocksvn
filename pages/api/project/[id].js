import { getProjectDetails } from "../../../services/projects"


const getProject = async(req, res) => {
    const projectId = req.query.id;
    if(!projectId) return;
    try {
        const data = await getProjectDetails(projectId);
        return res?.status(200)?.json(data);
    } catch (error) {
        return res?.status(error?.response?.status)?.json(error?.response?.data)
    }
}

export default getProject;