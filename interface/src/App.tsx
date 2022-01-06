import { useObservable, useRendersCount } from 'react-use';
import api from './api'
import { State } from './api/src/logic';
import Quantity from './components/quantity';
import Scan from './components/scan';
import { FaPowerOff } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import CartComponent from './components/cart';
import Keyboard from './components/keyboard';
import { useState } from 'react';
import { PayComponent } from './components/pay';
import OkButton from './components/okButton';

function App() {
  const currentState = useObservable(api.currentState$)
  const state: State = useObservable(api.state$)
  const [value, setValue] = useState('')
  console.log(state?.cart.products.map((p) => ([p.product.name, p.quantity]).join(' - ')))
  const products = state?.cart.products || []
  return (
    // <>{currentState} - {render}
    <>
      <header className="h-14 bg-gray-500 p-5 flex items-center text-white justify-between">
        <HiDotsHorizontal size={22} />
        {currentState}
        <FaPowerOff size={22} />
      </header>
      <div className="flex m-3 space-x-4">
        <div className="w-1/2">
          <CartComponent cart={state?.cart} products={products} />
        </div>
        <div className="w-1/2 bg-gray-50">
          {(currentState === 'WAIT_FOR_SCAN' || currentState === 'WAIT_FOR_RETURN_SCAN') && <Scan />}
          {(currentState === 'WAIT_QUANTITY' || currentState === 'WAIT_FOR_RETURN_QUANTITY') && <Quantity />}
          {(currentState === 'PAY') && <PayComponent />}
          {(currentState === 'UNKNOWN_PRODUCT') && <div className="p-4 flex flex-col items-center">
            <h2 className="text-lg">Produit inconnu</h2>
            <OkButton />
          </div>}
          {(currentState === 'ORDER_FINISH') && <div className="p-4 flex flex-col items-center">
            <h2 className="text-lg">Paiement validé.</h2>
            <OkButton />
          </div>}
          {state?.currentProduct && <>
            <div className="flex items-center h-16 p-3 mt-5 bg-gray-200">
              <span className="font-semibold">{state.currentProduct.name}</span>
              <img src={state.currentProduct.image} className="object-contain w-[50px]"></img>
            </div>
          </>}
        </div>
      </div>
    </>
  );
}

export default App;
