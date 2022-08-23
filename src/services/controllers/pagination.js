const getPagination = (page, size) => {
	const limit = size ? +size : 4; //sets 4 elements per page
	const offset = page ? page * limit : 0; // sets elements according to page
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: projects } = data;
	const currentPage = page ? +page : 0; //first page is 0
	const totalPages = Math.ceil(totalItems / limit); // 8/4
	return { totalItems, projects, totalPages, currentPage }; //object with info
};

module.exports = { getPagination, getPagingData };
