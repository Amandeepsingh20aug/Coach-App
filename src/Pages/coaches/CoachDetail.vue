<template>
  <section>
    <BaseCard>
    <h2>{{ fullname }}</h2>
    <h3>${{ rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
    <h2>Interested Reach out now!</h2>
    <!-- <BaseButton link :to="contactLink">Contact</BaseButton> -->
    </header>
    <router-view></router-view>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
    <BaseBadge v-for="area in selectedCoach.areas" :key="area" :type="area" :title="area">
    </BaseBadge>
    <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      selectedCoach : null
    }
  },
  computed : {
    fullname () {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    rate () {
      return this.selectedCoach.hourlyRate
    },
    contactLink () {
      return this.$route.path + '/' + this.id + '/contact'
    },
    description () {
      return this.selectedCoach.description
    }
  },
  created () {
    this.selectedCoach = this.$store.getters['coaches/getCoaches'].find(coach => coach.id === this.id)
  }
}
</script>