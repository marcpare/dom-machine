// Ported to cheerio from https://gist.github.com/cowboy/958000
// TODO: easily support node APIs besides cheerio API
exports.walk = function (node, callback) {
    var skip, tmp;
    var depth = 0;
    do {
        if (!skip) {
            skip = callback(node, depth) === false;
        }
        if (!skip && node.children && node.children.length > 0) {
            tmp = node.children[0];
            depth++;
        } else if (tmp = node.next) {
            skip = false;
        } else {
            tmp = node.parent;
            depth--;
            skip = true;
        }
        node = tmp;
    } while (depth > 0);
};