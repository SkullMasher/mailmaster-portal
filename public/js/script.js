const greetingMessage = () => {
  console.log(`  #####   `)
  console.log(` #######  `)
  console.log(`#  ###  #  Hello There`)
  console.log(`#   #   # `)
  console.log(`#########  Come contribute to the code !`)
  console.log(` ### ###  `)
  console.log(`  #####    github.com/SkullMasher/wish-card-2019`)
  console.log(`  # # #   `)
}

let formChecker = () => {
  // input selector
  const $mailInput = document.querySelector('.js-inputMail')
  const $mailPass = document.querySelector('.js-inputMailPass')
  const $mailSubmit = document.querySelector('.js-mailSubmit')

  // states
  let mailInputIsDirty = false
  let mailPassIsDirty = false

  // functions
  const isFormCompleted = () => {
    if (mailInputIsDirty && mailPassIsDirty) {
      $mailSubmit.disabled = false
      return true
    } else {
      return false
    }
  }

  const postNewMail = async (location, data) => {
    const fetchSettings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }

    const response = await fetch(location, fetchSettings)

    console.log(response)
  }

  // Events
  $mailInput.addEventListener('input', (event) => {
    mailInputIsDirty = true
    isFormCompleted()
  })

  $mailPass.addEventListener('input', (event) => {
    mailPassIsDirty = true
    isFormCompleted()
  })

  $mailSubmit.addEventListener('click', (event) => {
    if (isFormCompleted()) {
      event.preventDefault()
      const data = JSON.stringify([$mailInput.value, $mailPass.value])
      postNewMail(location.href, data)
      //reset fields for new addition
      $mailInput.value = ''
      $mailPass.value = ''
      mailInputIsDirty = false
      mailPassIsDirty = false
      $mailSubmit.disabled = true
    }
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
