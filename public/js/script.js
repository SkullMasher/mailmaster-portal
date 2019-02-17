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
  let mailInputIsCorrect = false
  let mailPassIsCorrect = false

  // functions
  const isFormCompleted = () => {
    if (mailInputIsCorrect && mailPassIsCorrect) {
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
    // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric#389022
    mailInputIsCorrect =  /^[a-z0-9]+$/i.test($mailInput.value)
    if (mailInputIsCorrect) {
      $mailInput.classList.remove('border-danger')
      $mailInput.classList.add('border-success')
    } else {
      $mailInput.classList.remove('border-success')
      $mailInput.classList.add('border-danger')
    }

    isFormCompleted()
  })

  $mailPass.addEventListener('input', (event) => {
    if ($mailPass.value) {
      mailPassIsCorrect = true
      $mailPass.classList.remove('border-danger')
      $mailPass.classList.add('border-success')
    } else {
      mailPassIsCorrect = false
      $mailPass.classList.remove('border-success')
      $mailPass.classList.add('border-danger')
    }

    isFormCompleted()
  })

  $mailSubmit.addEventListener('click', (event) => {
    if (isFormCompleted()) {
      event.preventDefault()
      const mail = $mailInput.value
      const data = JSON.stringify([$mailInput.value, $mailPass.value])
      postNewMail(location.href, data)
      //reset fields for new addition
      $mailInput.value = ''
      $mailPass.value = ''
      mailInputIsCorrect = false
      mailPassIsCorrect = false
      $mailSubmit.disabled = true
      $mailInput.classList.remove('border-success')
      $mailPass.classList.remove('border-success')
    }
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
