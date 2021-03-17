const URL = 'https://thesimpsonsquoteapi.glitch.me/quotes'

/*
  API call example (JSON)

  [
    {
    "quote": "Shoplifting is a victimless crime, like punching someone in the dark.",
    "character": "Nelson Muntz",
    "image" : "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185",
    "characterDirection" : "Left"
    }
  ]
*/


const getSingleQuote = async () => {
  const response = await fetch(URL, {
    "method": "GET"
  })

  const data = await response.json()

  if(data) {
    const image = document.getElementById("image_character")
    image.src = data[0].image

    const name = document.getElementById("character_name")
    name.innerHTML = data[0].character

    const quote = document.getElementById("character_quote")
    quote.innerHTML = data[0].quote

    return true
  }

  return false
}

const getMultipleQuotes = async () => {
  let number = prompt('Ingrese la cantidad de citas que quiere')

  const response = await fetch(`${URL}?count=${number}` , {
    "method": "GET"
  })

  const data = await response.json()

  const table = document.getElementById('multiple_quotes_body')

  let rowCount = table.rows.length
  if(rowCount !== 0) {
    let aux = 1
    for(let i = aux; i < rowCount; i++) {
      table.deleteRow(aux);
    }

    rowCount = table.rows.length
    if(rowCount !== 0) {
      table.deleteRow(0)
    }
  }

  for(let i = 0; i < data.length; i++) {
    let row = table.insertRow()

    let number = row.insertCell(0)
    let character = row.insertCell(1)
    let quote = row.insertCell(2)

    number.innerHTML = i + 1
    character.innerHTML = data[i].character
    quote.innerHTML = data[i].quote
  }

  return true
}