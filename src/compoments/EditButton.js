import React, { useState } from "react";

const EditButton = (props) => {
	const { index, text, pressedButton, handleChange } = props;

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
