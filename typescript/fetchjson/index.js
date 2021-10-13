"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(url).then(function (res) {
    var todo = res.data;
    var id = todo.id, title = todo.title, completed = todo.completed;
    console.log("\n    The Todo with ID: " + id + "\n    Has a title of: " + title + "\n    Is it finished? " + completed + "\n  ");
});
