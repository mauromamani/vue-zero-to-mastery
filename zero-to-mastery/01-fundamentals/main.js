const vm = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      google: 'https://google.com',
      rawUrl: '<a href="https://google.com" target="_blank">Google</a>',
      age: 20,
      isPurple: true,
      selectedColor: '',
      size: 150,
      mode: 1,
      birds: ['bird1', 'bird2', 'bird3'],
      people: [
        { name: 'John', age: 12 },
        { name: 'Loco', age: 22 },
        { name: 'Perrito', age: 33 },
      ],
    };
  },
  methods: {
    increment() {
      this.age++;
    },
    decrement() {
      this.age--;
    },
    updateLastName(_message, event) {
      this.lastName = event.target.value;
    },
    updateMiddleName(event) {
      this.middleName = event.target.value;
    },
  },
  computed: {
    // Usamos el computed para que no se tenga que renderizar cada vez que interactuamos con el DOM
    // cuando los valores de la funcion cambien Vue los volvera a renderizar
    fullName() {
      console.log('Exucuted');
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    },
    circleClasses() {
      // en :class primero va la clase y luego la condicion
      return { purple: this.isPurple };
    },
  },
  // escucha y espera por los cambios de las variables definidas en data() o computed
  // se dispara luego de los cambios
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 100;
      }, 3000);
    },
  },
}).mount('#app');

/*

setTimeout(() => {
  vm.firstName = 'Bob';
}, 2000);

Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Bar',
    };
  },
}).mount('#app2');
*/
