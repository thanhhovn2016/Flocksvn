import { getProjectCategories } from "../../../services/projects"

const getCategories = async(req, res) => {
    try {
        const data = await getProjectCategories();
        return res.status(200).json(data);
    } catch (error) {
        return res?.status(error?.response?.status)?.json(error?.response?.data)
    }
}

export default getCategories;