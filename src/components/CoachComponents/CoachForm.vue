<template>
  <form @submit.prevent="submitform">
    <div class="form-control" :class="{invalid : !firstname.isValid}">
     <label for="firstname">FirstName</label>
     <input type="text" id="firstname" v-model.trim="firstname.val"/>
     <p v-if="!firstname.isValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid : !lastname.isValid}">
     <label for="lastname">LastName</label>
     <input type="text" id="lastname" v-model.trim="lastname.val"/>
     <p v-if="!lastname.isValid">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid : !description.isValid}">
     <label for="description">Description</label>
     <textarea rows="5" id="description" v-model.trim="description.val"></textarea>
     <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid : !rate.isValid}">
     <label for="rate">Hourly Rate</label>
     <input type="number" id="rate" v-model.number="rate.val"/>
     <p v-if="!rate.isValid">Rate is not appropiate</p>
    </div>
    <div class="form-control" :class="{invalid : !selectedArea.isValid}">
     <h3>Areas of Expertise</h3>
     <div>
      <input type="checkbox" value="frontend" id="frontend" v-model="selectedArea.val"/>
      <label for="frontend">Frontend Development</label>
     </div>
     <div>
      <input type="checkbox" value="backend" id="backend" v-model="selectedArea.val"/>
      <label for="backend">Backend Development</label>
     </div>
     <div>
      <input type="checkbox" value="career" id="career" v-model="selectedArea.val"/>
      <label for="career">Career Development</label>
     </div>
     <p v-if="!selectedArea.isValid">Please select at least one option</p>
    </div>
    <p v-if="formIsValid == false">Please fix the above error and register again!</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>


<script>
export default {
  emits:['regestration'],
  data () {
    return {
      selectedArea : {
        val : [],
        isValid : true
      },
      firstname: {
        val : '',
        isValid : true
      },
      lastname: {
        val : '',
        isValid : true
      },
      description : {
        val : '',
        isValid : true
      },
      rate : {
        val : '',
        isValid : true
      },
      formIsValid : true
    }
  },
  updated () {
      this.validationDone()
  },
  methods : {
    validateform () {
        this.formIsValid = true;
        if(this.firstname.val === '') {
          this.firstname.isValid  = false;
          this.formIsValid = false
        }
        if(this.lastname.val === '') {
          this.lastname.isValid  = false;
          this.formIsValid = false
        }
        if(this.description.val === '') {
          this.description.isValid  = false;
          this.formIsValid = false
        }
        if(this.rate.val < 0) {
          this.rate.isValid  = false;
          this.formIsValid = false
        }
        if(this.selectedArea.val.length === 0) {
          this.selectedArea.isValid  = false;
          this.formIsValid = false
        }
    },
    validationDone () {
      if(this.firstname.val !== '') {
          this.firstname.isValid  = true;
          this.formIsValid = true
        }
        if(this.lastname.val !== '') {
          this.lastname.isValid  = true;
          this.formIsValid = true
        }
        if(this.description.val !== '') {
          this.description.isValid  = true;
          this.formIsValid = true
        }
        if(this.rate.val > 0) {
          this.rate.isValid  = true;
          this.formIsValid = true
        }
        if(this.selectedArea.val.length !== 0) {
          this.selectedArea.isValid  = true;
          this.formIsValid = true
        }
    },
    submitform(){
       this.validateform()
       if(!this.formIsValid) {
        return
       }
       const formData = {
        first : this.firstname.val,
        last : this.lastname.val,
        desc : this.description.val,
        rate : this.rate.val,
        areas : this.selectedArea.val
       }
      this.$emit('regestration',formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>