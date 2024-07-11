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
	employeeProps("Peter", "sub 1", "position 1", false, "", 4),
	employeeProps("Sam", "sub 1", "position 3", true, "", 9),
	employeeProps("John", "sub 3", "position 1", true, "", 11),
	employeeProps("Kayle", "sub 2", "position 2", false, "", 10),
	employeeProps("Emmile", "sub 3", "position 2", true, "", 14),
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
	{
		id: 3,
		key: "POSITION",
		name: "position",
	},
	{
		id: 4,
		key: "SUBDIVISION",
		name: "subdivision",
	},
	{
		id: 5,
		key: "PEOPLEPARTNER",
		name: "peoplePartner",
	},
	{
		id: 6,
		key: "outOfOfficeBalance",
		name: "outOfOfficeBalance",
	},
];
