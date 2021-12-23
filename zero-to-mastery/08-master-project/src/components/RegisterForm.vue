<template>
  <!-- Registration Form -->
  <div
    class="p-5 mb-4 rounded text-white text-center font-bold"
    v-if="regShowAlert"
    :class="regAlertVariant"
  >
    {{ regAlertMsg }}
  </div>
  <vee-form
    :validation-schema="registerSchema"
    @submit="handleRegister"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <!-- manera de loopear los errores para que se muestren todos, para una mejor experiencia de usuario -->
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <!-- fin del loopeo de errores -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { getAuth, usersCollection } from "../plugins/firebase.js";

export default {
  name: "RegisterForm",
  data() {
    return {
      registerSchema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:6|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:4|max:100",
        confirm_password: "passwords_mismatch:@password",
        country: "required|excluded:Antarctica",
        tos: "tos",
      },
      userData: {
        country: "USA",
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: "bg-blue-500",
      regAlertMsg: "Please wait! Your account is being created.",
    };
  },
  methods: {
    async handleRegister(values) {
      this.regShowAlert = true;
      this.regInSubmission = true;
      this.regAlertVariant = "bg-blue-500";
      this.regAlertMsg = "Please wait! Your account is being created.";

      try {
        await this.$store.dispatch("registerUser", values);
      } catch (err) {
        // Handling bad response
        console.log(err);
        this.regInSubmission = false;
        this.regAlertVariant = "bg-red-500";
        this.regAlertMsg =
          "Error! Something went wrong. Please try again later.";
        return;
      }

      /*
       * ---------------------------
       * Successfully Registration
       * ---------------------------
       */

      // handling success response
      this.regAlertVariant = "bg-green-500";
      this.regAlertMsg = "Success! Your account has been created.";
      window.location.reload();
    },
  },
};
</script>
