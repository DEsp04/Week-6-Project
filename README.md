# Week-6-Project

Below is a description of how Object-Oriented Programming was used for this TodoList app.

A constructor function (Todo) was created to add properties, like the empty todos array. Once the constructor function was created, prototype was obtained to add methods such as, addTodo(), delete(), toggleCompleted(), and toggleAll().

addTodo() method will add an object with todoText(content) and completed properties to todos array. delete() is a method to delete any chosen object element in the todos array. toggleCompleted allows user to change an object completed properties' value from true to false or vice versa. toggleAll() will change all object properties' value from true to false if properties' value is true and vice versa. 

An instance of the Todo constructor function was created and assigned to the todoList let variable. This means we have a new object called todoList and we can now access it properties and method whever this object is being called.

The methods inside the handlers object will handle different clicks. This means click event coming from the buttons (Toggle All & Add) on the web pages, and from newly added listed elements (delete & complete). The handler object have methods that will access the properties and methods from the todoList object to update the object element in the todos array. Once the todos array is updated, the handler's method will call a function from another object called view.

view object have a displayTodos() method to add the updated object elements from todos array to the DOM. This means the user will watch added element to the array as they click Add button. Also, view object has to methods reponsible of creating the complete button and delete button. To listen to these button being clicked, view.setUpEventListeners() was added to the global scope of javascript file. Depending what button is clicked on the newly added element, view.setUpEventListeners will call handler's method to make update on the todos array and then display on the DOM with view.displayTodos().
