import { getFaqCategoryItems } from "../../../services"

const faqCategories = async(req, res) => {
    const categoryId = req.query.categoryId;
    try {
        const data = await getFaqCategoryItems(categoryId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}

export default faqCategories;