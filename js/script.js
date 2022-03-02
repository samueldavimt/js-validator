/*

Param: 
    data-rules

Rules:

    required = input required
    min = minimum of characters
    max = maximum characters
    reject-especial-c = reject special characters
    email = validate email

    Ex:
        <input type="text" data-rules="required/min=4/max=30/reject-especial-c">

*/


const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}
const formValidator = {
    validator(event){
        event.preventDefault()

        let send = true

        qsall('label input').forEach((input,index)=>{
            formValidator.removeErrorMessage(input)
            input.style.borderColor = 'gray'
            if(input.dataset.rules){
                let respHandle = formValidator.handleInput(input)
                if(respHandle == false){
                    send = false
                }else{
                    input.style.borderColor = '#106ffd'
                }
            }
        })

        if(send == true){
            window.location.href = "./success.html";

        }
    },

    handleInput(input){
        let rules = input.dataset.rules
        let rulesArgument = []
        let rulesSimple = []
    
        for(let rule of rules.split('/')){
            if(rule.includes('=')){
                rulesArgument.push(rule)
            }else{
                rulesSimple.push(rule)
            }
        }


        for(let ruleSimple of rulesSimple){
          
            switch(ruleSimple){
                case 'required':
                    if(input.value.length == 0){
                        let msg = 'Preencha este Campo'
                        formValidator.inputReject(input,msg)
                        return false
                    }
                    break
                case 'email':
                    let pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                    let email = input.value;
                    if(pattern.test(email) == false){
                        let msg = 'Email Invalido' 
                        formValidator.inputReject(input,msg)
                        return false
                    }
                
                case 'reject-especial-c':
                    let patternSymbols = /[-!$%^&*()+'|"~=`{}\[\]:\/;<>?,#]/;
                    let textValue = input.value;

                    if(patternSymbols.test(textValue) == true){
                        let msg = 'Caracteres Invalidos'
                        formValidator.inputReject(input,msg)
                        return false
                    }    
                
            }
        }

        for(let ruleArg of rulesArgument){
            let nameRule = ruleArg.split('=')[0]
            let valueRule = ruleArg.split('=')[1]

            switch(nameRule){
                case 'min':
                    if(input.value.length < valueRule){
                       let msg = `Mínimo de caracteres: ${valueRule}`

                        formValidator.inputReject(input, msg)
                        return false
                    }
                    break

                case 'max':
                    if(input.value.length > valueRule){
                        let msg = `Máximo de caracteres: ${valueRule}`
                        
                        formValidator.inputReject(input,msg)
                        return false
                    }     
            }
        }
        

    },

    inputReject(input,msg){
        input.style.borderColor = 'red'
        let labelInput = input.parentElement

        let errorMessgae = document.createElement("span")
        errorMessgae.innerHTML = msg
        errorMessgae.classList.add('error-message')

        labelInput.appendChild(errorMessgae)
        
        
    },

    removeErrorMessage(input){
        let labelInput = input.parentElement
        let errorMessage = labelInput.querySelector(".error-message")
        if(errorMessage){
            labelInput.removeChild(errorMessage)
        }
        
    }
}

qs('.form-validator').addEventListener('submit',formValidator.validator)
