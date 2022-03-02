# js-validator

Validador de formulário com JavaScript

## Description

O script inclue regras nos inputs do formulário. As regras são implementadas através do parâmetro (data-rules) que pode ser adicionado nos inputs escolhidos.


### Regras

* required = input required
* min = minimum of characters
* max = maximum characters
* reject-especial-c = reject special characters
* email = validate email

### Exemplo

```
<input type="text" data-rules="required/min=4/max=30/reject-especial-c">
```

### Clone este Repositório

```
git clone https://github.com/samueldavimt/js-validator.git
```
