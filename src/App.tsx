import './App.css';
import { CurrencyConverterLayout } from './components/CurrencyConverterLayout';
import { CurrencySelectorProvider } from './contexts/CurrencySelector';

function App() {
    return (
        <CurrencySelectorProvider>
            <CurrencyConverterLayout />
        </CurrencySelectorProvider>
    );
}

export default App;
