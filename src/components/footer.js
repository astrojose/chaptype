import React from 'react'


const Footer = () => {
    return (
        <footer>
            <div className='links'>
                <ul>
                    <li>
                      <a 
                        href="https://instagram.com/chaptyp" 
                        target="_blank" rel="noreferrer"
                        className='primary'>
                       Instagram
                       </a>
                    </li>
                    <li>
                      <a 
                        href="https://github.com/astrojose/chaptype" 
                        target="_blank" rel="noreferrer"
                        className='primary'> 
                       Github
                      </a>
                    </li>
                </ul>
            </div>
            <div className="copyright">
                <p> &copy; <a href="/" className='primary'>Chaptyp</a>, {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer
