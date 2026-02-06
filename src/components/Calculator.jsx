import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

const Result = memo(({ value }) => (
    <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '5px', marginTop: '15px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Kết quả:</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>{value}</div>
    </div>
));

function Calculator() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState('0');

    const calcCount = useRef(0);

    useEffect(() => {
        if (calcCount.current > 0) {
            console.log('Kết quả: ', result);
        }
    }, [result]);

    const info = useMemo(() => {
        console.log('useMemo chạy');
        return calcCount.current;
    }, [calcCount.current]);

    const calculate = useCallback((operation) => {
        calcCount.current++;
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            setResult('err');
            return;
        }

        let res;
        switch (operation) {
            case '+': res = numA + numB; break;
            case '-': res = numA - numB; break;
            case '×': res = numA * numB; break;
            case '÷': res = numB !== 0 ? numA / numB : 'rrr'; break;
            default: res = 0;
        }
        setResult(typeof res === 'number' ? res.toString() : res);
    }, [a, b]);

    const clear = useCallback(() => {
        setA('');
        setB('');
        setResult('0');
    }, []);

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '20px', color: '#333' }}>Calculator</h2>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '0.9rem' }}>Nhập A:</label>
                <input
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', color: '#000' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontSize: '0.9rem' }}>Nhập B:</label>
                <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', color: '#000' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                <button onClick={() => calculate('+')} style={{ padding: '15px', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff', color: '#000' }}>+</button>
                <button onClick={() => calculate('-')} style={{ padding: '15px', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff', color: '#000' }}>-</button>
                <button onClick={() => calculate('×')} style={{ padding: '15px', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff', color: '#000' }}>×</button>
                <button onClick={() => calculate('÷')} style={{ padding: '15px', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#fff', color: '#000' }}>÷</button>
            </div>

            <button onClick={clear} style={{ width: '100%', padding: '12px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f5f5f5', color: '#000', marginBottom: '15px' }}>
                C
            </button>

            <Result value={result} />
        </div>
    );
}

export default Calculator;
