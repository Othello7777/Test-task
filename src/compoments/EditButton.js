import React, { useState } from "react";

const EditButton = (props) => {
	const [pressedButton, setPressedButton] = useState(false);
	const { index, text } = props;

	const handleChange = () => {
		setPressedButton((current) => !current);
	};

	return (
		<button
			key={index}
			className={pressedButton ? "editButtonPressed" : "editButton"}
			onClick={handleChange}>
			{text}
		</button>
	);
};

export default EditButton;
