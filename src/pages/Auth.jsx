import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";


function Auth() {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="auth-container">
            {!isLoginView ? (
                <LoginForm onSwitch={() => setIsLoginView(false)} />
            ) : (
                <SignUpForm onSwitch={() => setIsLoginView(true)} />
            )}
        </div>
    );
}

export default Auth;