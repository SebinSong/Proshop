import React, { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetProductsQuery } from '@store/features/productsApiSlice.js'
import { useCreateProduct, useDeleteProduct } from '@store/features/adminApiSlice.js'
import { formatMoney } from '@utilities'
import { ToastContext } from '@hooks/use-toast'

import './ProductList.scss'
import '../AdminShared.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function ProductList () {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetProductsQuery()
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProduct()
  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteProduct()
  const navigate = useNavigate()
  
  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const createProductHandler = async () => {
    try {
      const res = await createProduct().unwrap()
      addToastItem({
        type: 'success',
        heading: 'Sample product created!',
        content: 'A sample product entry has been created. go ahead and update the details.',
        delay: 5 * 1000
      })
      refetch()
    } catch (err) {
      addToastItem({
        heading: 'Failed to create an entry!',
        type: 'warning',
        content: err?.data?.message || err.error || 'Something went wrong. please try again',
        delay: 5 * 1000
      })
    }
  }
  const removeProductHandler = async (productId) => {
    if (isDeletingProduct) { return }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await deleteProduct(productId).unwrap()
        addToastItem({
          type: 'success',
          heading: 'Product deleted!',
          content: res?.message || `The product(id: ${productId}) has been successfully deleted.`,
          delay: 5 * 1000
        })
        refetch()
      } catch (err) {
        addToastItem({
          heading: 'Failed to delete a product!',
          type: 'warning',
          content: err?.data?.message || err.error || 'Something went wrong. please try again',
          delay: 5 * 1000
        })
      }
    }
  }

  const loadingFeedback = isLoading
    ? <LoaderSpinner classes='loading-feedback'>
        <span>Loading<br />product data..</span>
      </LoaderSpinner>
    : isError
      ? <p>{ JSON.stringify(error) }</p>
      : null

  if (loadingFeedback) {
    return loadingFeedback
  }

  return (
    <AdminPage classes='admin-page-product-list'
      pageTitle='Product list'>
      <div className='custom-table-container summary-list'>
        <div className='create-btn-container'>
          <button className='is-primary is-small'
            type='button'
            disabled={isCreatingProduct}
            onClick={createProductHandler}>Create product</button>
        </div>

        <div className='table-wrapper'>
          <table className='table list-table product-list-table'>
            <thead>
              <tr>
                <th className='th-id'>ID</th>
                <th className='th-name'>Name</th>
                <th className='th-price'>Price</th>
                <th className='th-category'>Category</th>
                <th className='th-brand'>Brand</th>
                <th className='th-actions'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                products.map(product => (
                  <tr key={product._id}>
                    <td className='td-id'>{product._id}</td>
                    <td className='td-name'>{product.name}</td>
                    <td className='td-price'>{formatMoney(product.price)}</td>
                    <td className='td-category'>{product.category}</td>
                    <td className='td-brand'>{product.brand}</td>
                    <td className='td-actions'>
                      <button className='icon-small action-btn edit-btn'
                        title='Edit product'
                        onClick={() => navigate(`/admin-update-product/${product._id}`)}
                        type='button'>
                        <i className='icon-document'></i>
                      </button>

                      <button className='icon-small action-btn remove-btn'
                        title='Remove product'
                        onClick={() => removeProductHandler(product._id)}
                        disabled={isDeletingProduct}
                        type='button'>
                        <i className='icon-trash-can'></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  )
}
