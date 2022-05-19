const AuthorController = require('../controller/author.controller');

module.exports = app => {
    app.get('/api/authors', AuthorController.findAllAuhtors);
    app.get('/api/authors/:id', AuthorController.findOneAuthor);
    app.post("/api/authors", AuthorController.createAuthor);
    app.put("/api/authors/:id", AuthorController.updateAuthor);
    app.delete("/api/authors/:id", AuthorController.deleteAuthor);
}