# API Documentation

## /api/todos

This endpoint only has one method, GET, which returns the todos array.

## /api/todo

This endpoint has a POST, PUT, and DELETE method.  
POST will create a new todo.  
PUT will update the title or category of an existing todo.  
DELETE will remove a todo from the todos array.

## /api/todo/status

This endpoint has one method, PUT, which toggles the status of a todo.

## /api/todos/category

This endpoint has a GET and a PUT method.  
GET will return all todos of a certain category.  
PUT will iterate through the todos array and check that they all have an existing category assigned to them, else assign category none.

## /api/categories

This endpoint has one method, GET, which returns the categories array.

## /api/category

This endpoint has a POST, PUT, and DELETE method.  
POST will create a new category.
PUT will update the name or color of an existing category.  
DELETE will remove a category from the categories array.