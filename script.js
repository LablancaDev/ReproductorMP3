// Song data

/*El Array de objetos que contiene las canciones, array que obtenemos de una API */
//Cada file está referenciado con el archivo audio y los audios.mp3
const songList = [
    {
        title: "Terminator 2 SoundTrack ",
        file: "Terminator 2 - Soundtrack HD.mp3",
        cover: "terminator2.jpg"

    },
    {
        title: "Indiana Jones SoundTrack",
        file: "Indiana Jones Theme Song [HD].mp3",
        cover: "indi.jpg"
    },
    {
        title: "Predator SoundTrack",
        file: "Predator Film.mp3", 
        cover: "Depredador.Webp"
    },
]

// Canción actual

let  actualSong = null //Por que el reproductor no reproduce nada hasta que no le hagamos click, hay que ponerlo a 0 null
//en actual song se guarda el indice de la canción que se está reproduciendo

// Captura de elementos del DOM para trabajar con JS

const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container")

progressContainer.addEventListener("click", setProgress)


//Escuchar el elemento audio

audio.addEventListener("timeupdate", updateProgress);

//Escuchar clicks en los controles

play.addEventListener("click", () => {//paused es una propiedad de Javascript
    if(audio.paused){//cuando le doy al botón play, si está pausado el audio, lo reproduzco con playSong()
        playSong();
    }else{
        pauseSong();//si no, se pausa el audio
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())


// Cargar canciones y Mostrar listado

function loadSongs() { //recorrido de todos los songList
    songList.forEach((song, index )=>{//cuando se recorre el listado de canciones sacaremos el titulo y el indice en el array, cada bloque de canción title, file, cover es un indice 0, 1 y 2 
        // console.log(song)
        // console.log(index)

        // Crear li
        const li = document.createElement("li");
        // Crear a
        const link = document.createElement("a");
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        // El elemento link = a, escuchará clicks y cuando los reciba, llamaremos a loadSong pasándole el index, ponemos dentro otra función anónima para que se llame a la función loadSong sólo cuando demos click en algún enlace a = link.
        link.addEventListener("click", () => loadSong(index));
        // Añadir a li
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);


    })
}


// Cargar canción seleccionada 

function loadSong(songIndex){//Cuando cargo una canción, la reproduzco
    // console.log(songIndex)
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex
        // Añadimos los audios
        audio.src = "./audio/" + songList[songIndex].file;  //estamos buscando el indice que referencia al objeto del array que contiene el archivo file con la ruta a el audio, para poder ponerselo al elemento audio  (queremos cambiar el src (la ruta) del elemento audio par aempezar la canción)
        playSong()//CAMBIAR playSong()
        changeCover(songIndex); //cuando finaliza el código de la función loadSong(), se llamará a la función changeCover()
        changeSongTitle(songIndex);//llamada a la función  changeSongTitle() que cambia las imágenes de cada audio
    }
}

//Actualizar barra de progreso de la canción

function updateProgress(event){
    //Total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%" 

}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}



//Actualizar controles

function updateControls(){
    if(audio.paused){
        play.classList.remove("bi-pause-btn-fill")//si el audio esta pausado quito la clase 
        play.classList.add("bi-play-btn-fill")//y añado la clase 
    }else{
        play.classList.add("bi-pause-btn-fill")//si el audio esta reproduciendose quito la clase 
        play.classList.remove("bi-play-btn-fill")//y elimino la clase fa-play
    }
}

//Reproducir canción

function playSong(){/*cada vez que doy play, actualizo los controles(es decir, llamo a la función updateControls();)*/
    if (actualSong !== null) {
    audio.play();
    updateControls();
    }
}

//Pausar canción

function pauseSong(){/*cada vez que doy pause, actualizo los controles(es decir, llamo a la función updateControls();)*/
    audio.pause();
    updateControls();
}

// Cambiar clase Activa

function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar el cover(imágen) de cada canción

function changeCover(songIndex){
    // Añadimos las imágenes
    //Mostrar el cover, cambiaremos el src al cover
    cover.src = "./imgs/" +  songList[songIndex].cover; //cover es el objeto de cada uno de los 2 arrays referenciado a su imágen en html


}

// Cambiar el Titulo principal al seleccionar cada audio

function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title;//añadimos el texto de la canción
}

//Anterior canción

function prevSong(){
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

//Siguiente canción

function nextSong(){
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}


// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())


/*ON iPod*/
loadSongs();



// IMPORTANTE MIN 54"40 EXPLICACIÓN DE LA EJECUCIÓN DEL EVENTO ESCUCHAR CLICKS
// https://youtu.be/smyWFCJ_Kb8?list=PLM-Y_YQmMEqDGdkMnPW_PWR5Fh_YmblCT