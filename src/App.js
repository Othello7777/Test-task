import { useEffect, useState } from "react";
import "./App.css";
import { Employee } from "./compoments/Employee";
import { employeeState, generateId, headers } from "./compoments/Constants";

function App() {
	const [employeeList, setEmployeeList] = useState([...employeeState]);
	const [employeeToBeAdded, setEmployeeToBeAdded] = useState({ status: false });
	const [sorting, setSorting] = useState({
		key: headers[0].name,
		ascending: true,
	});

	useEffect(() => {
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
	}, [sorting]);

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
	};

	const handleEmployeeToBeAddedChange = (event) => {
		const value = event.target.value.trim();
		setEmployeeToBeAdded({
			...employeeToBeAdded,
			[event.target.name]:
				event.target.name === headers[1].name
					? value.length > 0 && value.toLowerCase() !== "false"
					: value,
		});
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
