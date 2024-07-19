import React, { useState } from "react";
import ImgFalse from "../ImgFalse.png";
import ImgTrue from "../ImgTrue.svg";
import EditButton from "./EditButton";

export const Employee = (props) => {
	const [pressedButton, setPressedButton] = useState(false);
	const { employee, deleteEmployee, setColorButton, colorButtons, index } =
		props;

	const handleChange = () => {
		setPressedButton((current) => !current);
	};

	return (
		<tr>
			<td>{employee.name}</td>
			<td>
				<img
					src={employee.status ? ImgTrue : ImgFalse}
					alt={employee.status.toString()}
					width={16}
				/>
			</td>
			<td>{employee.position}</td>
			<td>{employee.subdivision}</td>
			<td>{employee.peoplePartner}</td>
			<td>{employee.outOfOfficeBalance}</td>
			<td>
				<button
					className='activeButton'
					onClick={() => deleteEmployee(employee)}>
					Delete
				</button>

				<EditButton
					index={index}
					colorButtons={colorButtons}
					setColorButton={setColorButton}
					pressedButton={pressedButton}
					handleChange={handleChange}
					text={"Edit button"}
				/>
			</td>
		</tr>
	);
};
