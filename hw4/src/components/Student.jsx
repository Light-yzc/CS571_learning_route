const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */}
        <h2>{props.major}</h2>
        <br />
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin? 'is' : 'NOT'} from Wisconsin</p>
        <br />
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map(inter => <li>{inter}</li>)}
        </ul>
    </div>
}

export default Student;