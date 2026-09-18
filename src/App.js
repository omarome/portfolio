import Footer from  './components/Footer';
import Router from './components/Router';
import './App.css';

const menuList = [
  { label: 'Home', type: 'scroll' },
  { label: 'About', type: 'scroll' },
  { label: 'Experience', type: 'scroll' },
  { label: 'Skills', type: 'scroll' },
  { label: 'Projects', type: 'scroll' },
  {
    label: 'Resume',
    type: 'external',
    href: '/cv.pdf',
    newTab: false,
  },
  { label: 'Contact', type: 'scroll' },
];

const App = () => {
  return (
    <div className="app">
      <Router menuList={menuList} />
      <Footer />
    </div>
  );
}

export default App;
