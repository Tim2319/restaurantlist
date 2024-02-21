const form = document.getElementById('create-form')

form.addEventListener('submit', function Submit (event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
    form.classList.add('was-validated')
  }
})

form.addEventListener('reset', function Reset (event) {
  form.classList.remove('was-validated')
})
