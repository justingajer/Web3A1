import {GiTheaterCurtains} from "react-icons/gi";
import ReactModal from "react-modal";
import {useState} from "react";
import {Link} from "react-router-dom";
const Header = ()=>{
    //state used to determine whether the modal box should be displayed
    const [modalIsOpen, changeModel] = useState(false);
    //handler for opening and closing the modal box
    const handleModel=()=>{
        if(modalIsOpen)
            changeModel(false);
        else
            changeModel(true);
    }
    return(
      <div className='header'>
          <span><Link to="/HomeView"><GiTheaterCurtains size="3em" color="red"/></Link></span>
          <button onClick={handleModel}>About</button>
          <ReactModal isOpen={modalIsOpen} ariaHideApp={true}>
              <p style={{ color: 'black' }}>Julianna and Justin</p>
              <p style={{ color: 'black' }}><a href="https://github.com/JuliannaG8/WebIII_Assign1">Github</a></p>
              <h5 style={{ color: 'black' }}>Technologies/Third-party Sources:</h5>
              <ul>
                  {/*Add any other technologies or third-party code sources/inspiration here*/}
                  <li style={{ color: 'black' }}>React-icons</li>
                  <li style={{ color: 'black' }}>React-modal</li>
                  <li style={{ color: 'black' }}>React-loader-spinner</li>
                  <li style={{ color: 'black' }}>Lodash</li>
                  <li style={{ color: 'black' }}><a href="https://blog.logrocket.com/using-localstorage-react-hooks/">Local Storage logic inspiration</a></li>
                  <li style={{ color: 'black' }}><a href="https://www.csswand.dev/">CSSwand</a></li>
              </ul>
              <button onClick={handleModel}>Close</button>
          </ReactModal>
      </div>
    );
}
export default Header;
