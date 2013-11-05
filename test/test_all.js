var should    = require("chai").should();
var cheerio   = require('cheerio');
var walker    = require('../domwalker');

describe('walker', function(){
    it('should traverse depth first', function(){
      var sample_dom, root, tags;
      sample_dom = "<div><p>Hello</p></div><div><p>World</p></div>";
      root = cheerio.load(sample_dom).root()[0];
      tags = [];
      walker.walk(root, function(node){
        tags.push(node.type);
      });
      console.log(tags);
      tags.should.deep.equal(['root', 'tag', 'tag', 'text', 'tag', 'tag', 'text']);
    })
});