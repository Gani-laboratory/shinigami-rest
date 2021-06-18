import Joi from "joi";
const editValidation = (data: string): Joi.ValidationResult => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20),
		password: Joi.string().min(7).max(30),
		email: Joi.string().email({ minDomainSegments: 2 })
	});

	return schema.validate(data);
};

export { editValidation };
