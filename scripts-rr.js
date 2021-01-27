const form = document.getElementById('form')
const characters = document.getElementById('characters')
const radioButtons = Array.from(document.getElementsByName("radiotest"))

const table = document.getElementById('t-body')

/**
 * Función que crea un elemento html, le asigna atrubitos y text como contenido
 * 
 * @param {string} elem - etiqueta html que se quiere crear
 * @param {object} attributes - clases, id, atributos data. Si no necesita atributos, pase como parámetro null, undefined o false. null por defecto
 * @param {string} content - texto que contendrá la etiqueta. Si no necesita contenido, pase como parámetro null, undefined o false. null por defecto
 * 
 * @example createElement('td', {class:'varias clases', id:'identificador_unico'}, 'Esto es el texto de la etiqueta')
 */
const createElement = (elem, attributes = null, content = null) => {

    const el = document.createElement(elem.toUpperCase())

    if (attributes !== null ||
        attributes !== undefined ||
        attributes !== false) {
        for (let attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                el.setAttribute(attr, attributes[attr])
            }
        }
    }
    if (content !== null ||
        content !== undefined ||
        content !== false) {
        el.textContent = content
    }
    return el
}

/**
 * recorre el arra yde checkboxs para saber cual se seleccionó
 * 
 * @param {array} arrayCheckboxs - array de lo checkbox
 * 
 * @return {string} valor del checkbox seleccionado
 */
const getCheckboxChecked = (arrayCheckboxs) => {

    let value

    arrayCheckboxs.forEach(buttonChecked => {
        if (buttonChecked.checked) {
            value = buttonChecked.value
        }
    })

    return value
}


const getData = (id, alignment) => {

    let xhr

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    if (id === undefined && alignment === undefined) {
        xhr.open('GET', 'marvel.php')

        xhr.addEventListener('load', (data) => {

            const dataJSON = JSON.parse(data.target.response)

            const fragment = document.createDocumentFragment()

            for (const heroes of dataJSON) {

                const option = createElement('option', { value: heroes.ID }, heroes.Name)

                fragment.appendChild(option)
                characters.appendChild(fragment)
            }
            console.log(dataJSON)
        })

    } else if (id !== undefined && alignment === undefined) {

        xhr.open('GET', `marvel.php?id=${id}`)

        xhr.addEventListener('load', (data) => {
            const dataJSON = JSON.parse(data.target.response)

            const fragment = document.createDocumentFragment()

            for (const heroe of dataJSON) {

                const tr = createElement('TR', null, null)

                const name = createElement('TD', null, heroe.Name)
                const alignmentH = createElement('TD', null, heroe.Alignment)
                const hometown = createElement('TD', null, heroe.Hometown)
                const gender = createElement('TD', null, heroe.Gender)
                const fighting = createElement('TD', null, heroe.Fighting_Skills)

                tr.appendChild(name)
                tr.appendChild(alignmentH)
                tr.appendChild(hometown)
                tr.appendChild(gender)
                tr.appendChild(fighting)

                fragment.appendChild(tr)
            }

            // Esto es para lo mismo que el if que tenías,
            // solo que en el html le añadí tbody a la tabla por semántica
            table.textContent = ''

            table.appendChild(fragment)
        })
    } else if (id === undefined && alignment !== undefined) {
        xhr.open('GET', 'marvel.php')

        xhr.addEventListener('load', (data) => {

            const dataJSON = JSON.parse(data.target.response)

            const fragment = document.createDocumentFragment()

            for (const heroe of dataJSON) {

                if (heroe.Alignment === alignment) {
                    const tr = createElement('TR', null, null)

                    const name = createElement('TD', null, heroe.Name)
                    const alignmentH = createElement('TD', null, heroe.Alignment)
                    const hometown = createElement('TD', null, heroe.Hometown)
                    const gender = createElement('TD', null, heroe.Gender)
                    const fighting = createElement('TD', null, heroe.Fighting_Skills)

                    tr.appendChild(name)
                    tr.appendChild(alignmentH)
                    tr.appendChild(hometown)
                    tr.appendChild(gender)
                    tr.appendChild(fighting)

                    fragment.appendChild(tr)
                }
            }
            // Esto es para lo mismo que el if que tenías,
            // solo que en el html le añadí tbody a la tabla por semántica
            table.textContent = ''

            table.appendChild(fragment)
        })
    }

    xhr.send()
}

getData()

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

form.addEventListener('click', (e) => {


    switch (e.target.id) {

        case 'get_heroe':
            getData(characters.children[characters.selectedIndex].value, undefined)
            break;

        case 'get_alignment':
            const checkboxChecked = getCheckboxChecked(radioButtons)
            getData(undefined, checkboxChecked)
            break;
        default:
            break;
    }
})