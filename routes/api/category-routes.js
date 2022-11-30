const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findall ({
      include: [{ model: Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!categoriesData) {
      res.status(404).json({message: 'There is not catergory with that id.'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body?.category_name) res.status(400).json({ message: 'There is not a category name in the request body'})
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update(req.body, {
      where: {id: req.params.id}
    });
    if (!categoriesData) {
      res.status(404).json({message: 'There is not catergory with that id.'});
      return;
    }
    res.status(200).json({message: `You have successfully updated the category with the id ${req.params.id}`});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  
});

module.exports = router;
