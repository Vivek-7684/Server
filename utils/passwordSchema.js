const passwordValidator = require('password-validator');

// Create schema
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(4, 'Password must have at least 4 characters')
    .is().max(8, 'Password must not exceed 8 characters')
    .has().uppercase(1, 'Password must have at least one uppercase letter')
    .has().lowercase(1, 'Password must have at least one lowercase letter')
    .has().digits(2, 'Password must have at least two digits')
    .has().not().spaces();

module.exports = passwordSchema;
