import React from 'react'
import { tLoginInCreateAccountContext } from '@/types'
import { useLoginInCreateAccountContext } from '@/context/loginCreateAccount/LoginCreateAccount'
import CreateAccount from './CreateAccount';
import Login from './Login';
import { LOGIN_CREATE_ACCOUNT } from '@/constants/common';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
} from '../ui/Dialog';

export default function LoginCreateAccountDialog() {
  const { openLoginDialog, loginOrCreateAccount, handleGotoCreateAccount, handleGotoLogin, handleCloseLoginDialog }: tLoginInCreateAccountContext = useLoginInCreateAccountContext();
  return (
    <Dialog open={openLoginDialog} onOpenChange={handleCloseLoginDialog}>
      <DialogContent className={`${'max-w-[23rem] max-h-[80dvh] overflow-auto overflow-x-hidden'} ${"DialogBox"}`}>
        <div className='grid grid-cols-11'>
          <p
            onClick={handleGotoLogin}
            className={`${cn('text-center col-span-5 text-sm md:cursor-pointer cursor-default')} ${loginOrCreateAccount === LOGIN_CREATE_ACCOUNT.login && "underline"}`}
          >
            Log in
          </p>
          <p className='text-center col-span-1  text-sm'>|</p>
          <p
            onClick={handleGotoCreateAccount}
            className={`${cn('text-center col-span-5 text-sm md:cursor-pointer cursor-default')} ${loginOrCreateAccount === LOGIN_CREATE_ACCOUNT.createAccount && "underline"}`}
          >
            Create account
          </p>
        </div>
        {
          loginOrCreateAccount === LOGIN_CREATE_ACCOUNT.login
            ? <Login />
            : <CreateAccount />
        }
      </DialogContent>
    </Dialog>
  )
}
