import React, { useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetUserDetails, useUpdateUserDtails } from '@store/features/adminApiSlice.js'
import { ToastContext } from '@hooks/use-toast'
import { useValidation } from '@hooks/use-validation'
import { validateEmail, classNames as cn } from '@utilities'

import './EditUser.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function EditUser () {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  // local-state
  const {
    data: userDetails,
    isLoading,
    isFetching,
    isError,
    error: userDetailsError,
    refetch
  } = useGetUserDetails(userId)
  const [updateUserDetails, {
    isLoading: isUpdatingUserDetails,
    error: updateUserDetailsError
  }] = useUpdateUserDtails()
  const [details, setDetails] = useImmer({
    name: '',
    email: '',
    isAdmin: false
  })
  const fieldIsUpdated = key => {
    const currVal = details[key]
    const valAgainst = userDetails[key]

    if (typeof currVal === 'string') {
      return currVal.trim() !== valAgainst
    } else {
      return currVal !== valAgainst
    }
  }

  const extractUpdates = () => {
    const updateObj = {}
    Object.keys(details).forEach(key => {
      if (fieldIsUpdated(key)) {
        updateObj[key] = details[key]
      }
    })

    return updateObj
  }

  // computed state
  const anyFieldUdpated = userDetails &&
    Object.keys(details).some(fieldIsUpdated)

  // validation
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
      }
    ]
  )

  // context
  const { addToastItem } = useContext(ToastContext)

  const loadingFeedback = (isLoading || isFetching)
    ? <LoaderSpinner>
        <span>Loading<br />product data..</span>
      </LoaderSpinner>
    : isError
      ? <p>{JSON.stringify(userDetailsError)}</p>
      : null

  // effects
  useEffect(() => {
    if (!userDetails) return

    setDetails(draft => {
      draft.name = userDetails.name || ''
      draft.email = userDetails.email || ''
      draft.isAdmin = Boolean(userDetails.isAdmin)
    })
  }, [userDetails])

  // methods
  const updateFieldFactory = key => {
    return e => {
      const val = e.target.value
      setDetails(draft => {
        draft[key] = key === 'isAdmin' ? val === 'Yes' : val
      })

      if (formError && formError.errKey === key) {
        clearFormError()
      }
    }
  }

  const updateUserHandler = async (e) => {
    e.preventDefault()

    if (validateAll()) {
      try {
        const res = await updateUserDetails({
          userId,
          data: extractUpdates()
        }).unwrap()

        addToastItem({
          type: 'success',
          heading: 'Updated!',
          content: 'The user details have been updated successfully.',
          delay: 5 * 1000
        })
        refetch()
      } catch (err) {
        addToastItem({
          heading: 'Failed to update user.',
          type: 'warning',
          content: err?.data?.message || err.error || 'Something went wrong. please try again',
          delay: 5 * 1000
        })
      }
    }
  }

  if (loadingFeedback) {
    return loadingFeedback
  }
   
  return (
    <AdminPage classes='admin-page-update-product'
      pageTitle='Update user details'
      widthConstraint={true}
      hideAdminNav={true}>
      <div className='go-back-container'>
        <button className='is-small is-outline' type='button'
          onClick={() => navigate('/admin-user-list')}>
            <i className="icon-arrow-left is-prefix" />
            <span>Go back</span>
          </button>
      </div>

      <form onSubmit={updateUserHandler}>
        <div className='form-field mb-30'>
          <label htmlFor='name-input'>Name</label>
          <input id='name-input' type='text'
            className={cn('custom-input', { 'invalid': formError && formError.errKey === 'name' })}
            onInput={updateFieldFactory('name')}
            value={details.name}
            placeholder='User name' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='email-input'>Email</label>
          <input id='email-input' type='text'
            className={cn('custom-input', { 'invalid': formError && formError.errKey === 'email' })}
            onInput={updateFieldFactory('email')}
            value={details.email}
            placeholder='User email' />
        </div>

        <div className='form-field mb-30'>
          <label>Admin user</label>

          <label className='radio'>
            <input type='radio'
              name='admin'
              value='Yes'
              checked={details.isAdmin === true}
              onChange={updateFieldFactory('isAdmin')} />

            <span>Yes</span>
          </label>

          <label className='radio'>
            <input type='radio'
              name='admin'
              value='No'
              checked={details.isAdmin === false}
              onChange={updateFieldFactory('isAdmin')} />

            <span>No</span>
            </label>
        </div>

        <div className='buttons-container mt-20'>
          <button className='is-primary update-btn'
            type='submit'
            disabled={isUpdatingUserDetails || !anyFieldUdpated}
          >Update</button>
        </div>
      </form>
    </AdminPage>
  )
}
