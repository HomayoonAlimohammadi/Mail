document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#inbox').onclick = () => {
        const main_body = document.querySelector('#main_body')
        main_body.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.innerHTML = 'This is inbox'
        main_body.append(h1)
    }

});
