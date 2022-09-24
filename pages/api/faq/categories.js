import { getFaqCategories } from "../../../services"

const faqCategories = async(req, res) => {
    try {
        const data = await getFaqCategories();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
}

export default faqCategories;