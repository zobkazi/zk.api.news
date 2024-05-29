import News from '../../models/news';

export const createNews = async (req, res) => {
  try {
    const { title, newsBody, author, images, categories, tags, views } = req.body;


      
    const newNews = new News({
      title,
      newsBody,
      author,
      images,
      categories,
      tags,
      views
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news', error: error.message });
  }
};
