<div>
          <div className='row' style={{ marginTop: '1rem' }} >
            <div className='col-12 col-xs-12 col-sm-12 col-md-8'>
              <AntCarousel afterChange={onChange} autoplay={true}>
                {data_new.map(item => 
                  <div>
                    <h3 className="carousel-container">
                      <img src={item.src} className="branner rounded"/>
                    </h3>
                  </div>
                )}
              </AntCarousel>
            </div>
            <div className='col-12 col-xs-12 col-md-4'>
              <div className='promotion-side'>
                <img
                    src='/images/news/FiinShop2.jpg'
                    alt="Picture of the author"
                    style={{width: '100%', height:'100%'}}
                    className="rounded"
                />
              </div>
              <div className='promotion-side'>
                <img
                    src='/images/news/FiinShop3.jpg'
                    alt="Picture of the author"
                    style={{width: '100%', height:'100%'}}
                    className="rounded"
                />
              </div>
              <div className='promotion-side'>
                <img
                    src='/images/news/FiinShop4.jpg'
                    alt="Picture of the author"
                    style={{width: '100%', height:'100%'}}
                    className="rounded"
                />
              </div>
            </div>
        </div>
      </div>