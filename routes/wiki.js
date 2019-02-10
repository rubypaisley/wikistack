const express = require('express');
const router = express.Router();

const { Page, User } = require('../models');
const { main, addPage } = require('../views');
const wikipage = require('../views/wikipage');

router.get('/', async (req, res, next) => {
    try { 
        const pages = await Page.findAll();
        res.send(main(pages));
    } catch (err) { next(err) }
});

router.post('/', async (req, res, next) => {
   try {const [user, wasCreated] = await User.findOrCreate({
       where: {
            name: req.body.author,
            email: req.body.email
        }});
        const page = await Page.create(req.body);
        page.setAuthor(user);
       res.redirect(`/wiki/${page.slug}`);
   } catch (err) { next(err )}

});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});



router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where:
        {
            slug: req.params.slug
        }
    });
        const user = await page.getAuthor();
        res.send(wikipage(page, user));
       
   
    } catch (err) { next(err) }

  });

  

module.exports = router;