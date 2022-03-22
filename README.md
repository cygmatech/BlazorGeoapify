# Blazor Geoapify

Nos aplicativos e webpages modernos é preciso que se tenha uma maneira prática e amigável de obter os dados de locais e endereços, como rua, bairro, cidade, cep...  

Os **inputs autocomplete** ou **autosuggest** são a melhor maneira de fazer isso, pois uma lista suspensa com as opções referente ao endereço que estão digitando é mostrada, facilitando assim a nossa escolha e poupando um tempo precioso. 

A [API do Google Maps](https://mapsplatform.google.com/ "API do Google Maps")  é sem dúvida uma das mais conhecidas pelos devs, mas existem outras que são tão boas e oferecem condições que o Google não contempla. 

[Geoapify](https://www.geoapify.com/ "Geoapify") é uma delas. 

Existe uma vasta documentação e tutoriais de como  implantar em seu projeto o autocomplete do Geoapify em JavaScript, React, Angular, porém, senti falta da documentação em C#, e isso me motivou a escrever esse artigo. 

Existem formas de trabalhar com scripts JavaScript em AspNet e Blazor, mas para esse projeto acho que inserir um package NPM é o caminho mais fácil.  

Se você não tem o node.js instalado, [clique aqui](https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos "Instalando NPM") e siga os passos desse artigo.

## Início
Antes de mais nada é preciso fazer uma conta no site da [Geoapify](https://www.geoapify.com/ "Geoapify") para que se possa obter uma **API Key** que será usada mais adiante no projeto. 

Geoapify oferece um **plano gratuito** com limite de até 3.000 solicitações por dia, onde não se pede nem ao menos o número do seu cartão de crédito para que se faça a inscrição. 

## Projeto

Para implantar o projeto na Plataforma .NET vou utilizar o Blazor 

- Inicie no Visual Studio um projeto padrão **Blazor WebAssembly**. 

- Crie uma pasta com nome **npm_package** na raiz do projeto. 

- Dê um clique com o botão direito sobre a pasta que você acabou de criar e em seguida escolha **Open in Terminal** para abrir o prompt de comando. 

Digite para iniciar o npm 



***npm init -y***

Em seguida digite para instalar o webpack e webpack-cli 


***npm install webpack webpack-cli***


Finalmente digite para instalar o package geoapify 


***npm i @geoapify/geocoder-autocomplete***


- Agora, dentro da pasta **npm_package** crie uma subpasta e dê o  nome **src** 



- Dentro da pasta **src**  que você acabou de criar crie um arquivo javasript chamado **index.js** 



- Escolha **JavaScriptFile** >> **index.js** >> **Add** 

- No arquivo **package.json** que se encontra na pasta **npm_package** 

Substitua: 

```csharp
 "test": "echo \"Error: no test specified\" && exit 1" 
```

Por: 

```csharp
 "build": "webpack ./src/index.js --output-path ../wwwroot/js --output-filename index.bundle.js --mode=development" 
```

- Agora na sua **Index.razor** insira o seguinte 



 ```html
<div id="autocomplete" class="autocomplete-container"></div>
    
    <style>
   
        body {
            font: 16px;
            background: #f3f5f6;
        }
    
        .autocomplete-container {
            /*the container must be positioned relative:*/
            position: relative;
        }
   
        .geoapify-autocomplete-input {
            width: calc(100% - 43px);
            outline: none;
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 10px;
            padding-right: 31px;
            font-size: 16px;
        }
    
        .geoapify-autocomplete-items {
            position: absolute;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
            border-top: none;
            background-color: #fff;
            z-index: 99;
            top: calc(100% + 2px);
            left: 0;
            right: 0;
        }
    
         .geoapify-autocomplete-items div {
                padding: 10px;
                cursor: pointer;
            }
    
          .geoapify-autocomplete-items div:hover {
                    /*when hovering an item:*/
                    background-color: rgba(0, 0, 0, 0.1);
                }
    
          .geoapify-close-button {
				color: rgba(0, 0, 0, 0.4);
				cursor: pointer;
				position: sticky;
				right: 5px;
				top: 0;
				height: 100%;
				display: none;
				align-items: center;
        }
    
            .geoapify-close-button.visible {
                display: unset;
            }
    
            .geoapify-close-button:hover {
                color: rgba(0, 0, 0, 0.6);
            }
    
        .geoapify-autocomplete-items .active {
            /*when navigating through the items using the arrow keys:*/
            background-color: rgba(0, 0, 0, 0.1);
        }
    
    </style>
```



- No arquivo **index.js** insira:




```javascript
 import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

    const autocomplete = new GeocoderAutocomplete(
        document.getElementById("autocomplete"),
        'YOUR_API_KEY',
        { placeholder: "Digite aqui um endereço" });

    autocomplete.on('select', (location) => {

    });

    autocomplete.on('suggestions', (suggestions) => {

    });
```





> Você deve subistituir **YOUR_API_KEY** pela sua api key que você gerou quando criou a sua conta no site da Geoapify. 

- Abra o arquivo wwwroot/index.html 

Dentro do **body**
Subtitua:
```html
<script src="_framework/blazor.webassembly.js"></script> 

```
Por:
```html
<script src="_framework/blazor.webassembly.js" autostart="false"></script> 
     <script> 
         Blazor.start().then(function () { 
             var customScript = document.createElement('script'); 
             customScript.setAttribute('src', 'js/index.bundle.js'); 
             document.head.appendChild(customScript); 
         }); 
</script>
```
- No seu arquivo **.csproj** (duplo clique no nome do projeto, abaixo de Solution) insira:
```csharp
<Target Name="PreBuild" BeforeTargets="PreBuildEvent"> 
      <Exec Command="npm install" WorkingDirectory="npm_package" /> 
      <Exec Command="npm run build" WorkingDirectory="npm_package" /> 
</Target> 
```

- Rebuild Solution

Agora é só  teclar em **F5** para testar.

Fontes:<br/>

[Pagina oficial Geoapify](https://apidocs.geoapify.com/samples/autocomplete/geoapify-geocoder-autocomplete/ "Geoapify")<br/>

[NPM Geoapify](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete "MPM Geoapify")<br/>

[Brian Lagunas](https://brianlagunas.com/using-npm-packages-in-blazor/ "Brian Lagunas")
