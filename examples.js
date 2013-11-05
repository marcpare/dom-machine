var cheerio = require('cheerio');
var walker = require('./domwalker');
var sample_dom = "<div><p>Hello</p></div><div><p>World</p></div>";
$ = cheerio.load(sample_dom);
var root = $.root()[0];

// output the content of text elements
walker.walk(root, function(node){
  if (node.type === 'text'){
    //console.log(node.data);
  }
});

// concat a list of the tags
var tags = []
walker.walk(root, function(node){
  tags.push(node.type);
});
//console.log(tags);

