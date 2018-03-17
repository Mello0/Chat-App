var moment = require('moment');


var createdAt = 15345;
var date = moment(createdAt);

console.log(date.format('hh:mm a'));