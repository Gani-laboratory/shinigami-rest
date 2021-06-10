import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");
mongoose.connect(process.env.MONGODB_URI as string, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
}, (err) => {
	if (err) throw new Error(err.message);
	else log("MongoDB Connected");
});

export default mongoose;