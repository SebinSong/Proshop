import React, { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import { useDispatch, useSelector } from '@redux-api'
import {
  validateEmail,
  ifElseComponent,
  classNames as cn
} from '@utilities'
import { useLogout, useUpdateProfile } from '@store/features/usersApiSlice.js'
import { useGetMyOrders } from '@store/features/ordersApiSlice.js'
import { selectUserInfo } from '@store/features/authSlice'
import { clearCredentials, setCredentials } from '@store/features/authSlice'
import OrderTable from '@components/order-table/OrderTable.js'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '@hooks/use-toast'
import { useValidation } from '@hooks/use-validation'
import './Profile.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function Profile () {
  const userInfo = useSelector(selectUserInfo)
  const [logout, { isLoading: isSigningOut }] = useLogout()
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfile()
  const {
    data: myOrders = [],
    isLoading: isMyOrdersLoading,
    isFetching: isFetchingMyOrders,
    isError: isMyOrdersError,
    errors: myOrdersErrors,
    refetch: refetchMyOrders
  } = useGetMyOrders()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // local-state
  const [details, setDetails] = useImmer({
    name: userInfo.name || '',
    email: userInfo.email || '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [apiErrorKey, setApiErrorKey] = useState('')
  const {
    formError,
    validateAll,
    clearFormError
  } = useValidation(
    details,
    [
      {
        key: 'email',
        check: val => validateEmail(val),
        errMsg: 'Please enter a valid email format.'
      },
      {
        key: 'confirmNewPassword',
        check: (val, state) => val === state.newPassword,
        errMsg: 'Confirm password field has to be the same as the password you entered.'
      }
    ]
  )

  // computed state
  const isLoadingOrderHistory = isMyOrdersLoading || isFetchingMyOrders

  const isLongEnoughAndDiff = key => {
    const val = details[key].trim()
    return val.length > 3 &&
      (val !== userInfo[key])
  }
  const isDiff = key => userInfo[key] !== details[key].trim()
  const enableUpateButton = (
    isLongEnoughAndDiff('name') ||
    isLongEnoughAndDiff('email') ||
    details.newPassword.length >= 6
  )
  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const onLogoutClick = async () => {
    try {
      const res = await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/login')
    } catch (err) {
      addToastItem({
        type: 'warning',
        heading: 'Failed to log you out!',
        content: err?.data?.message || 'The server appears to be experiencing an issue, please try again later.',
        delay: 6 * 1000
      })
      dispatch(clearCredentials())
    }
  }
  const updateFactory = key => {
    return e => {
      setDetails(draft => {
        draft[key] =e.target.value || ''
      })

      if (formError && formError.errKey === key) {
        clearFormError()
      }
      if (apiErrorKey === key) {
        setApiErrorKey('')
      }
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault()

    if (validateAll()) {
      try {
        const data = await updateProfile({
          name: isLongEnoughAndDiff('name') ? details.name : '',
          email: isLongEnoughAndDiff('email') ? details.email : '',
          password: details.newPassword.length >= 6 ? details.newPassword : ''
        }).unwrap()

        addToastItem({
          type: 'success',
          heading: 'Updated profile!',
          content: 'Your profile has been updated with the changes',
          delay: 6 * 1000
        })
        dispatch(setCredentials(data))
        location.reload()
      } catch (err) {
        addToastItem({
          heading: 'Update Failed!',
          type: 'warning',
          content: err?.data?.message || err.error || 'Something went wrong. please try again',
          delay: 5 * 1000
        })
      }
    }
  }

  if (!myOrders?.length) {
    console.log('My orders list: ', myOrders)
  }

  // render
  return (
    <ProtectedPage>
      <PageTemplate classes='page-profile'>
        <form className='page-form-container mb-40' onSubmit={e => { e.preventDefault() }}>
          <div className='profile-header'>
            <h1 className="page-template__page-heading is-underlined">My profile</h1>

            <button className='is-outline profile__logout-btn'
              disabled={isSigningOut}
              onClick={onLogoutClick}
            >Log out</button>
          </div>
        </form>

        <form className='page-form-container' onSubmit={updateHandler}>
          <h3 className='is-title-5 sub-heading is-update-profile'>Update user details</h3>

          <div className='form-field mb-30'>
            <label htmlFor='name-input'>Name</label>
            <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'name' })}
              id='name-input' type='text'
              onInput={updateFactory('name')}
              value={details.name}
              placeholder='Update your user name' />
          </div>

          <div className='form-field mb-30'>
            <label htmlFor='email-input'>Email</label>
            <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'email' })}
              id='email-input' type='text'
              onInput={updateFactory('email')}
              value={details.email}
              placeholder='Update your email' />
          </div>

          <div className='form-field mb-30'>
            <label htmlFor='newPassword-input'>New password</label>
            <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'newPassword' })}
              id='newPassword-input'
              type='password'
              onInput={updateFactory('newPassword')}
              value={details.newPassword}
              placeholder='Enter new password' />
          </div>

          <div className='form-field mb-40'>
            <label htmlFor='confirmNewPassword-input'>Confirm new password</label>
            <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'confirmNewPassword' })}
              id='confirmNewPassword-input'
              type='password'
              onInput={updateFactory('confirmNewPassword')}
              value={details.confirmNewPassword}
              placeholder='Confirm new password' />
          </div>

          {
            ifElseComponent(
              [
                formError,
                <p className='form-error-msg signup-form-err'>
                  {formError?.errMsg}
                </p>
              ]
            )
          }

          <div className='buttons-container mt-20'>
            <button className='is-primary update-profile-btn'
              disabled={!enableUpateButton || isUpdatingProfile} 
              type='submit'
            >Update</button>
          </div>
        </form>

        <hr className='section-divider has-width-constraint' />

        <div className='page-width-constraints'>
          <h3 className='is-title-5 sub-heading is-my-orders'>My order history</h3>

          <OrderTable list={myOrders}
            isLoading={isLoadingOrderHistory}
            loadingFeedback='Loading order history...'
            noItemsFeedback='You have no previous order history.'
            variant='profile' />
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
