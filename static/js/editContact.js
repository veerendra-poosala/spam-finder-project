

function editContact(contactFormData){
    let msgElement =document.getElementById('msgElement');
    msgElement.textContent = '';
    let id = 1;
    let csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    let url = `/update/${id}/`;
    let  options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body : JSON.stringify(contactFormData)

    };
    let performUpdate = async()=>{
        try{
            let fetchData= await fetch(url,options)
            msgElement.textContent = 'Successfully Added';
            msgElement.classList.toggle('success-message');
            
        }catch(error){

            msgElement.textContent = 'Unable to Create Contact';
            msgElement.classList.toggle('failure-message');

        }
    }
    performUpdate();
    
    
}

document.addEventListener('DOMContentLoaded',()=>{

    //loading all students  details
    

    let form = document.querySelector('#addContactForm');

    form.addEventListener('submit',(event)=>{
        event.preventDefault()

        let editContactPromise = async()=>{

            try{

                let createContactFormdata = new FormData(form)
                
                
                data = {
                    contact_name : createContactFormdata.get('contact_name'),
                    phone_number : createContactFormdata.get('phone_number'),
                    email : createContactFormdata.get('email'),
                    spam : createContactFormdata.get('spam')

                }

                editContact(data);
                let claearForm = await form.reset();
                
            }catch(error){

            }

        }
        editContactPromise();

    });



});


let backBtnElement = document.getElementById('backBtn');
backBtnElement.addEventListener('submit',event=>{
    event.preventDefault();
})