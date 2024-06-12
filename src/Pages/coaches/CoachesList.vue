<template>
  <BaseDialog :show="!!error" title="An erro occured!" @close="closeDialog">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <CoachFilter @selectedFilter="filters" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="getData">Refresh</BaseButton>
        <BaseButton link to="/auth" v-if="!isAuthenticated">Login</BaseButton>
        <BaseButton link to="/register" v-if="!isCoach && !isLoading && isAuthenticated">Register as Coach </BaseButton>
      </div>
      <div v-if="isLoading">
        <BaseSpinner />
      </div>
      <ul v-else-if="hasCoaches && !isLoading">
        <CoachItem v-for="coaches in filteredCoaches" :key="coaches.id" :id="coaches.id" :firstName="coaches.firstName"
          :lastName="coaches.lastName" :areas="coaches.areas" :description="coaches.description"
          :hourlyRate="coaches.hourlyRate" />
      </ul>
      <h3 v-else>No Coaches Found.</h3>
    </BaseCard>
  </section>
</template>


<script>
import { mapGetters } from 'vuex'
import CoachItem from '../../components/CoachComponents/CoachItem.vue';
import CoachFilter from '../../components/CoachComponents/CoachFilter.vue';
import BaseSpinner from '../../components/UI/BaseSpinner.vue'
export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseSpinner
  },
  data() {
    return {
      error: null,
      isLoading: false,
      activefilters: {
        frontend: true,
        backend: true,
        carrer: true
      }
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches', 'hasCoaches','isAuthenticated']),
    filteredCoaches() {
      return this.getCoaches.filter(coach => {
        if (this.activefilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activefilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activefilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods: {
    filters(value) {
      this.activefilters = value
    },
    async getData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches')
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    closeDialog() {
      this.error = null
    }
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>