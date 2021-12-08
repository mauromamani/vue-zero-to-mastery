<template>
  <div class="ctr">
    <questions
      v-if="questionsAnswered < questions.length"
      :questions="questions"
      :questionsAnswered="questionsAnswered"
      @question-answered="questionAnswered"
    />
    <result v-else :totalCorrect="totalCorrect" :results="results" />
    <button
      type="button"
      class="reset-btn"
      @click.prevent="reset"
      v-show="questionsAnswered == questions.length"
    >
      Reset
    </button>
  </div>
</template>

<script>
import Questions from "./components/Questions.vue";
import Result from "./components/Result.vue";
import { data } from "./data.js";

export default {
  name: "App",
  components: {
    Questions,
    Result,
  },
  data() {
    return {
      questionsAnswered: 0,
      totalCorrect: 0,
      ...data,
    };
  },
  methods: {
    questionAnswered(isCorrect) {
      isCorrect ? this.totalCorrect++ : null;
      this.questionsAnswered++;
    },
    reset() {
      this.questionsAnswered = 0;
      this.totalCorrect = 0;
    },
  },
};
</script>

<style>
</style>
