const App = new Vue({
   el: '#app',
   data:
   {
      header:
      {
         title: 'Juegos Web con HTML5 y Javascript',
         subtitle: 'Canal de youtube de "Sistemas y Micros"'
      },
      footer:
      {
         link:
         {
            title: 'Referencia "Adivina la Fruta"',
            href: 'https://www.youtube.com/watch?v=HSkl-A7QSrs'
         },
         img:
         {
            title: 'Youtube',
            alt: 'Ícono Youtube',
            src: 'https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png'
         }
      },
      juego: false,
      win: false,
      lose: false,
      contador_aciertos: 0,
      contador_errores: 0,
      win_contador: 0,
      lose_contador: 0,
      aleatorio: 0,
      palabra_escrita: [],
      botones: [],
      color_botones: [],
      letras: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
      palabras: 
      [
         'manzana',
         'pera',
         'banana',
         'naranja',
         'mandarina',
         'durazno',
         'mora',
         'anana',
         'kiwi',
         'pomelo',
         'frambuesa',
         'melocoton',
         'cereza',
         'frutilla',
         'arandano',
         'melon',
         'papaya',
         'platano',
         'yaca',
         'guanabana',
         'guayaba',
         'pitahaya',
         'granada',
         'litchi',
         'mangostan',
         'frutipan',
         'pineberry',
         'kiwano',
         'cacao',
         'akebia',
         'mamey',
         'anon',
         'tamarindo',
         'mango',
         'limon',
         'palta',
         'tomate',
         'pepino',
         'zapallito',
         'zapallo',
         'berenjena',
         'morron',
         'ciruela',
         'maracuya',
         'uva',
         'sandia',
         'coco'
      ]
   },
   methods: 
   {
      generarAleatorio: function() {
         this.juego = true,
         this.win = false,
         this.lose = false,
         this.contador_aciertos = 0,
         this.contador_errores = 0,
         this.aleatorio = Math.floor(Math.random() * this.palabras.length);
         this.palabra_escrita = [],
         this.botones = [],
         this.color_botones = []

         for (let i = 0; i < this.palabras[this.aleatorio].length; i++) {
            this.palabra_escrita.push('')
         }
         return this.aleatorio;
      },
      comparar: function(caracter, posicion) {
         if (this.juego) {
            this.botones[posicion] = true;
            let flat = 0;
            
            for (i = 0; i <= this.palabra_generada.length; i++) {    
               if (caracter.toLowerCase() === this.palabra_generada[i]) {
                  this.palabra_escrita[i] = caracter;
                  this.contador_aciertos++;
                  flat++;
               }     
            }

            if (flat == 0) {
               this.contador_errores++;
               this.color_botones[posicion] = 'rojo';
            }else{
               this.color_botones[posicion] = 'verde';
            }

            if (this.contador_aciertos === this.palabra_generada.length) {
               this.win = true;
               this.juego = false;
               this.win_contador++;
               if (this.contador_errores === 0) {
                  this.win_contador++
                  swal({
                     title: "¡Genial!",
                     text: "Sin errores, has ganado un punto extra +1 en Ganados",
                     icon: "success",
                  });
               }
            }

            if (this.contador_errores === 5) {
               this.lose = true;
               this.juego = false;
               this.lose_contador++;
               if (this.contador_aciertos === 0) {
                  this.lose_contador++;
                  swal({
                     title: "¡Ups!",
                     text: "Sin aciertos, penalizado con un punto extra +1 en Perdidos",
                     icon: "error",
                  });
               }
            }

            if (this.win_contador >= 10) {
               swal({
                  title: "¡Felicidades!",
                  text: "Has ganado",
                  icon: "success",
               });
               this.juego = false;
               this.win_contador = 0;
               this.lose_contador = 0;
               this.contador_aciertos = 0;
               this.contador_errores = 0;
            }
            if (this.lose_contador >= 5) {
               swal({
                  title: "¡Lo sentimos!",
                  text: "Has perdido, intenta de nuevo...",
                  icon: "error",
               });
               this.juego = false;
               this.win_contador = 0;
               this.lose_contador = 0;
               this.contador_aciertos = 0;
               this.contador_errores = 0;
            }

            // console.log('Generada: '+ this.palabra_generada);
            // console.log('Escrita: '+ this.palabra_escrita.length);
            // console.log('Ganado: '+ this.win_contador + ' Perdido: ' + this.lose_contador);
         }
      },
      reglas: function() {
         swal({
            title: "Reglas del Juego",
            text: "1- Adivina 10 frutas\n2- Tienes un máximo de 5 partidos Perdidos\n3- Por cada ganado sin errores duplicas los puntos\n4- Por cada perdido sin acierto duplicas los puntos\n\n¡Mucha suerte!",
            icon: "warning"
         });
      }
   },
   computed:
   {
      palabra_generada: function() {
         return this.palabras[this.aleatorio];
      }
   },
   created: function() {

   }
});
