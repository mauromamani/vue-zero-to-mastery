<template>
  <button type="button" @click="flag = !flag">Toggle</button>

  <!--
  <transition name="fade" mode="out-in">
    <h1 v-if="flag" key="main">Hello World</h1>
    <h1 v-else ket="secondary">Hello</h1>
  </transition>

   animations with js
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="true"
    name="fade"
  >
    <h2 v-if="flag">Zoom</h2>
  </transition>
  -->
  <button @click="addItem">Add one item</button>
  <ul>
    <!-- transition-group es neceasrio para animar varios elementos de un loop -->
    <transition-group name="fade">
      <li
        v-for="(number, idx) in numbers"
        :key="number"
        @click="removeItem(idx)"
      >
        {{ number }}
      </li>
    </transition-group>
  </ul>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag: false,
      numbers: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    addItem() {
      const num = Math.floor(Math.random() * 100 + 1);
      const idx = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(idx, 0, num);
    },
    removeItem(index) {
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      console.log("Before Enter", el);
    },
    enter(el) {
      console.log("Enter", el);
      /*
      const animation = el.animate([{ transform: "scale3d(0,0,0)" }, {}], {
        duration: 1000,
      });

      console.log("Enter", el);

      animation.onfinish = () => {
        done();
      };
      */
    },
    afterEnter(el) {
      console.log("afterEnter", el);
    },
    beforeLeave(el) {
      console.log("before leave", el);
    },
    leave(el) {
      console.log("leave", el);
      /*
      const animation = el.animate([{}, { transform: "scale3d(0,0,0)" }], {
        duration: 1000,
      });

      console.log("leave", el);

      animation.onfinish = () => {
        done();
      };
      */
    },
    afterLeave(el) {
      console.log("after leave ", el);
    },
  },
};
</script>

<style>
li {
  cursor: pointer;
  font-size: 22px;
}
/* se ejecuta cuando un componente entra en la pantalla */
.fade-enter-from {
  opacity: 0;
}

.fade-move {
  transition: all 1s linear;
}

.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-active {
  position: absolute;
}

.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}
</style>
