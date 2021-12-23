<template>
  <div
    class="p-5 mb-4 rounded text-white text-center font-bold"
    v-if="logShowAlert"
    :class="logAlertVariant"
  >
    {{ logAlertMsg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="handleLogin">
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
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="logInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:4|max:100",
      },
      logInSubmission: false,
      logShowAlert: false,
      logAlertVariant: "bg-blue-500",
      logAlertMsg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    async handleLogin(values) {
      this.logInSubmission = true;
      this.logShowAlert = true;
      this.logAlertVariant = "bg-blue-500";
      this.logAlertMsg = "Please wait! We are logging you in.";

      try {
        await this.$store.dispatch("loginUser", values);
      } catch (err) {
        // Handling bad response
        console.log(err);
        this.logInSubmission = false;
        this.logAlertVariant = "bg-red-500";
        this.logAlertMsg = "Invalid login details.";
        return;
      }

      /*
       * ---------------------------
       * Successfully Login
       * ---------------------------
       */

      this.logAlertVariant = "bg-green-500";
      this.logAlertMsg = "Success! You are now logged in.";
      window.location.reload();
    },
  },
};
</script>
