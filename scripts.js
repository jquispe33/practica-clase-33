const form = document.getElementById('form')
const characters = document.getElementById('characters')
const table = document.getElementById('table')
const radioButtons = document.getElementsByName("radiotest");

// function test() {
//     var radios = document.getElementsByName("radiotest");
//     var found = 1;
//     for (var i = 0; i < radios.length; i++) {       
//         if (radios[i].checked) {
//             alert(radios[i].value);
//             found = 0;
//             break;
//         }
//     }
// }

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    var found = 1;
     for (var i = 0; i < radioButtons.length; i++) {       
         if (radioButtons[i].checked) {
             getDataFv (radioButtons[i].value);
             console.log(radioButtons[i].value);
             found = 0;
             break;
         }
     }

})

const getDataFv =(values)=>{
    let xhr
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
    else xhr = new ActiveXObject("Microsoft.XMLHTTP")

    if (values== undefined) {    
    xhr.open('GET', 'marvel.php')

        xhr.addEventListener('load', (data) => {
            const dataJSON = JSON.parse(data.target.response)
            console.log(dataJSON)
        
        const fragment = document.createDocumentFragment()

        for (const heroes of dataJSON) {
            const option = document.createElement('OPTION')
            option.setAttribute('value', heroes.ID)
            option.textContent = heroes.Name
            fragment.appendChild(option)
        }

            characters.appendChild(fragment)
        })
    } else 
    {       
    xhr.open('GET', `marvel.php?values=${values}`)
    xhr.addEventListener('load', (data) => {
            const dataJSON = JSON.parse(data.target.response)
            console.log(dataJSON)

            //const fragment = document.createDocumentFragment()

            /*for (const heroe of dataJSON) {
                const row = document.createElement('TR')
                const dataName = document.createElement('TD')
                const dataAlignment = document.createElement('TD')
                const dataHometown = document.createElement('TD')
                const dataGender = document.createElement('TD')
                const dataFighting = document.createElement('TD')
                dataName.textContent = heroe.Name
                dataAlignment.textContent = heroe.Alignment
                dataHometown.textContent = heroe.Hometown
                dataGender.textContent = heroe.Gender
                dataFighting.textContent = heroe.Fighting_Skills

                row.append(dataName)
                row.append(dataAlignment)
                row.append(dataHometown)
                row.append(dataGender)
                row.append(dataFighting)

            }*/
            //     if (table.children[1]) {
            //     table.removeChild(table.children[1])
            // }
            //table.append(fragment)
           
        })
    }
    xhr.send()
    

}
getDataFv()

// evento para cargarr x favorito
/*form.addEventListener('submit', (e) => {
    e.preventDefault()
    //getData(characters.children[characters.selectedIndex].value)
    getDataFv(radioButtons.children[favorite.selected].value)
})*/


 