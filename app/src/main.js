import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'
import '../scss/style.scss'

function getPageList(){
   $('h1').remove();
    $.get("./api", data => {
        data.forEach(file => {
            $('body').append(`<h1>${file}</h1>`)

        })

    }, "JSON")
}

getPageList()

$("button").click(() => {
    $.post("./api/createNewPage.php", {
        "name" : $("input").val()
    }, data => {
        getPageList()
    })
        .done((data) => {
            console.log(data)
        })
        .fail(() => {
            alert("Страница уже существует")
        })

})
