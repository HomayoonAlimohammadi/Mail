document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#inbox').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Inbox';
        main_body.append(h1);
    }

    document.querySelector('#compose').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Compose';
        main_body.append(h1);
    }

    document.querySelector('#sent').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Sent';
        main_body.append(h1);
    }

    document.querySelector('#archived').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Archived';
        main_body.append(h1);
    }

    document.querySelector('#register').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Register';
        main_body.append(h1);
    }

    document.querySelector('#login').onclick = () => {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Login';
        main_body.append(h1);
    }
});
