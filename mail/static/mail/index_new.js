async function navButtonClick(event) {
    const mailbox = event.target.id;
    const result = await getMailbox(mailbox)
    // console.log('result in click func', result)
    render(result)
}


async function getMailbox(mailbox) {
    const message = `This is ${mailbox}`
    const response = await fetch(`api/email/${mailbox}`, {})
    const content = await response.json()
    const result = {
        message: message,
        content: content,
        request: `${mailbox}`
    }
    // console.log('result in getmailbox', result)
    return result
}


function render(props) { 
    function App() {

        return (
            <div className='container'>
                <h1>{props.message}</h1>
                <p>
                {props.content[0].subject}
                </p>
            </div>
        )

    }
    ReactDOM.render(<App />, document.querySelector('#app'))
}


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', navButtonClick)
})
