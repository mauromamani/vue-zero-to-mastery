const vm = Vue.createApp({
  data() {
    return {
      message: 'Hello World',
    };
  },
  // hooks
  beforeCreate() {
    // antes de la instancia de vue, no podemos acceder a los metodos o data
    console.log('Before create func call', this.message);
  },
  created() {
    // cuando se crea la instancia, podemos acceder a metodos y data
    console.log('created func call', this.message);
  },
  beforeMount() {
    // antes de que apliquen los cambios al template
    console.log('Before mount func call', this.$el);
  },
  mounted() {
    // en este punto tenemos una aplicacion funcionando correctamente
    // los cambios ya fueron aplicados al template
    console.log('Mounted func call', this.$el);
  },
  beforeUpdate() {
    // se lanza antes de que se realice un cambio
    console.log('beforeUpdate func call');
  },
  updated() {
    // este hook se dispara cuando el cambio ya se realizo
    console.log('updated func call');
  },
  beforeUnmount() {
    // se dispara antes de que la instancia se  desmonte, todavia tenemos acceso a los metodos y variables
    console.log('beforeUnmount func call');
  },
  unmounted() {
    // se dispara cuando la instancia ya fue eliminada
    console.log('unmounted func call');
  },
});

// Component
vm.component('Hello', {
  template: `<h1>{{ message }}</h1>`,
  data() {
    return {
      message: 'QUE LOCO',
    };
  },
});

vm.mount('#app');
/*
setTimeout(() => {
  vm.unmount();
}, 3000);
*/
