const vm = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
    };
  },
  methods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
}).mount('#app');

setTimeout(() => {
  vm.firstName = 'Bob';
}, 2000);

/*
Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Bar',
    };
  },
}).mount('#app2');
*/
