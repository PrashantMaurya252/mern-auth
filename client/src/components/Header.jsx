import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const Header = () => {
  const {currentUser}=useSelector(state=>state.user);
  console.log({currentUser})

  return (
    <div className="bg-slate-200">
        <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">
            <Link to='/'>
            <h1 className="font-bold">Auth App</h1>
            </Link>
            
            <ul className="flex gap-4">
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/profile'>{currentUser ?(<img className="w-7 h-7 rounded-full object-cover" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"/>):(<li>SignIn</li>)}</Link>
            </ul>
        </div>
    </div>
  )
}

export default Header