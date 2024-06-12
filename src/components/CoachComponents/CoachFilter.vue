<template>
  <BaseCard>
    <h2>Filter Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" value="frontend"/>
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" value="backend"/>
      <label for="Backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" value="carrer"/>
      <label for="career">Career</label>
    </span>
  </BaseCard>
</template>

<script>
export default {
  emits:['selectedFilter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      // Ensure the event object exists and has a target property
      if (event && event.target) {
        const inputId = event.target.id;
        const isActive = event.target.checked;
        const updatedFilter = {
          ...this.filters,
          [inputId]: isActive,
        };
        this.filters = updatedFilter;
        this.$emit('selectedFilter',updatedFilter)
      }
    },
  },
  created() {
    this.setFilter();
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
