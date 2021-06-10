const selfLookup = (_: any, args: any, context: any, info: any) => {
	if (!context.userId) return null;
	return context.db.collection("Users").findOne(context.userId);
};

export default selfLookup;
