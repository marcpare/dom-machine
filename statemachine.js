var cheerio = require('cheerio');
var walker = require('./domwalker');
var sample_dom = "<div><p>Hello</p></div><div><p>World</p></div>";
$ = cheerio.load(sample_dom);
var root = $.root()[0];

var dommachine = function($){
    var dom_processor = {
        matched:false,
        initialize: function(){ this.state = this.logit; },
        check_match: function(){
            //this.state = add_matches;
        },
        logit: function(node){
            if (node.type==='tag' && node.name === 'a'){
                console.log($(node).text());
            }
            if (node.type==='tag' && node.name === 'h3'){
                console.log($(node).text());
            }
        },
        add_matches: function(){
            this.state = logit;
        },
        done: function(){ return; },
        process_node: function(node){
            this.state.call(this, node);
        }
    };
    dom_processor.initialize();
    //console.log(root);
    //console.log(root.children[0]);
    walker.walk(root, function(node){
        //console.log(node);
        this.process_node(node);
    }.bind(dom_processor));
}

// pull me out the text elements
text = dommachine(root);
console.log(text);

// TODO: pull me out all the text after the second h2, not after the third