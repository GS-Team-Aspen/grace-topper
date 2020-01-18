import React from 'react'

const CheckoutCartSumm = () => {
  return (
    <div>
      <table className="ui table">
        <thead>
          <tr>
            <th className="seven wide">Item</th>
            <th className="three wide center aligned">Unit Price</th>
            <th className="one wide center aligned" />
            <th className="two wide center aligned">Qty</th>
            <th className="three wide center aligned">Item Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Urban Sombrero</td>
            <td className="center aligned">$75</td>
            <td className="center aligned">x</td>
            <td className="center aligned">2</td>
            <td className="center aligned">$150</td>
          </tr>
          <tr>
            <td>Brown Derby</td>
            <td className="center aligned">$25</td>
            <td className="center aligned">x</td>
            <td className="center aligned">3</td>
            <td className="center aligned">$75</td>
          </tr>
          <tr>
            <td>Top Hat</td>
            <td className="center aligned">$100</td>
            <td className="center aligned">x</td>
            <td className="center aligned">4</td>
            <td className="center aligned">$400</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total Cost</th>
            <th className="center aligned" />
            <th className="center aligned" />
            <th className="center aligned" />
            <th className="center aligned">$625</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CheckoutCartSumm
