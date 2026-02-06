import { useState } from 'react'
import Calculator from './components/Calculator'
import ProductList from './components/ProductList'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  return (
    <div>
      <div style={{ 
        background: '#333', 
        padding: '15px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => setActiveTab('calculator')}
          style={{
            padding: '10px 30px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            background: activeTab === 'calculator' ? '#2196f3' : '#555',
            color: '#fff',
            fontWeight: activeTab === 'calculator' ? 'bold' : 'normal'
          }}
        >
          Bài 1: Calculator
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 30px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            background: activeTab === 'products' ? '#2196f3' : '#555',
            color: '#fff',
            fontWeight: activeTab === 'products' ? 'bold' : 'normal'
          }}
        >
          Bài 2: Product List
        </button>
      </div>

      {activeTab === 'calculator' ? <Calculator /> : <ProductList />}
    </div>
  )
}

export default App
