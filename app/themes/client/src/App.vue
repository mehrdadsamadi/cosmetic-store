<template>
  <v-app >
    <v-main>
      <transition name="moveX" mode="out-in">
        <router-view></router-view>
      </transition>

      <snackbar></snackbar>
      <prompt></prompt>
      <loading></loading>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "@/components/tools/Snackbar.vue";
import Prompt from "@/components/tools/Prompt.vue";
import loading from "@/components/tools/LoadingDialog.vue";

export default {
  name: 'App',

  components: {
    Snackbar,
    Prompt,
    loading,
  },
};
</script>
