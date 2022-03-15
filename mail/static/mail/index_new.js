function handleClick(event) {
    console.log(event.target.tagName, event.target.parentElement.className)
    if (event.target.tagName === 'BUTTON' && event.target.parentElement.className === 'nav-item') {
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
    } else if (event.target.parentElement.className === 'result-item') {
        emailClick(event)
    } else {
        console.log('something else was clicked')
    }
}

async function composeClick(event) {
    console.log('Compose was Clicked')
}

function loginClick(event) {
    console.log('Login was clicked')
}

function logoutClick(event) {
    console.log('Logout was clicked')
}

function registerClick(event) {
    console.log('Register was clicked')
}

async function mailboxClick(event) {
    const mailbox = event.target.id;
    const result = await getMailbox(mailbox)
    renderMailbox(result)
}

async function emailClick(event) {
    console.log("Email was Clicked")
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
                        <li key={email.id} className="result-item">
                            <b>{email.subject}</b><br/>
                            From: {email.sender}, at: {email.timestamp}
                        </li>
                    ))}
                    <hr/>
                </ul>
            </div>
        )

    }
    ReactDOM.render(<Mailbox />, document.querySelector('#result'))
}


document.addEventListener('click', handleClick)