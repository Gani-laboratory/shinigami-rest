import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");
const client = mongoose.connect(process.env.MONGODB_URI as string, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
}).then(m => {
	log("MongoDB Connected");
	return m.connection.getClient();
}).catch(e => { throw new Error(e); });

export default client;