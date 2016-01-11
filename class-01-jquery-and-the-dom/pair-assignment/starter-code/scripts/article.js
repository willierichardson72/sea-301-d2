var articles = [];

function Article (opts) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.author = opts.author;
  this.category = opts.category;
  this.title = opts.title;
  this.authorURL = opts.authorURL;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

<<<<<<< HEAD
  $newArticle.data('category', this.category);
  $newArticle.data('title', this.title);
  $newArticle.data('author') this.author);
  $newArticle.data('authorURL') this.authorURL);
  $newArticle.data('publishedOn') this.publishedOn);
  $newArticle.data('body') this.body);
=======
  $newArticle.attr('data-category', this.category);
>>>>>>> f54a0ce0ed65d152b0a3d1d3b3cde035ce5f18af

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newArticle.append('<hr>');

  // TODO: This cloned article is no longer a template, so we should remove that class...
  $newArticle.removeClass('template');
  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
