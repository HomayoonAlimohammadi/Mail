document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#inbox').onclick = show_inbox;
    // document.querySelector('#compose').onclick = show_compose;
    // document.querySelector('#sent').onclick = show_sent;
    // document.querySelector('#archived').onclick = show_archived;
    // document.querySelector('#register').onclick = show_register;
    // document.querySelector('#login').onclick = show_login;
    // document.querySelector('#logout').onclick = show_logout;


    function show_inbox() {
        let main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        fetch('/mail/api/email/inbox')
        .then(response => response.json())
        .then(data => {
            let ul = document.createElement('ul');
            data.forEach(email => {
                let li = document.createElement('li');
                let subject = document.createElement('h4');
                subject.innerHTML = email['subject'];
                let timestamp = document.createElement('p');
                timestamp.innerHTML = email['timestamp'];

                let link = document.createElement('a');
                link.append(subject);
                link.href = `email/${email['id']}`;

                li.append(link);
                li.append(timestamp);  
                ul.append(li);   
                hr = document.createElement('hr');
                ul.append(hr);
            })
            main_body.append(ul)
        })
    }

    function show_compose() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Compose';
        main_body.append(h1);
    }

    function show_sent() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Sent';
        main_body.append(h1);
    }

    function show_archived() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Archived';
        main_body.append(h1);
    }

    function show_register() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Register';
        main_body.append(h1);
    }

    function show_login() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Login';
        main_body.append(h1);
    }

    function show_logout() {
        const main_body = document.querySelector('#main_body');
        main_body.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = 'This is Logout';
        main_body.append(h1);
    }

});
