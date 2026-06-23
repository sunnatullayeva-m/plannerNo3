import './Home.css'
import { useNavigate } from 'react-router-dom'; // 1. Import qilish
import logo from '../../assets/logo.png'

function Home() {

    const navigate = useNavigate(); // 2. Hook'ni chaqirib olish

  const handleClick = () => {
    navigate('/table'); // 3. Qaysi yo'lga o'tishni yozish
  };

    return (
        <div >

            <img className='logo' src={logo} alt="" />

            <header className='header'>



                <button class="era-btn" onClick={handleClick}>
                    
                    <span class="arrow">→</span>
                </button>


            </header>

        </div>
    )
}

export default Home