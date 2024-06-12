<template>
  <section>
    <BaseCard>
    <h2>Register as a coach now!</h2>
    <CoachForm @regestration="coachRegistration"/>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/CoachComponents/CoachForm.vue';
export default {
 components : {
  CoachForm
 },
 methods : {
  coachRegistration(value){
    this.$store.dispatch('coaches/newCoach',value)
    this.$router.replace('/coaches')
  }
 }
}
</script>