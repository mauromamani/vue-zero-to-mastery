<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{ $t('song.comment_count', { count: song.comment_count }) }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            v-show="comment_show_alert"
            class="text-white text-center font-bold p-4 mb-4"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form
            v-show="userLoggedIn"
            :validation-schema="schema"
            @submit="submitForm"
          >
            <vee-field
              as="textarea"
              name="comment"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <error-message class="text-red-600 block mb-4" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Comment Sorting -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docID"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.author }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import {
  songsCollection,
  getAuth,
  commentsCollection,
} from '../plugins/firebase.js';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      comments: [],
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Yout comment is being submitted',
      sort: '1',
    };
  },
  async created() {
    // consulta a la base de datos
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' });
      return;
    }

    // query parameter
    const { sort } = this.$route.query;

    // verificando la validez de la query
    this.sort = sort === '1' || sort === '2' ? sort : '1';

    // agregando al state la informacion de la cancion
    this.song = docSnapshot.data();
    this.getComments();
  },
  methods: {
    ...mapActions(['newSong']),
    // submitForm: add a comment to firebase
    async submitForm(values, ctx) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-blue-500';
      this.comment_alert_message =
        'Please wait! Yout comment is being submitted';

      // creando el comentario
      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        author: getAuth.currentUser.displayName,
        authorId: getAuth.currentUser.uid,
        songId: this.$route.params.id,
      };

      // agregando a la base de datos
      await commentsCollection.add(comment);

      // modificar el comment_count de la cancion
      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      // agregarlo al state
      this.getComments();

      this.comment_in_submission = false;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Success! Comment added';

      // usamos el ctx para resetear el comentario
      ctx.resetForm();
    },
    async getComments() {
      const commentsSnapshot = await commentsCollection
        .where('songId', '==', this.$route.params.id)
        .get();

      this.comments = [];

      // agregando al state los comentarios de la base de datos
      commentsSnapshot.forEach((doc) => {
        const comment = {
          docID: doc.id,
          ...doc.data(),
        };

        this.comments.push(comment);
      });
    },
  },
  computed: {
    ...mapState(['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  watch: {
    sort(newVal) {
      // comprobar que los valores no cambiaron
      if (newVal === this.$route.query.sort) return;

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
