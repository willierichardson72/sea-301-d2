(function(module) {
  function Article (opts) {
    // DONE: Here, we are using Functional Programming to DRY out our property assignment.  ALL of the properties of our 'opts' object will now be assigned as properties of the newly created article object.
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

<<<<<<< HEAD
  // DONE: Set up a DB table for articles.
=======
  // TODO: Setup a DB table for our articles.  Be sure to include all of the required fields and their associated constraints.
>>>>>>> ce0ff4465b2fa73e823b26b90601ae554bbfc678
  Article.createTable = function(callback) {
    webDB.execute("CREATE TABLE articles ('title' VARCHAR(30) NOT NULL, 'category' VARCHAR(30) NOT NULL, 'author' VARCHAR(30) NOT NULL, authorUrl VARCHAR(30) NOT NULL, 'publishedOn' DATETIME, 'body' VARCHAR(30) NOT NULL);",

      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };

  // DONE: Correct the SQL to delete all records from the articles table.back():
  Article.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM articles;',
      callback
    );
  };


<<<<<<< HEAD
  // DONE: Insert an article instance into the database:
=======
  // TODO: Insert an article instance into the database.  Be sure to make the values of each record dynamic.
>>>>>>> ce0ff4465b2fa73e823b26b90601ae554bbfc678
  Article.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOne, this.body],
        }
      ],
      callback
    );
  };

<<<<<<< HEAD
  // DONE: Delete an article instance from the database:
=======
  // TODO: Delete an article instance from the database.
>>>>>>> ce0ff4465b2fa73e823b26b90601ae554bbfc678
  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this,title, this.author, this,authorUrl, this.category, this.publishedOne, this.body],/* ... */
        }
      ],
      callback
    );
  };

  // TODO: Update an article instance, overwriting it's properties into the corresponding record in the database.
  Article.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
        'sql': 'UPDATE INTO articles (title, author, authorUrl, category, publishedOn, body WHERE id = ? ) ;',
        'data': [this,title, this.author, this,authorUrl, this.category, this.publishedOne, this.body],
        }
      ],
      callback
    );
  };

  // DONE: Refactor to expect the raw data from the database, rather than localStorage.
  Article.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  // DONE: Refactor this to check if the database holds any records or not. If the DB is empty,
  // we need to retrieve the JSON and process it.
  // If the DB has data already, we'll load up the data (sorted!), and then hand off control to the View.
  Article.fetchAll = function(next) {
<<<<<<< HEAD
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
=======
    webDB.execute('', function(rows) {
      // Check to see if our article has any rows
>>>>>>> ce0ff4465b2fa73e823b26b90601ae554bbfc678
      if (rows.length) {
        Article.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/hackerIpsum.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            // Cache the newly-instantiated article in DB:
          article.insertRecord();
          });
          // Now get ALL the records out the DB, with their database IDs:

          webDB.execute('SELECT * FROM articles', function(rows) {
            // Now instanitate those rows with the .loadAll function, and pass control to the view.
           Article.loadAll(rows);
           next();
          });
        });
      }
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.all.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\b\w+/g).length
        })
        .reduce(function(a, b) {
          return a + b;
        })
      }
    })
  };

  Article.stats = function() {
    return {
      numArticles: Article.all.length,
      numWords: Article.numwords(),
      Authors: Article.allAuthors(),
    };
  }

  module.Article = Article;
})(window);
