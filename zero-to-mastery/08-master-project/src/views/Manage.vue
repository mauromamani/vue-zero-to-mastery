<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <!-- upload  -->
      <div class="col-span-1">
        <upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, idx) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateUnsaveFlag="updateUnsaveFlag"
              :idx="idx"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Upload from "../components/Upload.vue";
import CompositionItem from "../components/CompositionItem.vue";
import { songsCollection, getAuth } from "../plugins/firebase.js";
// import store from '../store';

export default {
  name: "Manage",
  components: {
    Upload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  beforeRouteLeave(_to, _from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm("Are you sure you want to leave?");
      next(leave);
    }

    // con referencias podemos acceder a componentes y ejecutar cualquier metodo que este en este.
    this.$refs.upload.cancelUploads();
  },
  // life cycle hook
  async created() {
    const uid = getAuth.currentUser.uid;
    const snapshot = await songsCollection.where("uid", "==", uid).get();

    snapshot.forEach(this.addSong);

    console.log(this.songs);
  },
  methods: {
    updateSong(idx, values) {
      this.songs[idx].modified_name = values.modified_name;
      this.songs[idx].genre = values.genre;
    },
    removeSong(idx) {
      this.songs.splice(idx, 1);
    },
    addSong(doc) {
      const song = {
        ...doc.data(),
        docID: doc.id,
      };

      this.songs.push(song);
    },
    updateUnsaveFlag(value) {
      this.unsavedFlag = value;
    },
  },
  /*
  Global guard: utilizando las route meta fields no es necesario protejer las rutas en el componente
  beforeRouteEnter(to, from, next) {
    if (store.state.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  }
  */
};
</script>
