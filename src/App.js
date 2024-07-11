import { useEffect, useState } from "react";
import "./App.css";
import { Employee } from "./compoments/Employee";
import { employeeState, generateId, headers } from "./compoments/Constants";

// 1# Create table.
// 2# set constans and put it in seperate file.

function App() {
	const [employeeList, setEmployeeList] = useState([...employeeState]);
	const [employeeToBeAdded, setEmployeeToBeAdded] = useState({
		status: false,
		outOfOfficeBalance: 0,
	});
	const [sorting, setSorting] = useState({
		key: headers[0].name,
		ascending: true,
	});

	useEffect(() => {
		// console.log(!isNaN(+value)); // true if its a number, false if not
		// if () {}
		const safeToLowerCase = (e) =>
			typeof e === "string" ? e.toLowerCase() : e;

		const sortedEmployeeList = [...employeeList].sort(
			(employee1, employee2) => {
				const value1 = safeToLowerCase(employee1[sorting.key]);
				const value2 = safeToLowerCase(employee2[sorting.key]);
				if (value1 < value2) {
					return sorting.ascending ? -1 : 1;
				}
				if (value1 > value2) {
					return sorting.ascending ? 1 : -1;
				}
				return 0;
			}
		);
		setEmployeeList(sortedEmployeeList);
	}, [sorting]); // func activate sorting

	const deleteEmployee = (employeeToBeDeleted) => {
		setEmployeeList(
			employeeList.filter(
				(employeeElement) => employeeElement.id !== employeeToBeDeleted.id
			)
		);
	};

	const addEmployee = () => {
		employeeToBeAdded.id = generateId();
		setEmployeeList(employeeList);
		setEmployeeList([...employeeList, { ...employeeToBeAdded }]);

		console.log(
			"value =" + JSON.stringify(employeeToBeAdded.outOfOfficeBalance)
		);
	};

	const handleEmployeeToBeAddedChange = (event) => {
		const value = event.target.value.trim(); // trim() deletes spaces
		setEmployeeToBeAdded({
			...employeeToBeAdded,
			[event.target.name]:
				event.target.name === headers[1].name
					? value.length > 0 && value.toLowerCase() !== "false" // toLowerCase is needed to avoid error with name which start with small letter.
					: value,
		});
		console.log(value);
	};
	// console.log("employeeToBeAdded=" + JSON.stringify(employeeToBeAdded));

	const handleHeaderClick = (key) => {
		if (sorting.key === key) {
			setSorting({ ...sorting, ascending: !sorting.ascending });
		} else {
			setSorting({ key: key, ascending: true });
		}
	};

	return (
		<div className='App'>
			Employee
			<br></br>
			<br></br>
			<table>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={index} onClick={() => handleHeaderClick(header.name)}>
								{header.name}{" "}
								{sorting.key === header.name && (sorting.ascending ? "▲" : "▼")}
							</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{employeeList.map((employee) => (
						<Employee
							key={employee.id}
							employee={employee}
							deleteEmployee={deleteEmployee}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td>
							<input
								name='name'
								placeholder='name'
								onChange={handleEmployeeToBeAddedChange}
							/>
						</td>
						<td>
							<input
								name='status'
								placeholder='status'
								onChange={handleEmployeeToBeAddedChange}
							/>
						</td>
						<td>
							<select
								name='position'
								placeholder='position'
								onChange={handleEmployeeToBeAddedChange}>
								<option value='position 1'>position #1</option>
								<option value='position 2'>position #2</option>
								<option value='position 3'>position #3</option>
							</select>
						</td>
						<td>
							<select
								name='subdivision'
								placeholder='subdivision'
								onChange={handleEmployeeToBeAddedChange}>
								<option value='sub 1'>subdivision #1</option>
								<option value='sub 2'>subdivision #2</option>
								<option value='sub 3'>subdivision #3</option>
							</select>
						</td>
						<td>
							<select
								name='peoplePartner'
								placeholder='partner'
								onChange={handleEmployeeToBeAddedChange}>
								{employeeList.map((employee) => (
									<option
										key={employee.id}
										value={employee.name}
										employee={employee}>
										{employee.name}
									</option>
								))}
							</select>
						</td>
						<td>
							<input
								name='outOfOfficeBalance'
								type='number'
								placeholder='balance'
								onChange={handleEmployeeToBeAddedChange}
							/>
						</td>
						<td>
							<button
								onClick={addEmployee}
								disabled={!employeeToBeAdded.name?.trim()}>
								Add
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}

export default App;
