import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera,User,Mail,SquarePen,Save,X} from 'lucide-react';
const ProfilePage = () => {
  const { authUser,updateProfile,isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isEditingName,setIsEditingName] = React.useState(false);
  const [newName,setNewName]= React.useState(authUser?.fullName || "");
  const handleImageUpload=async(e)=>{
      const file=e.target.files[0];
      if(!file){
        return;
      }
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=async()=>{
        setSelectedImage(reader.result);
        await updateProfile({profilePic:reader.result,fullName:authUser.fullName});
      }
  }
  const handleNameUpdate=async()=>{
    if(newName.trim()===""){
      return;
    }
    const success=await updateProfile({profilePic:authUser.profilePic,fullName:newName})
    if(success){
    setIsEditingName(false);
    }
  }
  const handleCancelEdit=()=>{
    setIsEditingName(false);
    setNewName(authUser?.fullName || "");
  }
  return (
     <div className="h-screen pt-20">
      <div className="px-4 py-8">

      <div className="max-w-2xl mx-auto bg-profilebg  p-4 rounded-lg shadow-lg">
        <div className="rounded-lg  space-y-8 p-2">
         <div className="text-center">
           <h1 className="text-xl font-semibold">Profile</h1>
           <p className="mt-2">Your profile information</p>
        </div>
        <div className="flex flex-col items-center gap-4 relative">
         <div className='relative'>
          <img src={selectedImage || authUser.profilePic||"/avatar.png"} alt="Profile Image" className=" size-32 object-cover rounded-full border-4 border-white"/>
         <label htmlFor='avatar-upload' className={`absolute bottom-0 right-0 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 p-2 bg-gray-400 hover:bg-gray-500 ${isUpdatingProfile?"animate-pulse pointer-events-none":""}`}> 
          <Camera className="w-5 h-5 text-base-200" />
          <input type="file" id="avatar-upload" className="hidden" accept="image/*" disabled={isUpdatingProfile} onChange={handleImageUpload} />
          </label> 
         </div>
         <p className="text-profiletextprimary text-center text-sm">
          {isUpdatingProfile ? "Updating Profile..." : "Click on the camera icon to change your profile picture."}
         </p>
         </div>
         <div className="space-y-6">
                     <div className="space-y-1.5">
                       <div className="text-sm text-profiletextprimary flex items-center gap-2">
                         <User className="w-4 h-4" />
                         Full Name
                       </div>
                       <div className="flex justify-between items-center border rounded-lg px-4 py-2 bg-profileinfo">
                        {isEditingName ?(
                          <>
                           <input type="text" 
                           disabled={isUpdatingProfile}
                           value={newName}
                           onChange={(e)=>setNewName(e.target.value)}
                           placeholder="Enter your name"
                           className="w-full outline-none bg-profileinfo"
                           />
                         <div className="flex gap-2 ml-2">
                            <button
                        onClick={handleNameUpdate}
                        disabled={isUpdatingProfile}
                        className="text-inputicon hover:text-inputiconhover disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-inputicon hover:text-inputiconhover"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      </div>
                            </>
                        ):(
                          <>
                            <p className="text-start">{authUser?.fullName.at(0).toUpperCase() + authUser?.fullName.slice(1)}</p>
                       <button  className="text-inputicon hover:text-inputiconhover" onClick={() => setIsEditingName(true)}>
                         <SquarePen className="w-5 h-5" />
                       </button>
                      
                       </>
                        )}
                       </div>
                     </div>
         
                     <div className="space-y-1.5 ">
                       <div className="text-sm  flex items-center gap-2 text-profiletextprimary">
                         <Mail className="w-4 h-4" />
                         Email Address
                       </div>
                       <p className="px-4 py-2.5 bg-profileinfo rounded-lg border">{authUser?.email}</p>
                     </div>
         </div>
         <div className="p-5 mt-6 bg-profileacctbg rounded-lg">
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-profiletextprimary">Member Since</span>
              <span className="text-profiletextprimary">{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-profiletextprimary">Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
          </div>
         </div>
        </div>
      </div>

      </div>
  )
}

export default ProfilePage