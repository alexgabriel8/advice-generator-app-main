const adviceLoadingContainer = document.querySelector('.loading-container')
const adviceNumberContainer = document.querySelector('.advice-number-container')
const adviceTextContainer = document.querySelector('.advice-text')
const diceBtnContainer = document.querySelector('.dice-container')

diceBtnContainer.addEventListener('click', () => getAdvice())

async function fetchAdvice() {
    return await (await (await fetch('https://api.adviceslip.com/advice')).json()).slip
}

async function showAdvice(advice) {
    const regex = /#\d*/i
    adviceNumberContainer.innerHTML = adviceNumberContainer.innerHTML.replace(regex, `#${advice.id}`)
    adviceTextContainer.innerHTML = advice.advice
}

async function getAdvice() {
    try {
        adviceLoadingContainer.classList.add('open')
        diceBtnContainer.style.transform = 'translate(0%, 0%)'
        const advice = await fetchAdvice()
        await showAdvice(advice)
    } catch(err) {
        console.error(err)
    } finally {
        adviceLoadingContainer.classList.remove('open')
        diceBtnContainer.style.transform = 'translate(0%, 50%)'
    }
}

getAdvice()