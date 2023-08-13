import React, { useEffect, useContext } from 'react'
import { useImmer } from 'use-immer'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductDetailsQuery } from '@store-slice/productsApiSlice.js'
import { useUpdateProduct } from '@store-slice/adminApiSlice.js'
import { ToastContext } from '@hooks/use-toast'
import { useValidation } from '@hooks/use-validation'
import {
  isStringNumberOnly,
  classNames as cn
} from '@utilities'

import './EditProduct.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function ProductEdit () {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const {
    data: serverData = {},
    isLoading,
    isFetching,
    refetch,
    isError,
    error
  } = useGetProductDetailsQuery(productId)
  const [updateProduct, {
    isLoading: isUpdatingProduct,
    isError: updateProductError
  }] = useUpdateProduct()

  // local-state
  const [details, setDetails] = useImmer({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: 0
  })

  // validation
  const {
    formError,
    validateAll,
    clearFormError
  } = useValidation(
    details,
    [
      {
        key: 'name',
        check: val => val.length > 50,
        errMsg: 'Product name cannot be longer 50 characters.'
      }
    ]
  )

  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const updateProductHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await updateProduct({}).unwrap()

      addToastItem({
        type: 'success',
        heading: 'Updated the product details!',
        content: 'Update operation was successful.',
        delay: 5 * 1000
      })
      refetch()
    } catch (err) {
      addToastItem({
        heading: 'Failed to update product.',
        type: 'warning',
        content: err?.data?.message || err.error || 'Something went wrong. please try again',
        delay: 5 * 1000
      })
    }
  }
  const updateFieldFactory = (key, numberOnly = false) => {
    return e => {
      const val = e.target.value
      if (numberOnly && !isStringNumberOnly(val)) { return }

      setDetails(draft => {
        draft[key] = val
      })

      if (formError?.errKey === key) {
        clearFormError()
      }
    }
  }

  // effects
  useEffect(() => {
    setDetails(draft => {
      draft.name = serverData.name || ''
      draft.price = serverData.price || 0
      draft.image = serverData.image || ''
      draft.brand = serverData.brand || ''
      draft.category = serverData.category || ''
      draft.description = serverData.description || ''
      draft.countInStock = serverData.countInStock || 0
    })
  }, [serverData])

  const loadingFeedback = (isLoading || isFetching)
    ? <LoaderSpinner>
        <span>Loading<br />product data..</span>
      </LoaderSpinner>
    : isError
      ? <p>{JSON.stringify(error)}</p>
      : null

  if (loadingFeedback) {
    return loadingFeedback
  }

  return (
    <AdminPage classes='admin-page-update-product'
      pageTitle='Update product'
      widthConstraint={true}
      hideAdminNav={true}>
      <div className='go-back-container'>
        <button className='is-small is-outline' type='button'
          onClick={() => navigate('/admin-product-list')}>
            <i className="icon-arrow-left is-prefix" />
            <span>Go back</span>
          </button>
      </div>
      
      <form onSubmit={updateProductHandler}>
        <div className='form-field mb-30'>
          <label htmlFor='name-input'>Name</label>
          <input id='name-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'name' })}
            onInput={updateFieldFactory('name')}
            value={details.name}
            placeholder='Product name' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='price-input'>Price ($)</label>
          <input id='price-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'price' })}
            onInput={updateFieldFactory('price', true)}
            value={details.price}
            placeholder='Product price' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='brand-input'>Brand</label>
          <input id='brand-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'brand' })}
            onInput={updateFieldFactory('brand')}
            value={details.brand}
            placeholder='Product brand' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='countInStock-input'>Count in stock</label>
          <input id='countInStock-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'countInStock' })}
            onInput={updateFieldFactory('countInStock', true)}
            value={details.countInStock}
            placeholder='Count in-stock' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='description-input'>Description</label>
          <input id='description-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'description' })}
            onInput={updateFieldFactory('description')}
            value={details.description}
            placeholder='Description' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='category-input'>Category</label>
          <input id='category-input' type='text'
            className={cn('custom-input', { 'invalid': formError?.errKey === 'category' })}
            onInput={updateFieldFactory('category')}
            value={details.category}
            placeholder='Category' />
        </div>

        <div className='buttons-container mt-20'>
          <button className='is-primary update-btn'
            type='submit'
            disabled={isUpdatingProduct}
          >Update</button>
        </div>
      </form>
    </AdminPage>
  )
}
