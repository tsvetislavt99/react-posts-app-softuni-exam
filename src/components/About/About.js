function About() {
  return (
    <>
      <div className='page-section'>
        <div className='container'>
          <div className='row align-items-center wow fadeInUp'>
            <div className='col-lg-6 py-3'>
              <h2 className='title-section'>A good React blog</h2>
              <div className='divider'></div>

              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                nisi saepe eum ipsa. Tempore dolore itaque est blanditiis libero
                fugiat, ea nostrum nam at tempora quis, facilis officiis nemo
                mollitia.
              </p>
            </div>
            <div className='col-lg-6 py-3'>
              <div className='img-fluid py-3 text-center'>
                <img
                  style={{ maxWidth: '100%' }}
                  src='/assets/img/about_frame.png'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
