const addNota = document.getElementById('add')
const container = document.querySelector('.container')
const notas = JSON.parse(localStorage.getItem('notas'))

if(notas) {
    notas.forEach(nota => adicionarNota(nota))
}

addNota.addEventListener('click', (text = '') => adicionarNota())


function adicionarNota(text = '') { 
    const nota = document.createElement('div')
    nota.classList.add('nota')

    nota.innerHTML = `
        <div class="ferramentas">
          <button class="editar"><i class="fas fa-edit"></i></button>
          <button class="deletar"><i class="fas fa-trash"></i></button>
        </div>

        <div class="main ${text ? "" : "escondido"}"></div>
        <textarea class="${text ? "escondido" : ""}"></textarea>
    `

    const editarNota = nota.querySelector('.editar')
    const deletarNota = nota.querySelector('.deletar')
    const main = nota.querySelector('.main')
    const textArea = nota.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deletarNota.addEventListener('click', () => {
        nota.remove()
        atualizarLocalStorage()
    })

    editarNota.addEventListener('click', () => {
        main.classList.toggle('escondido')
        textArea.classList.toggle('escondido')
    })

    textArea.addEventListener('input', (e)=> {
        const { value } = e.target
        main.innerHTML = marked(value)

        atualizarLocalStorage()
    })

    container.appendChild(nota)
}

function atualizarLocalStorage() {
    const textoDasNotas = document.querySelectorAll('textarea')

    const notas = []

    textoDasNotas.forEach(nota => notas.push(nota.value))

    localStorage.setItem('notas', JSON.stringify(notas))
}

