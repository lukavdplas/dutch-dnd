window.observablehq.Library()
const html = window.observablehq.html()
const d3 = window.d3

const url = "https://lukavdplas.github.io/dutch-dnd/translations.tsv"

var data

d3.tsv(url).then(d => {
  data = d
  const categories = new Set(data.map(row => row.cat_nl))
  
  const category_buttons = Array.from(categories).map((cat, i) => {
    const checked = i == 0 ? "checked" : ""
    
    return html`<input type="radio" name="category" id="${cat}" value="${cat}" onclick="show_tab()" ${checked}><label for="${cat}">${cat}</label>`
  })
  const category_div = html`<div class="categories">${category_buttons}</div>`
              
  show_nav(category_div)
  show_tab()
  
})

function show_tab() {
  const tab = document.querySelector("nav input:checked").value
  const filtered_data = data.filter(row => row.cat_nl == tab)
  const formatted_rows = filtered_data.map(format_row)
  show_main(html`${formatted_rows}`)
}

function format_row(row_data) {
  const english = html`<eng>${row_data.engels}</eng>`
  const translation = html`${row_data.nederlands}`
  const type = row_data.hypernym == "" ? "superword" : "subword"
  return html`<li class=${type}> ${english} ${translation}</li>`
}

function show_nav(obj) {
  const nav = document.querySelector("nav")
  nav.innerHTML = ""
  nav.appendChild(obj)
}

function show_main(obj) {
  const main = document.querySelector("main")
  main.innerHTML = ""
  main.appendChild(obj)
}