
function WelcomeScreen({ onSignIn }) {
    return (
        <div>
            <h1>Welcome to My Chat App</h1>
            <button onClick={onSignIn}>Sign In</button>
        </div>
    );
}

export default WelcomeScreen;