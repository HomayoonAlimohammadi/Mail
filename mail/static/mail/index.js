document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#inbox').onclick = show_inbox;
    document.querySelector('#compose').onclick = show_compose;
    document.querySelector('#sent').onclick = show_sent;
    document.querySelector('#archived').onclick = show_archived;
    // document.querySelector('#register').onclick = show_register;
    // document.querySelector('#login').onclick = show_login;
    // document.querySelector('#logout').onclick = show_logout;
    var redirect_link = document.querySelector('#inbox').dataset.redirect;


    function hide_all() {
        document.querySelector('#compose_div').style.display = 'none';
        // document.querySelector('#register_div').style.display = 'none';
        // document.querySelector('#login_div').style.display = 'none';
        // document.querySelector('#logout_div').style.display = 'none';
        document.querySelector('#main_body').innerHTML = '';

    }


    function show_inbox() {
        hide_all();
        let main_body = document.querySelector('#main_body');
        let mailbox_link = document.querySelector('#inbox').dataset.link;
        console.log(mailbox_link);
        fetch(mailbox_link)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.replace(redirect_link)
            } else {
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
            });
            main_body.append(ul);
            }
        });
    }



    function show_compose() {
        hide_all();
        document.querySelector('#compose_div').style.display = 'block';
    };

    function show_sent() {
        hide_all();
        let main_body = document.querySelector('#main_body');
        let mailbox_link = document.querySelector('#sent').dataset.link;
        console.log(mailbox_link);
        fetch(mailbox_link)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.replace(redirect_link)
            } else {
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
            main_body.append(ul);
            }
        });
    };

    function show_archived() {
        hide_all();
        let main_body = document.querySelector('#main_body');
        let mailbox_link = document.querySelector('#archived').dataset.link;
        console.log(mailbox_link);
        fetch(mailbox_link)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.replace(redirect_link)
            } else {
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
            main_body.append(ul);
            }
        });
    };

    function show_register() {
        hide_all();
        document.querySelector('#register_div').style.display = 'block';
    }

    function show_login() {
        hide_all();
        document.querySelector('#login_div').style.display = 'block';
    }

    function show_logout() {
        hide_all();
        document.querySelector('#logout_div').style.display = 'block';
    }

});
