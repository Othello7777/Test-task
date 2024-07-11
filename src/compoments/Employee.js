import React from "react";
import ImgFalse from "../ImgFalse.png";
import ImgTrue from "../ImgTrue.svg";

export const Employee = (props) => {
	const { employee } = props;

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
			<td>
				<button
					className='activeButton'
					onClick={() => props.deleteEmployee(employee)}>
					Delete
				</button>
			</td>
		</tr>
	);
};
