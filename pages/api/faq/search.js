import { getSearchedFaqs } from "../../../services"

const searchFaq = async(req, res) => {
    if(!req.query.query) return;
    const searchQuery = req.query.query;
    try {
        const data = await getSearchedFaqs(searchQuery);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
}

export default searchFaq;