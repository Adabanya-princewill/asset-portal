import React from 'react'
import Cards from '../../../components/Cards/Cards'

const ViewAssetsPage = () => {
  return (
    <div className='flex justify-between gap-8 flex-wrap'>
      <Cards
        title="TOTAL ASSETS"
        number="23"
      />
      <Cards
        title="PENDING ASSETS"
        number="23"
      />
      <Cards
        title="APPROVED ASSETS"
        number="23"
      />
      <Cards
        title="REJECTED ASSETS"
        number="23"
      />
    </div>
  )
}

export default ViewAssetsPage
