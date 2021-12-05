<template>
  <button type="button" @click="onClickAge">update age</button>
  <button type="button" @click="ageChangeFn(5)">update age CB</button>
  <p>The user is {{ age }} years old</p>
  <p>{{ ageDoubled }}</p>
</template>


<script>
export default {
  name: "User",
  props: {
    age: {
      type: Number,
      // required: true,
      // default: 20,
      validator(value) {
        // El validator esta antes de que se monte el componente, por lo que no podemos tener acceso a los metodos o variable
        // returns True or False
        return value < 130;
      },
    },
    ageChangeFn: Function,
  },
  emits: ["age-change"],
  computed: {
    ageDoubled() {
      return this.age * 2;
    },
  },
  methods: {
    onClickAge() {
      // Se emite un evento que los otros componentes van a escuchar
      // No es posible que un componente hijo cambie el valor de una prop, para eso es necesario hacer un evento

      // Pasar valor a un evento es facil,
      // Primero es el nombre del evento y luego se ponen los parametros de ser necesarios
      this.$emit("age-change", 3);
    },
  },
};
</script>
