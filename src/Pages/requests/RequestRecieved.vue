<template>
  <section>
    <BaseDialog :show="!!error" title="Failed to fetch" @close="closeDialog">{{ error }}</BaseDialog>
    <BaseCard>
    <header>
      <h2>Request Received</h2>
    </header>
    <div v-if="isLoading">
    <BaseSpinner/>
    </div>
    <ul v-else-if="hasRequest && !isLoading">
    <RequestItem v-for="req in requests" :key="req.id"
    :id="req.id" :email="req.userEmail" :message="req.message" :coachId="req.coachId"/>
    </ul>
    <h3 v-else>You haven't received any request yet!</h3>
    </BaseCard>
  </section>
</template>


<script>
import RequestItem from '../../components/RequestComponents/RequestItem.vue';
import BaseSpinner from '../../components/UI/BaseSpinner.vue';
export default {
  data () {
    return {
      error : null,
      isLoading : false
    }
  },
 async created() {
  this.isLoading = true
  try {
    await this.$store.dispatch('requests/gettingRequest')
  } catch (error) {
    this.error = error.message || 'Failed to fetch'
  }
  this.isLoading = false
  },
  components : {
    RequestItem,
    BaseSpinner
  },
  computed : {
    requests () {
      const req = this.$store.getters['requests/fetchRequest'] 
      const userId = this.$store.getters['coaches/getUserId']
      const requestReceived = req.filter(request => request.coachId === userId) 
      return requestReceived
    },
    hasRequest () {
      const req = this.requests
      return req.length > 0;
    }
  },
  methods : {
    closeDialog () {
      this.error = null
    }
  }
}
</script>


<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>