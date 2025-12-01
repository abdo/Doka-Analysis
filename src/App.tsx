import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import { ConversationPage } from './pages/ConversationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisResultsPage />} />
        <Route path="/conversation" element={<ConversationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
