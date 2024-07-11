let employeeIndex = 0;

export const generateId = () => employeeIndex++;

const employeeProps = (
	name,
	subdivision,
	position,
	status,
	peoplePartner,
	outOfOfficeBalance
) => ({
	id: generateId(),
	name, // ['name']: name
	subdivision,
	position,
	status,
	peoplePartner,
	outOfOfficeBalance,
});

export const employeeState = [
	employeeProps("Peter", "subdivision", "position", false),
	employeeProps("Sam", "subdivision", "position", true),
	employeeProps("John", "subdivision", "position", true),
	employeeProps("Kayle", "subdivision", "position", false),
	employeeProps("Emmile", "subdivision", "position", true),
];

export const headers = [
	{
		id: 1,
		key: "NAME",
		name: "name",
	},
	{
		id: 2,
		key: "STATUS",
		name: "status",
	},
];
