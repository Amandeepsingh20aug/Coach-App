<template>
  <li>
    <h3>{{ fullname }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area"></BaseBadge>
    </div>
    <div class="actions">
    <BaseButton link :to="coachContact" mode="outline">Contact</BaseButton>
    <BaseButton link :to="coachDetails">View Details</BaseButton>
    </div>
  </li>
</template>


<script>
export default {
props : ['id','firstName','lastName','areas','description','hourlyRate'],
computed : {
  fullname() {
    return this.firstName + ' ' + this.lastName
  },
  coachContact() {
    return this.$route.path + '/' + this.id + '/contact'
  },
  coachDetails() {
    return this.$route.path + '/' + this.id
  }
},
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>