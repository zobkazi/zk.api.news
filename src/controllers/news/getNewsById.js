import News from '../../models/news';


const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid news ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export default getNewsById