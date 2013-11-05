var _          = require('underscore');
var cheerio    = require('cheerio');
var walker     = require('./domwalker');
var sample_dom = "<div><p>Hello</p></div><div><p>World</p></div>";
$ = cheerio.load(sample_dom);
var root = $.root()[0];

var DOMMachine = {
  transition_state: function(new_state){ 
    this.state = this[new_state]; 
  },
  process_node: function(node){ 
    this.state(node); 
  },
  process: function(dom){
    this.transition_state(this.initial_state);
    walker.walk(dom, function(node){
      this.process_node(node);
    }.bind(this));
  },
  is_heading: function(node){
    return node.type === 'tag' && node.name === 'h2';
  },
  is_text: function(node){
    return node.type === 'text';
  },
};
var gimmetext = _.extend(DOMMachine, {
  initial_state: 'skip_first_heading',
  results: [],
  skip_first_heading: function(node){
    if(this.is_heading(node)){
      this.transition_state('emit_after_next_heading');
    }
  },
  emit_after_next_heading: function(node){
    if(this.is_heading(node)){
      this.transition_state('emit_for_one_heading');
    }
  },
  emit_for_one_heading: function(node){
    if(this.is_heading(node)){
      this.transition_state('done')
    }else if (this.is_text(node)){
      this.results.push(node.data);
    }
  },
  done: function(node){}
});

// pull me out all the text after the second h2, not after the third
var sample_dom 
= "<h2>First Heading</h2>"
+ "<p>Hello</p>"
+ "<h2>Second Heading</h2>"
+ "<p>Scrape me</p>"
+ "<h2>Third Heading</h2>"
+ "<p>Don't Scrape me</p>";
$ = cheerio.load(sample_dom);
var root = $.root()[0];
gimmetext.process(root);
console.log(gimmetext.results);





