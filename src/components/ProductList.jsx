import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        isStock: true
    });
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

    const handleAddProduct = (e) => {
        e.preventDefault();
        setAdding(true);

        fetch('https://68dd1a2f7cd1948060ac69a9.mockapi.io/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(data => {
                setProducts([...products, data]);
                setNewProduct({ name: '', description: '', quantity: 0, isStock: true });
                setAdding(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setAdding(false);
            });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setAdding(true);

        fetch(`https://68dd1a2f7cd1948060ac69a9.mockapi.io/product/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(data => {
                setProducts(products.map(p => p.id === editingId ? data : p));
                setNewProduct({ name: '', description: '', quantity: 0, isStock: true });
                setEditingId(null);
                setAdding(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setAdding(false);
            });
    };

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setNewProduct({
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            isStock: product.isStock
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewProduct({ name: '', description: '', quantity: 0, isStock: true });
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Chan chan xóa ?')) {
            fetch(`https://68dd1a2f7cd1948060ac69a9.mockapi.io/product/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setProducts(products.filter(p => p.id !== id));
                    if (editingId === id) {
                        handleCancelEdit();
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        }
    };

    if (loading) {
        return (
            <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', textAlign: 'center' }}>
                <h1 style={{ color: '#333' }}>Loading...</h1>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>Product List</h1>

            <form onSubmit={editingId ? handleUpdateProduct : handleAddProduct} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: '#333', marginTop: 0, marginBottom: '15px' }}>
                    {editingId ? 'Update Product' : 'Add New Product'}
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#333', marginBottom: '5px', fontWeight: 'bold' }}>
                            Name:
                        </label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#333', marginBottom: '5px', fontWeight: 'bold' }}>
                            Quantity:
                        </label>
                        <input
                            type="number"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'block', color: '#333', marginBottom: '5px', fontWeight: 'bold' }}>
                        Description:
                    </label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                        rows="3"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', color: '#333', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={newProduct.isStock}
                            onChange={(e) => setNewProduct({ ...newProduct, isStock: e.target.checked })}
                            style={{ marginRight: '8px', cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                        <span style={{ fontWeight: 'bold' }}>In Stock</span>
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button
                        type="submit"
                        disabled={adding}
                        style={{
                            padding: '10px 30px',
                            background: adding ? '#ccc' : (editingId ? '#2196f3' : '#4caf50'),
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: adding ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {adding ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Product' : 'Add Product')}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            style={{
                                padding: '10px 30px',
                                background: '#999',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

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
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button
                                onClick={() => handleEditClick(product)}
                                style={{
                                    padding: '6px 16px',
                                    background: '#2196f3',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                style={{
                                    padding: '6px 16px',
                                    background: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ProductList;
