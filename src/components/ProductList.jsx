import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://68dd1a2f7cd1948060ac69a9.mockapi.io/product')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', textAlign: 'center' }}>
                <h1 style={{ color: '#333' }}>Loading...</h1>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>Product List</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {products.map((product) => (
                    <div key={product.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        background: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>{product.name}</h3>
                            <span style={{
                                background: product.isStock ? '#4caf50' : '#f44336',
                                color: '#fff',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                {product.isStock ? 'In Stock' : 'Out'}
                            </span>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0' }}>{product.description}</p>
                        <div style={{ color: '#999', fontSize: '0.85rem', marginTop: '10px' }}>
                            Quantity: <strong style={{ color: '#333' }}>{product.quantity}</strong>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ProductList;
