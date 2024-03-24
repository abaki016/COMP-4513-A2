

const AboutModal = (props) => {

    if(!props.open) return null; //if the modal is not open, don't render anything

    return (
        <div>
            <span onClick={props.close}>❌</span>
            <h1>About This Project</h1>
            <h3>Name:</h3>
            <h3>Test 123</h3>
        </div>
    )
}

export default AboutModal;