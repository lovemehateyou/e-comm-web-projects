list = [{
    name:'',
    duedate:''
}];

document.querySelector('.js-add').addEventListener('click', function(){
   todo_list_add()
    print_todolist() 
})

function todo_list_add(){
   pop =  document.querySelector('.js_input')
   date = document.querySelector('.js_date')
   const duedate = date.value;
   const valuex = pop.value;
   list.push({
    name: valuex,
    duedate :duedate
   });
   pop.value='';

   print_todolist();
}


   function print_todolist(){
    let todohtml = '';
    for(let i = 0;i<list.length;i++){
     let todoobject = list[i]
     const name = todoobject.name;
     const date = todoobject.duedate;
      if(name != '' && date != ''){
         const html = `
         <div>${name}</div>
         <div>${date}</div>
         <button onclick = "
         list.splice( ${i},1)
         print_todolist();
      " class = "delete_button">Delete</button>
      `;
        todohtml+=html;
      }
    
    }
    document.querySelector('.js_result').innerHTML= todohtml;
    
   }
    
   
