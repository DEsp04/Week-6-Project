//Grouping properties and methods in relation to the todoList
let todoList = {
  todos: [],
  addTodo: function (todoText) { 
    //pushing object to todos array
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) { 
    // Changes object's todoText property's value
    this.todos[position].todoText = todoText;
    this.displayTodos()
  },
  deleteTodo: function (position) { 
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) { 
    let todo = this.todos[position];
    //flip boolean from false to true or true to false in object
    todo.completed = !todo.completed;
  },
  toggleAll: function () { 
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    //get number of completed todos
    for (let i = 0; i < totalTodos; i++) { 
      if (this.todos[i].completed === true) { 
        completedTodos++;
      }
    }

    //if eveything is true, then make everything is false
    //if everything is fase, then make everything is true
    if (completedTodos === totalTodos) {
      //make everything false
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else { 
      for (let i = 0; i < totalTodos; i++) { 
        this.todos[i].completed = true;
      }
    }
  }
};


//methods inside this object will handle different events like click
let handlers = {
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();//
  },
  addTodo: function () {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();//
  },
  changeTodo: function () {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    //clear input was you're done
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();//
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();//
  },
  toggleCompleted: function () { 
    let toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();//
  }
}

//object below will now show the console side to DOM
let view = {
  displayTodos: function () {
    //get ul element
    let todoUl = document.querySelector('ul');
    //leave ul element inside blank
    todoUl.innerHTML = '';
    //Check each object element inside the todos array
    todoList.todos.forEach((todo, position) => {
      //create li element
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';

      //if the object's completed property is true, then check
      //else don't check
      if (todo.completed === true) {
        todoTextWithCompletion = '(x)' + todo.todoText;
      } else {
        todoTextWithCompletion = '( )' + todo.todoText;
      }

      //add id to the li element and assign it position
      //add content to the li element
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      
      //to make this refers to view object add a this parameter to the 
      //forEach(callback, this) funciton
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }, this) //Add this in the forEach(callback, this). this refers the this inside the callback function to the view object
  },
  createDeleteButton: function () { 
    //Create button and add the delete content
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //add class and a value
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function () { 
    //get the ul element
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (e) {
      let elementClicked = e.target;
      
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
}

view.setUpEventListeners();
