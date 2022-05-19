const Author = require('../model/author.model');

module.exports.findAllAuhtors = (req, res) => {
    Author.find()
        .then(allAuthors => res.json({ author: allAuthors}))
        .catch(err => res.json({message : 'Something went Wrong', error : err}));
}

module.exports.findOneAuthor = (req, res) => {
    Author.findOne({_id : req.params.id})
        .then(oneAuthor => res.json({ author : oneAuthor}))
        .catch(err => res.json({message : 'Something went Wrong', error : err}));
}

module.exports.updateAuthor = (req, res) => {
    Author.updateOne(
        {_id : req.params.id},
        req.body,
        {new : true, runValidators : true})
        .then(updatedAuthor => res.json({author : updatedAuthor}))
        .catch(err => res.json({message : 'Something went Wrong', error : err}));
}

module.exports.createAuthor = (req, res) => {
    Author.create(req.body)
        .then(newAuthor => {
            res.json({author : newAuthor})
        })
        .catch(err => {
            res.json({msg : "Something went wrong", error : err})
        });
}

module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({_id: req.params.id})
        .then(deletedAuthor => {
            res.json({author : deletedAuthor})
        })
        .catch(err => {
            res.json({msg : "Something went wrong", error : err})
        });
}