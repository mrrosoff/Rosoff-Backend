import casual from "casual";

const mocks = {
	User: () => ({
		name: casual.full_name,
		username: casual.username,
		avatar: casual.url,
		email: casual.email,
		password: casual.password
	}),
	Container: () => ({
		_id: casual.uuid,
		name: casual.title,
		createdAt: casual.date()
	})
};

export default mocks;
