<template>
  <div>
    <BaseDialog :show="!!error" title="An Error Ocurred" @close="closeDialog">
      {{ error }}</BaseDialog>
    <BaseDialog :show="isLoading" fixed title="Authenticating...">
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsvalid">The Details filled are incorrect</p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchMode">{{ switchModeCaption }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
import BaseSpinner from '../../components/UI/BaseSpinner.vue';
export default {
  components: {
    BaseSpinner
  },
  data() {
    return {
      isLoading: false,
      error: null,
      email: '',
      password: '',
      formIsvalid: true,
      mode: 'login'
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'SignUp'
      }
    },
    switchModeCaption() {
      if (this.mode === 'login') {
        return 'SignUp instead';
      } else {
        return 'Login instead'
      }
    }
  },
  methods: {
    closeDialog() {
      this.error = null
    },
    async submitForm() {
      this.formIsvalid = true
      if (this.email === '' && this.password === '') {
        this.formIsvalid = false
        return
      }
      this.isLoading = true
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        if (this.mode === 'signup') {
          await this.$store.dispatch('coaches/signUp', formData)
        } else {
          await this.$store.dispatch('coaches/login', formData)
        }
        this.$router.replace('/coaches')
      } catch (error) {
        this.error = error.message || 'Failed Authentication'
      }
      this.isLoading = false
    },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>