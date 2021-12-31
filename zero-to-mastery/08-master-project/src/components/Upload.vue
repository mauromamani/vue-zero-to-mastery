<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragover = false"
        @dragover.prevent.stop="isDragover = true"
        @dragenter.prevent.stop="isDragover = true"
        @dragleave.prevent.stop="isDragover = false"
        @drop.prevent.stop="uploadFile($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <!-- input file -->
      <input type="file" multiple @change="uploadFile($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div v-for="upload in uploads" :key="upload.name" class="mb-4">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, getAuth, songsCollection } from "../plugins/firebase";

export default {
  name: "Upload",
  props: {
    addSong: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDragover: false,
      uploads: [],
    };
  },
  methods: {
    uploadFile($event) {
      // cuando un elemento es seleccionado se quitará el efecto del hover
      this.isDragover = false;
      // hacemos el ternario ya que si subimos un archivo por el "input", no existirá la propiedad "dataTransfer"
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      files.forEach((file) => {
        // evita que un usuario suba un archivo que no sea audio
        // if (file.type !== "audio/mpeg") return;

        // es necesario guardar una referencia para que se sepa donde se van a guardar los datos
        const storageRef = getStorage.ref(); // vue-music-app-92114.appspot.com
        const songsRef = storageRef.child(`songs/${file.name}`); // vue-music-app-92114.appspot.com/songs/example.mp3

        // inicializando la subida
        const task = songsRef.put(file);

        // agregar el archivo al arreglo en el state
        const uploadIdx =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            // snapshot: contiene informacion del archivo que esta siendo subido
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            this.uploads[uploadIdx].current_progress = progress;
          },
          (error) => {
            // llamada cuando hay un error
            this.uploads[uploadIdx].variant = "bg-red-400";
            this.uploads[uploadIdx].icon = "fas fa-times";
            this.uploads[uploadIdx].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            // llamada si se guardo con exito
            // creando la informacion para guardar en la base de datos
            const song = {
              uid: getAuth.currentUser.uid,
              display_name: getAuth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };
            song.url = await task.snapshot.ref.getDownloadURL();

            // almacenar la cancion el la base de datos
            // add: id automatico - set: permite que nosotros le demos el id
            const songRef = await songsCollection.add(song);
            const songSnapshot = await songRef.get();

            // add song to state
            this.addSong(songSnapshot);

            this.uploads[uploadIdx].variant = "bg-green-400";
            this.uploads[uploadIdx].icon = "fas fa-check";
            this.uploads[uploadIdx].text_class = "text-green-400";
          }
        );
      });
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  /*
  beforeUnmount() {
    // Cuando cambiamos de componente, vue desmonta el componente actual para evitar el colapso de memoria.
    // Pero si cambiamos de componente las subidas se siguen ejecutando
    // se va a usar la solucion del "beforeRouteLeave" hook del componente <Manage />

    // evitando la subida de archivos si el componente esta desmontado
    this.uploads.forEach(upload => {
      upload.task.cancel();
    });
  },
  */
};
</script>
