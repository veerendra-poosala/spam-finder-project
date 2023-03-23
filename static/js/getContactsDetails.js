

let searchElement = document.getElementById('search_input_value');
let listItemsContainer = document.querySelector('#contacts-list') ;
let editBtnElement = document.getElementById('editBtn');
let editContactForm = document.getElementById('editContactForm');



function createAndAppendContact(contact){

    let uniqueId = 'id-'+contact['id'];
    let contactContainer = document.createElement('li');
    contactContainer.classList.add('contact-container', 'w-auto','d-flex', 'flex-row', 'p-2','mt-2','mb-2');
    
    contactContainer.id = 'div'+uniqueId;
    //console.log(contactContainer.id)

    

    
    let nameElement = document.createElement('label');
    nameElement.classList.add('label-element');
    nameElement.textContent = `${contact['contact_name']}`;
    contactContainer.appendChild(nameElement);

    let numberElement = document.createElement('label');
    numberElement.classList.add('label-element');
    numberElement.textContent = `${contact['phone_number']}`;
    contactContainer.appendChild(numberElement)

    let spamBox = document.createElement('div');
    spamBox.id = 'spamBox'+contact['phone_number'];



    let inputElementId = 'checkbox'+uniqueId;
    
    let createCheckboxElement = document.createElement('input');
    createCheckboxElement.type = 'checkbox';
    createCheckboxElement.id = inputElementId;
    
    let spamElement = document.createElement('label');
    spamElement.classList.add('label-element');
    spamElement.setAttribute('for',inputElementId);
    
    if(contact.spam){
        spamElement.textContent = 'Spam Number';
        spamElement.classList.toggle('spam-element');
        createCheckboxElement.checked = false;
    }else{
        spamElement.textContent = 'Verified Number';
        spamElement.classList.toggle('verified-element');
        createCheckboxElement.checked = true;

    }
    spamBox.appendChild(spamElement);
    spamBox.appendChild(createCheckboxElement)
    contactContainer.appendChild(spamBox);

    let editButtonElement = document.createElement('button');
    editButtonElement.classList.add('btn','btn-primary','ml-2','edit-button');
    editButtonElement.textContent = 'Edit';
    editButtonElement.id = 'edit'+ uniqueId;
    
    
    editButtonElement.addEventListener('click',function(event){
        let editContainerElement = document.getElementById('editContainer');

        editContainerElement.classList.remove('d-none');
        editContainerElement.classList.add('d-block');
        let contact_name = document.getElementById('contact_name');
        contact_name.value = contact['contact_name'];
        let phone_number = document.getElementById('phone_number');
        phone_number.value = contact['phone_number'];
        let email = document.getElementById('email');
        email.value = contact['email'];
        let spam = document.getElementById('spam');
        spam.value = contact['spam'];
        let idParagraph = document.getElementById('modelId');
        idParagraph.textContent = contact['id'];
     
    });

    let deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('btn','btn-danger','ml-2','edit-button');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.id = uniqueId;

    deleteButtonElement.addEventListener('click',(event)=>{
        let alertBox = document.createElement('alert');
        
        let deleteItemId = contact['id'];
        let csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
        
        let options = {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'X-CSRFToken': csrftoken
            }
        }
        let url = `/destroy/${deleteItemId}/`;
        fetch(url,options)
        .then(()=>{
            loadContacts();
        })
    });

   

    contactContainer.appendChild(editButtonElement);
    contactContainer.appendChild(deleteButtonElement);


    

    listItemsContainer.appendChild(contactContainer);

}



function loadContacts(){
    
    fetch('/list/')
    
    .then(response => response.json())
    
    .then(data => {
        
        
        //let listItemsContainer = document.querySelector('#contacts-list') ;
        listItemsContainer.innerHTML = '';
        //console.log(( data))
        

        for (let contact of data) {


            createAndAppendContact(contact);
           
        };
    
    })

    
}


document.addEventListener('DOMContentLoaded',()=>{

    //loading all contacts  details
    loadContacts();
    
})


function displaySearchResults(search_input_value){
    
    let searchInputVal = search_input_value ;
    
    let url = '/list/'
    let options = {
        method: 'GET'
    };

    fetch(url, options)
    
        .then(response => response.json())
        .then(data => {
            
            let listItemsContainer = document.querySelector('#contacts-list') ;
            listItemsContainer.innerHTML = '';
            let runLoop = true;
            
            
                
                data.some(contact => {
                
            
                let contactName = contact['contact_name'];
                let phone_number = contact['phone_number'];
                
                
                if (contactName.toLowerCase().includes(searchInputVal.toLowerCase()) || phone_number.includes(searchInputVal) ) { 
                    
                    createAndAppendContact(contact);
               
                }
                
                });

            });

       
}



searchElement.addEventListener('keydown',(event)=>{
    
    let listItemsContainer = document.querySelector('#contacts-list') ;
    //listItemsContainer.innerHTML = '';
    let search_input_value = searchElement.value;
    displaySearchResults(search_input_value);
    
});
    
   

let searchButton = document.getElementById('search_button');
searchButton.addEventListener('click',(event)=>{
    let search_input_value = searchElement.value;
    if(search_input_value.length === 10){
        let listItemsContainer = document.querySelector('#contacts-list') ;
        listItemsContainer.innerHTML = '';
        checkIsSpamNumber(searchElement.value);
        
    };
    searchElement.value = '';
    
});




function checkIsSpamNumber(number=''){
    let is_valid = false
    
    if(number.length === 10 && (number % 1 === 0)){

        fetch(`/retrieve/${number}/`)
        .then(response => response.json())
        
        .then(data => {
            //console.log(data,"data")
            
            if (data.message === 'Object not found') {
                
                let contact = {

                    contact_name : 'Unknown',
                    phone_number : number,
                    email : 'Not Available',
                    spam : true,
                    owner_name : 'Unknown'


                }
                createAndAppendContact(contact);

                
            }else{
                
                createAndAppendContact(data);
            }
            
        })
        
        .catch(error =>{console.log(error)} );
        

    }

    

}

let submitBtn = document.getElementById('submitBtn');

    
submitBtn.addEventListener('click',(event)=>{
        
        
        // need to implement from here...
        let contact_name = document.getElementById('contact_name');
        
        let phone_number = document.getElementById('phone_number');
        
        let email = document.getElementById('email');
        
        let spam = document.getElementById('spam');
        let id = document.getElementById('modelId');
        id= String(id.textContent);
        
        
        
        let editFormData = {

            contact_name : contact_name.value,
            phone_number : phone_number.value,
            email : email.value,
            spam : spam.checked

        }
        

        
        let msgElement =document.getElementById('msgElement');
        msgElement.textContent = '';
        let csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
        let url = `/update/${id}/`;
        let  options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
            },
            body : JSON.stringify(editFormData)

        };
        let performCreate = async()=>{
            try{
                let fetchData= await fetch(url,options)
                
                let editContainerElement = document.getElementById('editContainer');

                editContainerElement.classList.remove('d-block');
                editContainerElement.classList.add('d-none');
                
            }catch(error){

                msgElement.textContent = 'Unable to Create Contact';
                msgElement.classList.toggle('failure-message');

            }
        }
        performCreate();
        
    })

let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click',(event)=>{
    let editContainer  = document.getElementById('editContainer');
    editContainer.classList.remove('d-block');
    editContainer.classList.add('d-none');
});