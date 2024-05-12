import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

export type tLoginInCreateAccountContext = {
  isLoggedIn: boolean;
  openLoginDialog: boolean;
  handleOpenLoginDialog: () => void;
  handleCloseLoginDialog: () => void;
  handleGotoCreateAccount: () => void;
  handleGotoLogin: () => void;
  loginOrCreateAccount: string;
  // authInputData: tAuthInputData,
  handleLogin: (e: any) => void;
  handleCreateAccount: (e: any) => void;
  authInputData: UseFormRegister<tAuthInputData>;
  handleSubmit: any;
  errors: any;
  setValue: any;
  watch: any;
  // handleEmailPhoneNoChange:(e:any) => void,
  // handleCurrentPasswordChange: (e: any) => void,
  // handleConfirmPasswordChange: (e: any) => void,
  // handleFirstNameChange: (e: any) => void,
  // handleLastNameChange: (e: any) => void,
  handleLogout: () => void;
  userDetails: tUserDetails;

  editProfileFlag: boolean;
  profileUpdateData: any;
  handleSubmitProfileUpdate: any;
  errorsProfileUpdate: any;
  setValueProfileUpdate: any;
  watchProfileUpdate: any;
  resetProfileUpdate: any;

  handleEditProfile: () => void;
  handleCancelEditProfile: () => void;
  handleSaveEditProfile: any;

  handleUploadProfilePhoto: any;
};

export type tAuthInputData = {
  emailOrPhoneNo: string;
  currentPassword: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  isLoggedInCreateAccountClick: boolean;
};

export type tUserDetails = {
  id: string;
  email: string | any;
  firstName: string;
  lastName: string;
  photoURL: string;
  dob?: string;
  gender?: string;
  phoneNumber?: any;
  createdAt?: any;
  updatedAt?: any;
};
