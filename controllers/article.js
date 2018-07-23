const Article = require('../models').Article;

module.exports = {
    createGet: (req, res) => {
res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;
        let userId = req.user.id;
        articleArgs.authorId = userId;
        let errorMsg = '';
        if (!req.isAuthenticated()){
            errorMsg = 'You should be logged in to kame articles!'
        } else if (!articleArgs.title){
            errorMsg = 'Invalid title';
        } else if (!articleArgs.content){
            errorMsg = 'Invalid content!';
        }
        if (errorMsg){
            res.render('article/create',{erro:errorMsg});
            return;
        }
        articleArgs.authorId = req.user.id;

        Article.create(articleArgs).then(article =>{
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
            res.render('article/create', {error: err.message});
        })
    },
    details:(req,res) =>{
        let atricleId = req.params.id;
        Acticle.findById(articleId, {include: [
                {
                    model: User,
                }
            ]
        }).then(article =>{
            res.render('article/details', article.dataValues)
        });
    }
};