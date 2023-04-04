    /*

    FACTORIA F5 - FUNDACIÓN TOMILLO
    FECHA DE INICIO: 27-03-2023
    FECHA DE FIN: 03-04-2023
    FORMADOR: Ana / Jorge
    ALUMNO: Juan Carlos Macías Salvador
    DESCRIPCIÓN: Desarrollar una página web con html, css (usar grip y flex) y javascript, temática libre.

*/
    let decir = true;
    let palabra;
    const texto = document.getElementById("texto");
    let apiKey;
    // pruebas para cargar key desde archivo
    var api = {
        recuperarAPI : function(){
            fetch('/js/api.txt')
            .then(res => res.text())
            .then(content => {
                apiKey = content.split(/\n/);
                console.log("API "+ apiKey);
            });
        }
    }
    const maxTokens = 75;

    async function generateResponse(prompt, retorno) {     
        
        // Hacer una solicitud POST a la API de OpenAI
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens: maxTokens,
            })
        });

        // Analizar la respuesta JSON y obtener la respuesta generada por GPT-3
        const data = await response.json();
        var generatedText = data.choices[0].text;
        // Hacer algo con la respuesta generada
        console.log(generatedText);
        // decimos el texto generado si retorno es true
        if(retorno){
            textToAudio(generatedText);
        }else{
            // limpiamos la palabra seleccionada
            palabra = generatedText.replace(/(\r\n|\n|\r)/gm,'');
            palabra = palabra.replace(/\.+/gm, "");
            palabra = palabra.replace(/\"+/gm, "");
            palabra = palabra.replace(/\ +/gm, "");
            palabra = palabra.replace(/\'/gm, "");
            console.log("la he dicho: "+palabra);
        }
    }

    function cambiarImagenFondo() {
        let numero = Math.floor(Math.random() * 10) + 1;
        var miBody = document.getElementById("login-img3-body");
        
        miBody.style.background = "linear-gradient(rgb(63 81 181 / 48%), rgb(63 81 181 / 48%)), url('img/fondo_" + numero + ".png') no-repeat center center fixed";
    }



    /*
    
    Este metodo esta obsoleto
    por ahora se puede seguir usando hasta que lo eliminen del todo
    
    */

    async function textToAudio(msg) {
        //console.log("Queremos decir? "+ decir);
        cambiarImagenFondo();
        // comprobamos si queremos que lo hable
        if(decir){
            // la caja de donde vamos ha sacar el texto ha speech
            //let msg = document.getElementById("text-to-speech").value;

            // es experimental y no es valido para todos los navegadortes
            // iniciamos el constructor --> SpeechSynthesisUtterance()
            let speech = new SpeechSynthesisUtterance();
            // recuperamos el lenguaje del navegaador
            let ln = navigator.language || navigator.userLanguage;
            console.log("El lenguaje es: " + ln);
            //Importante para dialecto del audio
            speech.lang = ln;
            // texto que decir
            speech.text = msg;
            console.log("El mensaje es: " + msg);
            // nivel de volumen
            speech.volume = 1;
            // velocidad de pronunciación
            speech.rate = 1;
            // tipo de tono de voz
            speech.pitch = 1;
            // lo lanzamos con los parametros
            window.speechSynthesis.speak(speech);
        }else{
            texto.innerHTML = msg;
        }
    }

    function getCookies() {
        // Recuperar el nombre de la cookie si existe
        let nombre;
        let misCookies = document.cookie;
        let listaCookies = misCookies.split(";");
        let buscar = 0;
        for (i in listaCookies) {
            busca = listaCookies[i].search("saludo");
            if (busca > -1) {
                micookie = listaCookies[i];
                let ca = micookie.split('=');
                nombre = ca[1];
                console.log(ca[1]);
                
                buscar++;
            }else{
                nombre = "visitante";
            }
        }
        return nombre;
    }

    function iniciar() {
        api.recuperarAPI();
        cambiarImagenFondo();
        let nombre = getCookies();
        if (nombre != "visitante") {
            console.log("Mi cookie es: existe");
            
            cerrarModal_A();
        } else {
            textToAudio("Bienvenido usuario desconocido. Me gustaria saber tu nombre.");
            console.log("Mi cookie es: no hay");
            $('.cerrarModal_A').on('click', mostrarVentana);
            mostrarVentana();
        }

        
    }

    function mostrarVentana() {
        $('.fondoModal_A').fadeIn(400, function () {
            $('.contenidoModal_A').fadeIn(400);
        });
        console.log("mostrando ventana emergente de las cookies");
        $('.si').on('click', function(){
            let nomInset = document.getElementById("nombre").value;
            if(nomInset.length >= 1){
                acepta_cookie();
            }else{
                textToAudio("No he detectado que escribieras nada en la caja de texto.");
                textToAudio("Puedes seleccionar el botón naranja, donde pone 'no' y te convertirás en visitante.");
            }
        } );
        $('.no').on('click', cerrarModal_A);
        document.getElementById("nombre").focus();
    }

    document.querySelectorAll(".pres").forEach((e) => {
        e.addEventListener("click", () => {
           console.log("pres: "+ e.id);
           texto.innerHTML = "Respuesta de la IA:";
           switch (e.id){
                case "poemas":
                        generateResponse("Escribe un haiku corto con mi nombre " + getCookies() + " en castellano", true);
                    break;
                case "sonido":
                    const parrafo = document.getElementById("sonido");
                    if(parrafo.classList.contains('fa-volume-up')){
                        decir = false;
                        texto.style.display="block";
                        parrafo.classList.replace('fa-volume-up', 'fa-newspaper-o');
                    }else{
                        decir = true;
                        texto.style.display="none";
                        parrafo.classList.replace('fa-newspaper-o', 'fa-volume-up');
                    }
                    break;
                case "azar":
                        generateResponse("Dime cuanta suerte voy a tener. Dime seis numero al azar del 1 al 49. Y los complementarios del 1 al 6 pero solo dos, tambien al azar", true);            
                    break;
                case "palabras":
                    juegopalabras();
                    document.getElementsByClassName("fondoModal_A")[0].style.display="block";
                    document.getElementsByClassName("contenidoModal_B")[0].style.display="block";
                    
                    break;
                case "accesibilidad":
                        document.getElementsByClassName("fondoModal_A")[0].style.display="block";
                        document.getElementsByClassName("contenidoModal_C")[0].style.display="block";
                    break;
                case "pista":
                        textToAudio("Recuerda la palabra empieza por"+palabra[0]+" y termina por "+palabra[palabra.length-1]+". Te diré tambien...");
                        generateResponse("dime un sinonimo de " + palabra + ", sin decirme la palabra.", true);
                    break;
                case "cerrarModalA":
                        document.getElementsByClassName("fondoModal_A")[0].style.display="none";
                        document.getElementsByClassName("contenidoModal_C")[0].style.display="none";
                    break;
                case "cerrarModal":
                        document.getElementsByClassName("fondoModal_A")[0].style.display="none";
                        document.getElementsByClassName("contenidoModal_B")[0].style.display="none";
                        textToAudio("Vale, cierro la ventana.");
                        palabra = "";
                        document.getElementById("mostrar").innerHTML="";
                        document.getElementById("palabraPuesta").value="";
                        document.getElementById("resultado").innerText = "";
                    break;
           }
        });
     });

    function cerrarModal_A() {
        document.getElementsByClassName("fondoModal_A")[0].style.display="none";
        document.getElementsByClassName("contenidoModal_A")[0].style.display="none";
        //textToAudio("Qué bien que estes por aquí " + getCookies()+". ¿que quieres hacer ahora?");
        generateResponse("Dame una bienvenida calurosa. Dime el tiempo que hace en Madrid. Preguntame que quiero hacer ahora. En castellano.", true);
    }
    
    function acepta_cookie() {
        nombre = document.getElementById("nombre").value;
        var date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        var expires = " expires=" + date.toGMTString();
        // caduca por fecha
        document.cookie = "saludo=" + nombre + "; path=/; " + expires;
        // caduca por sesión
        //document.cookie = "saludo=modal; path=/; expires=0";
        location.reload();
    }

    function juegopalabras(){
        generateResponse("Dime una palabra al azar no mas larga de 7 letras y que la primera palabra este en minuscula.", false);
        textToAudio("Mostrando la ventana para el juego...");
        textToAudio("Déjame que busque una palabra interesante para ti.");
        setTimeout(function(){
            //console.log('la palabra es  >>>>>: ' + palabra);
            textToAudio("Perfecto, aquí la tienes.");
            for (var i = 0; i < palabra.length; i++) {
                console.log(i + "letra "+palabra[i]);
                let element = document.createElement("div");
                element.id = palabra[i] + i;
                if(i == 0){
                    element.appendChild(document.createTextNode(palabra[i])); 
                }else{
                   element.appendChild(document.createTextNode('-')); 
                }
                
                document.getElementById("mostrar").appendChild(element);
            }
        
            textToAudio("Te daré una pista, la palabra empieza por " + palabra[0] + ".");
            textToAudio("Y termina por " + palabra[palabra.length-1] + ".");
            document.getElementById("palabraPuesta").focus();
        }, 5000);
    }

    function comprobar() {
        let resultado = 0;
        let palabraPuesta = document.getElementById("palabraPuesta").value;
        let mostrarResultado = document.getElementById("resultado");
        if (palabraPuesta.length == palabra.length) {
            for (var i = 0; i < palabra.length; i++) {
                if (palabra[i] == palabraPuesta[i]) {
                    document.getElementById(palabra[i] + i).innerText = palabraPuesta[i];
                    resultado++;
                }
            }
            
            if (resultado <= 0) {
                mostrarResultado.innerText = "No has acertado ni una";
                textToAudio("No has acertado ni una letra de la palabra seleccionada " + getCookies() + ".");
            }else if(resultado === palabra.length){
                mostrarResultado.innerText = "Eres un genio, las has hacertado todas, te contaré un Haiku con la palabra "+palabra;
                textToAudio("Eres un genio, las has hacertado todas, te contaré un Haiku con la palabra "+palabra+".");
                generateResponse("Escribe un haiku corto con la palabra " + palabra + " en castellano.", true);
            }else {
                mostrarResultado.innerText = "Has acertado " + resultado + " de la palabra, vas muy bien.";
                textToAudio(getCookies() + "! Has acertado " + resultado + " de "+palabra.length+", vas muy bien.");
            }
        } else {
            mostrarResultado.innerText = "La palabra que has puesto no es válida, y además no tienes el mismo número de caracteres. Inténtalo de nuevo.";
            textToAudio(getCookies() + " La palabra que has puesto no es válida, y además no tienes el mismo número de caracteres. Inténtalo de nuevo.");
        }
    }


    window.onload = iniciar();