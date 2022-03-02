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
            input.style.borderColor = 'gray'
            if(input.dataset.rules){
                let respHandle = formValidator.handleInput(input)
                if(respHandle == false){
                    send = false
                }
            }
        })

        if(send == true){
            event.target.submit()
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

        console.log('arg',rulesArgument)
        console.log(rulesSimple)

        for(let ruleSimple of rulesSimple){
          
            switch(ruleSimple){
                case 'required':
                    if(input.value.length == 0){
                        console.log(input.getAttribute('name'),'input nao preenchido')
                        formValidator.inputReject(input)
                        return false
                    }
                    break
                case 'email':
                    let pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                    let email = input.value;
                    if(pattern.test(email) == false){
                        console.log(input.getAttribute('name'),'email invalido') 
                        formValidator.inputReject(input)
                        return false
                    }
                
                case 'especial_caractere':
                    let patternSymbols = /[-!$%^&*()+'|"~=`{}\[\]:\/;<>?,#]/;
                    let textValue = input.value;

                    if(patternSymbols.test(textValue) == true){
                        console.log(input.getAttribute('name'),'carateres invalidos') 
                        formValidator.inputReject(input)
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
                        console.log(input.getAttribute('name'),'value minimo',valueRule)

                        formValidator.inputReject(input)
                        return false
                    }
                    break

                case 'max':
                    if(input.value.length > valueRule){
                        console.log(input.getAttribute('name'),'value maximo',valueRule)
                        
                        formValidator.inputReject(input)
                        return false
                    }     
            }
        }
        

    },

    inputReject(input){
        input.style.borderColor = 'red'
        
    }
}

qs('.form-validator').addEventListener('submit',formValidator.validator)
