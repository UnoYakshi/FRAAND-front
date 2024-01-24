import reactLogo from '../../img/react-logo.png';
import Carousel from "nuka-carousel";

interface CardItemProps {
    name: string;
    description: string;
    // Add other properties as needed
  }

function CardItem(props: CardItemProps) {
    const { name } = props;
    const {description} = props;
    return(
        <li className="card">
            <div className="card__container">
                <div className="card__imgs">
                        <Carousel renderCenterLeftControls={({ previousSlide }) => (
                            <button className="card__imgs_prev" onClick={previousSlide}>
                            </button>
                        )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <button className="card__imgs_next" onClick={nextSlide}>
                            </button>
                        )}
                        renderBottomCenterControls={({ currentSlide, slideCount, goToSlide }) => (
                            <div className="slider-dots">
                              {[...Array(slideCount).keys()].map((index) => (
                                <button
                                  key={index}
                                  className={`slider-dots-dot ${currentSlide === index ? 'active' : ''}`}
                                  onClick={() => goToSlide(index)}
                                />
                              ))}
                            </div>
                          )}>
                        <img src={reactLogo} className='card__img' alt="item photo"/>
                         <img src={reactLogo} className='card__img' alt="item photo"/>
                         <img src={reactLogo} className='card__img' alt="item photo"/>
                        </Carousel>
                </div>
                <div className="card__middle">
                    <div className="card__texts">
                        <h3 className="card__title">{name}</h3>
                        <div className="card__desc">
                           {description}
                        </div>
                    </div>
                    <div className="card__tags">
                        <div className="card__tag">car</div>
                        <div className="card__tag">white</div>
                        <div className="card__tag">1976</div>
                    </div>
                </div>
                <div className="card__show">
                    <svg width="80px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.354 2.354l-.707-.707-3.436 3.435C16.743 2.595 14.505 1 12 1 7.589 1 4 5.935 4 12a14.024 14.024 0 0 0 1.3 5.993l-3.654 3.653.707.707 3.436-3.435C7.257 21.405 9.495 23 12 23c4.411 0 8-4.935 8-11a14.024 14.024 0 0 0-1.3-5.993zM5 12C5 6.486 8.14 2 12 2c2.222 0 4.202 1.492 5.486 3.807L6.05 17.242A13.23 13.23 0 0 1 5 12zm14 0c0 5.514-3.14 10-7 10-2.222 0-4.202-1.492-5.486-3.807L17.95 6.758A13.23 13.23 0 0 1 19 12z" fill='#fff'/>
                        <path fill="none" d="M0 0h24v24H0z"/>
                    </svg>
                </div>
                <select className='card__copy' name="copy" id="copy">
                    <option value="email">copy Email</option>
                    <option value="tg">copy Telegram</option>
                    <option value="tel">copy Phone</option>
                </select>
            </div>
        </li>
    )
}

export default CardItem;