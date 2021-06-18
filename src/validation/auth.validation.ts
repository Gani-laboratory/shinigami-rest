import Joi from "joi";
const loginValidation = (data: string): Joi.ValidationResult => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(20).required(),
		password: Joi.string().min(7).max(30).required(),
	});

	return schema.validate(data);
};

const registerValidation = (data: string): Joi.ValidationResult => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20).required(),
		password: Joi.string().min(7).max(30).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required()
	});

	return schema.validate(data);
};

export { loginValidation, registerValidation };
