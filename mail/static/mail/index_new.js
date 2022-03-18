function handleClick(event) {
    console.log(event.target.tagName, event.target.parentElement.className)
    // navigation buttons click handle:
    if (event.target.tagName === 'BUTTON') {
        if (event.target.parentElement.className === 'nav-item') {
            if (event.target.id === 'compose') {
                composeClick(event)
            } else if (event.target.id === 'logout') {
                logoutClick(event)
            } else if (event.target.id === 'login') {
                loginClick(event)
            } else if (event.target.id === 'register') {
                registerClick(event)
            } else {
                mailboxClick(event)
            }
        } else {
            if (event.target.id === 'archive') {
                archiveClick(event)
            } else if (event.target.id === 'reply') {
                console.log('reply was clicked')
            } else if (event.target.id === 'delete') {
                console.log('delete was clicked')
            } else if (event.target.id === 'submitCompose') {
                console.log('submit compose was clicked')
            } else if (event.target.id === 'submitReply') {
                console.log('submit reply was clicked')
            } else if (event.target.id === 'submitLogin') {
                console.log('submit login was clicked')
            } else if (event.target.id === 'submitLogout') {
                console.log('submit logout was clicked')
            } else if (event.target.id === 'submitRegister') {
                console.log('submit register was clicked')
            } else if (event.target.id === 'cancelLogout') {
                console.log('cancel logoout was clicked')
            }
        }
    // result emails click handle:
    } else if (event.target.className === 'result-item' || event.target.parentElement.className === 'result-item') {
        emailClick(event)
    } else {
        console.log('something else was clicked')
    }
}



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function archiveClick(event) {
    console.log(event.target.id)
}

async function archiveEmail(emailId) {
    const csrftoken =   getCookie('csrftoken') 
    const response = await fetch(`api/email/${emailId}`, {
        method: 'PUT',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            archived: true
        })
    })
    const result = await response.json()
    console.log(result.message)
}


function composeClick(event) {
    console.log('Compose was Clicked')
    function Compose() {
        return (
            <div className="container">
                <label htmlFor="subject">Subject:</label>
                <input type="text" name="subject" id="subject" className="form-control" />
                <label htmlFor="content">Content:</label>
                <textarea name="content" id="content" rows="4" cols="10" className="form-control"/>
                <label htmlFor="recipients">Recipients:</label>
                <input type="text" name="recipients" id="recipients" className="form-control" />
                <button type="submit" className="btn btn-primary" id="submitCompose">Submit</button>
            </div>
        )
    }

    ReactDOM.render(<Compose />, document.querySelector('#root'))
}

function logoutClick(event) {
    console.log('Logout was clicked')
    function Logout() {
        return (
            <div className="container" style={{textAlign: "center"}}>
                <p>
                You are signed in as <b>User-Here</b> <br/>
                Are you sure you want to logout?
                </p>
                <button type="submit" className="btn btn-primary" id="submitLogout">Yes</button>
                <button type="button" className="btn btn-outline-primary" id="cancelLogout">No</button>
            </div>
        )
    }
    ReactDOM.render(<Logout />, document.querySelector('#root'))
}

function loginClick(event) {
    console.log('Login was clicked')
    function Login() {
        return (
            <div className="container">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" className="form-control"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" className="form-control"/>
                <button type="submit" className="btn btn-primary" id="submitLogin">Login</button>
            </div>
        )
    }
    ReactDOM.render(<Login />, document.querySelector('#root'))
}

function registerClick(event) {
    console.log('Register was clicked')
    function Register() {
        return (
            <div className="container">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" className="form-control"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" className="form-control"/>
                <label htmlFor="confirmation">Confirm Password:</label>
                <input type="password" name="confirmation" className="form-control"/>
                <button type="submit" className="btn btn-primary" id="submitRegister">Register</button>
            </div>
        )
    }
    ReactDOM.render(<Register />, document.querySelector('#root'))
}

async function mailboxClick(event) {
    const mailbox = event.target.id;
    const result = await getMailbox(mailbox)
    renderMailbox(result)
}

async function markEmailasRead(emailId) {
    const csrftoken =   getCookie('csrftoken') 
    const response = await fetch(`api/email/${emailId}`, {
        method: 'PUT',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            read: true
        })
    })
    const result = await response.json()
    console.log(result.message)
}

async function getEmail(emailId) {
    const response = await fetch(`api/email/${emailId}`, {})
    const result = await response.json()
    markEmailasRead(emailId)
    return result
}

function updateWindowState(update) {
    const root = document.querySelector('#root').innerHTML
    history.pushState({root: root}, '', `${update}`)
}

window.onpopstate = function(event) {
    showSection(event.state.root)
}


async function emailClick(event) {
    console.log("Email was Clicked")
    const emailId = event.target.id
    console.log(`Email key is ${emailId}`)
    const result = await getEmail(emailId)
    updateWindowState(emailId)
    renderEmail(result.email)
}

async function renderEmail(email) {
    console.log(`email: ${email.subject}`)
    function Email() {

        return (
            <div className="container py-3">
                <h5>{email.subject}</h5>
                <p><b>From: </b>{email.sender}</p>
                <p><b>To: </b>{email.recipients}</p>
                <b>Content:</b>
                <p>{email.content}</p>
                <hr />
                <p>Sent at: {email.timestamp}</p>
                <button type="button" id="archive" className="btn btn-primary">Archive</button>
                <button type="button" id="reply" className="btn btn-primary">Reply</button>
                <button type="button" id="delete" className="btn btn-outline-primary">Delete</button>
            </div>
        )
    }
    ReactDOM.render(<Email />, document.querySelector('#root'))
}


async function getMailbox(mailbox) {
    const message = `This is ${mailbox}`
    const response = await fetch(`api/email/${mailbox}`, {})
    const emails = await response.json()
    const result = {
        message: message,
        emails: emails,
        request: `${mailbox}`
    }
    return result
}


function renderMailbox(props) { 

    function Mailbox() {

        return (
            <div className='container'>
                <ul className="result-list">
                    {props.emails.map(email => (
                        <li key={email.id} id={email.id} className="result-item">
                            <b id={email.id}>{email.subject}</b><br/>
                            From: {email.sender}, at: {email.timestamp}
                        </li>
                    ))}
                    <hr/>
                </ul>
            </div>
        )

    }
    ReactDOM.render(<Mailbox />, document.querySelector('#root'))
}


document.addEventListener('click', handleClick)


function showSection(root) {
    document.querySelector('#root').innerHTML = root
}