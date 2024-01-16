import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser,updateUserFailure,updateUserSuccess,deleteUser,deleteUserFailure,deleteUserSuccess,signOut } from "../redux/user/userSlice.js";

const Profile = () => {
  const [formData,setFormData]=useState({})
  const {currentUser}=useSelector(state=>state.user);
  const dispatch=useDispatch();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUser())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleDeleteAccount=async ()=>{
    try {
      dispatch(deleteUser());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });
      const data=await res.json();
      if(data.success ===false){
        dispatch(deleteUserFailure(data));
        return ;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleSignOut=async ()=>{
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img className="w-24 h-24 self-center object-cover cursor-pointer rounded-full mt-2" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile Image" />
        <input onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder="Email" id="email" className="bg-slate-100 rounded-lg p-3"/>
        <input onChange={handleChange} type="password" placeholder="Password" id="password" className="bg-slate-100 rounded-lg p-3"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile