

function createContact(studentFormData){
    let msgElement =document.getElementById('msgElement');
    msgElement.textContent = '';
    let csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    let url = '/create/';
    let  options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body : JSON.stringify(studentFormData)

    };
    let performCreate = async()=>{
        try{
            let fetchData= await fetch(url,options)
            msgElement.textContent = 'Successfully Added';
            msgElement.classList.toggle('success-message');
            
        }catch(error){

            msgElement.textContent = 'Unable to Create Contact';
            msgElement.classList.toggle('failure-message');

        }
    }
    performCreate();
    
    
}

document.addEventListener('DOMContentLoaded',()=>{

    //loading all students  details
    

    let form = document.querySelector('#addContactForm');

    form.addEventListener('submit',(event)=>{
        event.preventDefault()

        let creatContactPromise = async()=>{

            try{

                let createContactFormdata = new FormData(form)
                
                
                data = {
                    contact_name : createContactFormdata.get('contact_name'),
                    phone_number : createContactFormdata.get('phone_number'),
                    email : createContactFormdata.get('email'),
                    spam : createContactFormdata.get('spam')

                }

                createContact(data);
                let claearForm = await form.reset();
                
            }catch(error){

            }

        }
        creatContactPromise();

    });



});


let backBtnElement = document.getElementById('backBtn');
backBtnElement.addEventListener('submit',event=>{
    event.preventDefault();
})