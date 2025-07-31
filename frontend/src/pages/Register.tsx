const Register = ()=>{
    return(
        <div>
            <h1>Sign Up for your work</h1>
            <form action="">
                <label htmlFor="">First name</label>
                <input type="text" />
                <label htmlFor="">Last name</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="email" />
                <label htmlFor="">Password</label>
                <input type="password" />
                <label htmlFor="">Country</label>
                <input type="text" />
            </form>
            <div>
                <input type="checkbox" />Send me helpful emails to find rewarding work and job leads.
                <input type="checkbox" />Yes, I understand and agree to the 
                <a href="#">Upwork Terms of Service</a>.including the 
                <a href="#">User Agreement </a> and <a href="#"> Privacy Policy.</a>
            </div>
            <button>Create my account</button>
            <p>Already have an account?<a href="">Login</a></p>
        </div>
    )
}

export default Register;