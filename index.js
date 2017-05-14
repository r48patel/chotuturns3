var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

//Setup
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Generate pic list
function get_all_pictures() {
	var img_list = []
	fs.readdirSync(path.join('public', 'images')).forEach(file => {
		if(file.endsWith(".jpg")) {
	    	img_list.push(file)
		}
	});
	return img_list.sort()
}

// Render main page
app.get('/', function(request, response) {
	var title="Chotu turns 3"
	var sub_title="Birthday party pictures!"
  response.render('pages/index', {
  	title: title,
  	sub_title:sub_title,
  	gallery_info: get_all_pictures()
  });
});

// Start app on given port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});