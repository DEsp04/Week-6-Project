//Encapsulation (Constructounction): Create Todo properties
function Todo() { 
  this.todos = [];
}

//Encapsulation (Constructor Function): Create Todo methods
Todo.prototype = {
  addTodo: function (todoText) { 
    //pushing object to todos array
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  deleteTodo: function (position) { 
    //delete an object element
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) { 
    //flip boolean from false to true or true to false in object
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () { 
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    /* Add 1 to completedTodos each time there is an object element with 
    completed equal true */
    for (let i = 0; i < totalTodos; i++) { 
      if (this.todos[i].completed === true) { 
        completedTodos++;
      }
    }

    //if eveything is true, then make everything false
    //if everything is false, then make everything true
    if (completedTodos === totalTodos) {
      //make everything false
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else { 
      //make everything true
      for (let i = 0; i < totalTodos; i++) { 
        this.todos[i].completed = true;
      }
    }
  }
}

//Create an instance of Todo and assign it to todoList
let todoList = new Todo();

//methods inside this object will handle different events like click
let handlers = {
  toggleAll: () => {
    todoList.toggleAll();
    view.displayTodos();//
  },
  addTodo: () => {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();//
  },
  deleteTodo: (position) => {
    todoList.deleteTodo(position);
    view.displayTodos();//
  },
  toggleCompleted: (position) => { 
    todoList.toggleCompleted(position);
    view.displayTodos();//
  }
}

//object below will now show the console side (todoList array) to DOM
let view = {
  displayTodos: function () {
    //get ul element
    let todoUl = document.querySelector('ul');
    //leave ul element inside blank
    todoUl.innerHTML = '';
    /* Check each object element inside the todos array,
    forEach gives the position of each element */
    todoList.todos.forEach((todo, position) => {
      //create li element
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';

      //if the object's completed property is true, then check
      //else don't check
      if (todo.completed === true) {
        todoTextWithCompletion = '✔' + todo.todoText;
      } else {
        todoTextWithCompletion = ' ' + todo.todoText;
      }

      //add id to the li element and assign it position
      //add content to the li element
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      
      /* to make 'this' refers to view object add a 'this' parameter to the 
      forEach(callback, this) function */
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleCompletedButton());
      todoUl.appendChild(todoLi);
    }, this) //Add 'this' in the forEach(callback, this). 'this' refers the 'this' inside the callback function to the view object
  },
  createDeleteButton: function () { 
    //Create button and add the delete content
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //add class and a value
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleCompletedButton: function () { 
    let toggleCompleButton = document.createElement('button');
    toggleCompleButton.textContent = 'Complete';
    toggleCompleButton.className = 'completeButton';
    return toggleCompleButton;
  },
  setUpEventListeners: function () { 
    //Event listeners is for delete and complete button
    //get the ul element
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (e) {
      let elementClicked = e.target;
      
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === 'completeButton') { 
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
}

view.setUpEventListeners();
