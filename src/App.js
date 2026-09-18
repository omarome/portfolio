import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaLaptopCode,
  FaFileAlt,
  FaAddressCard,
} from 'react-icons/fa';
import Footer from  './components/Footer';
import Router from './components/Router';
import './App.css';

const menuList = [
  { label: 'Home', type: 'scroll', icon: FaHome },
  { label: 'About', type: 'scroll', icon: FaUser },
  { label: 'Experience', type: 'scroll', icon: FaBriefcase },
  { label: 'Education', type: 'scroll', icon: FaGraduationCap },
  { label: 'Skills', type: 'scroll', icon: FaTools },
  { label: 'Projects', type: 'scroll', icon: FaLaptopCode },
  {
    label: 'Resume',
    type: 'external',
    href: '/cv.pdf',
    newTab: false,
    icon: FaFileAlt,
  },
  { label: 'Contact', type: 'scroll', icon: FaAddressCard },
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
