import React from 'react';
import { Carousel } from 'react-carousel-minimal';

import './Home.css';
import adimage3 from './adimage3_homepage.jpg';
import adimage4 from './adimage4_homepage.jpg';
import adimage5 from './adimage5_homepage.jpg';

const Home = () => {
    const data = [
        {
          image: adimage3,
        },
        {
          image: adimage4,
        },
        {
          image: adimage5,
        }
      ];
    
      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '10px',
        fontWeight: 'bold',
      }
      return (
        <div className="App">
          <div style={{ textAlign: "center" }}>
            <div style={{
              padding: "0 20px"
            }}>
              <Carousel
                data={data}
                time={4500}
                width="1250px"
                height="650px"
                captionStyle={captionStyle}
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={false}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={false}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "2000px",
                  maxHeight: "2000px",
                  margin: "40px auto",
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    
export default Home; 