var entry = [
	'/app/resp-style.js',
	'/app/static-style.js'
];

module.exports = {
	entry: entry.map(function(item){ return __dirname+item; })
};
