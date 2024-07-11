import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const Table = () => {
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [currentUsers, setCurrentUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [sorting, setSorting] = useState({ key: "name", ascending: true });

	const pageItemCount = 15;
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(async () => {
		try {
			const response = await getUsers(search);
			setUsers(response.data.users);
			setPageCount(Math.ceil(response.data.users.length / pageItemCount));
			setCurrentUsers(response.data.users.slice(0, pageItemCount));
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [search]);

	useEffect(() => {
		const sortedUsers = [...currentUsers].sort((a, b) => {
			if (a[sorting.key] < b[sorting.key]) {
				return sorting.ascending ? -1 : 1;
			}
			if (a[sorting.key] > b[sorting.key]) {
				return sorting.ascending ? 1 : -1;
			}
			return 0;
		});
		setCurrentUsers(sortedUsers);
	}, [currentUsers, sorting]);

	function applySorting(key) {
		if (sorting.key === key) {
			setSorting({ ...sorting, ascending: !sorting.ascending });
		} else {
			setSorting({ key: key, ascending: true });
		}
	}

	const changePage = (i) => {
		setCurrentPage(i);
		const startItem = (i - 1) * pageItemCount;
		setCurrentUsers(users.slice(startItem, startItem + pageItemCount));
	};

	const handleChange = (event, value) => {
		changePage(value);
	};

	return (
		<div
			dir='rtl'
			className='bg-background mt-10 px-5 rd1200:px-30 overflow-auto'>
			<div className='flex flex-wrap justify-between items-center'>
				<div>
					<input
						type='text'
						className='my-3 py-2 pl-3 pr-10 text-sm text-text-secondary shadow-sm focus:ring-2 ring-text-secondary rounded-md w-full rd500:w-120'
						placeholder='search ..'
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
				</div>

				<div className='flex justify-center'>
					<select
						className='form-select form-select-sm my-3 py-2 pl-15 pr-2 text-sm text-text-secondary shadow-sm rounded-md w-full focus:ring-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none '
						aria-label='.form-select-sm example'
						onChange={(e) => navigate(e.target.value)}>
						<option value='/'>users</option>
						<option value='/ext'>other users</option>
					</select>
				</div>
			</div>

			<table className='w-full border-separate rounded-md'>
				<thead>
					<tr className='bg-text-secondary text-white shadow-sm text-center'>
						<th className='p-2' onClick={() => applySorting("name")}>
							name {sorting.key === "name" && (sorting.ascending ? "?" : "?")}
						</th>
						<th className='p-2' onClick={() => applySorting("phone")}>
							phone {sorting.key === "phone" && (sorting.ascending ? "?" : "?")}
						</th>
					</tr>
				</thead>
				<tbody>
					{currentUsers.map((item) => (
						<tr
							key={item.id}
							className={
								index % 2 === 0
									? "bg-white shadow-sm text-center"
									: "bg-text bg-opacity-5 shadow-sm text-center"
							}>
							<td className='text-text text-sm p-2'>{item.name}</td>
							<td className='text-text text-sm p-2'>{item.phone}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				className='mt-2 pb-20'
				dir='ltr'
				page={currentPage}
				count={pageCount}
				onChange={handleChange}
				variant='outlined'
				shape='rounded'
			/>
		</div>
	);
};
export default Table;
