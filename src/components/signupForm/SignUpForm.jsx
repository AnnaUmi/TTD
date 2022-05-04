import React, {useState, useEffect} from "react";
import { checkIsEmail, checkIsEqualStrings, checkIsPassportValid, ERRORS_MESSAGE, NOTIFICATION_MESSAGE } from "../../helpers";

const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false)
 
    const isDisabledSubmitButton = email && password && passwordConfirm && isPasswordValid && isPasswordConfirmationValid && isEmailValid;

    const handleChange = (e, action) => {
        const value = e.target.value
        action(value)
    }

    const handleValidation = (e, action, validator) => {
        const value = e.target.value
        if(validator(value)) {
            action(true)
        }else{
            action(false)
        }
    }
    const handleValidationPasswordConfirmation = (e, action, validator) => {
        const value = e.target.value
        if(validator(value, password)) {
            action(true)
        }else{
            action(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmited(true)
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
    }

    useEffect(() => {
        if(isSubmited) {
            setTimeout(() => setIsSubmited(false), 3000)
        }

    }, [isSubmited])


    return <div>
        <h1 data-testid="form">Sign-up form</h1>
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-box">
                <input 
                    data-testid="emailInput"  
                    value={email}type="email" 
                    placeholder="Type Email Please"
                    onChange={e => {
                        handleChange(e, setEmail)
                        handleValidation(e, setIsEmailValid, checkIsEmail)
                    }}
                />
                {!isEmailValid && <div className="error_message">{ERRORS_MESSAGE.email}</div> }
            </div>
            <div className="input-box">
                <input 
                    data-testid="passwordInput"  
                    value={password} 
                    type="password" 
                    placeholder="Type Password Please"
                    onChange={e => {
                        handleChange(e, setPassword)
                        handleValidation(e, setIsPasswordValid, checkIsPassportValid)}}
                />
                {!isPasswordValid && <div className="error_message">{ERRORS_MESSAGE.password}</div> }
            </div>
            <div className="input-box">
                <input 
                    data-testid="passwordInputConfirm" 
                    value={passwordConfirm} 
                    type="password" 
                    placeholder="Confirm Password Please"
                    onChange={(e) => {
                        handleChange(e, setPasswordConfirm)
                        handleValidationPasswordConfirmation(e, setIsPasswordConfirmationValid, checkIsEqualStrings)
                    }}
                />
                {!isPasswordConfirmationValid && <div className="error_message">{ERRORS_MESSAGE.passwordConfirmation}</div> }
                </div>
            <input 
                disabled={!isDisabledSubmitButton}
                data-testid="submitButton" 
                type="submit" 
                placeholder="Submit"
            />
                {isSubmited && <div className="success_message">{NOTIFICATION_MESSAGE.success}</div>}
        </form>
    </div>
}
export default SignUpForm;