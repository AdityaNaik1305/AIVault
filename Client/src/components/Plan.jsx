import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (

    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scaale up as you grow.Find the perfect plan for your content creation needs.</p>
        </div>

        <div><stripe-pricing-table
        pricing-table-id="prctbl_1T8N7iG7OEBIzp8MCgdeN0Ex"
        publishable-key="pk_test_51T8MayG7OEBIzp8M66lmeJYupVjVis7J0JBwueqKnDksupHCRdH2KVifu7QdTmuhMUTPj27X7A3bWC02zRhDP1KD00mrT2XDni"
      ></stripe-pricing-table>
      </div>
    </div>

    
  )
}

export default Plan
