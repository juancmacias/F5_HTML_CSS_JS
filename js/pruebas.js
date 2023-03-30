var miObjeto = {
    contador : 100,
    contadorF : function(){
        this.contador++;
        //console.log("Mi contador es ahora: "+this.contador);
        return this.contador;
    },
    contadorI : function(){
        this.contador--;
        return this.contador;
    }
}
let numero = miObjeto.contadorF();
console.log("El segundo numero se llama: "+numero);
let numero2 = miObjeto.contadorI();
console.log("El segundo numero se llama: "+numero2);