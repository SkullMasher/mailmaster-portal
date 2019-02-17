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
      $mailSubmit.removeAttribute('disabled')

      return true
    } else {
      return false
    }
  }

  // Events
  $mailInput.addEventListener('input', (event) => {
    mailInputIsDirty = true
    isFormCompleted()
  })

  $mailPass.addEventListener('click', (event) => {
    mailPassIsDirty = true
    isFormCompleted()
  })

  $mailSubmit.addEventListener('click', (event) => {
    if (isFormCompleted()) {
      console.log('post some shit')
    }
  })
}

addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  formChecker()
})
