import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white">
          <div className="container p-4">
            <section className="mb-4">
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i className="fab fa-facebook-f"></i
              ></a>
        
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i className="fab fa-twitter"></i
              ></a>
        
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i className="fab fa-google"></i
              ></a>
        
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i className="fab fa-instagram"></i
              ></a>
        
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i className="fab fa-linkedin-in"></i
              ></a>
            </section>
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-auto">
                    <p className="pt-2">
                      <strong>Inscription au newsletter</strong>
                    </p>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-outline form-white mb-4">
                      <input type="email" id="form5Example2" className="form-control" placeholder="Saisissez votre adresse mail"/>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-outline-light mb-4">
                      s'abonner
                    </button>
                  </div>
                </div>
              </form>
            </section>
            <section className="mb-4">
              <p>
                Venez découvrir l'Afrique, l'Afrique d'hier, l'Afrique d'aujourd'hui, l'Afrique de demain...
              </p>
            </section>
            <section className="">
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Accéder à</h5>
        
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">Link 1</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 2</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 3</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 4</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Liens importants</h5>
        
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">Link 1</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 2</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 3</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 4</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">Nos meilleurs Débâts</h5>
        
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">Link 1</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 2</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 3</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 4</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase">L'Afrique</h5>
        
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-white">Link 1</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 2</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 3</a>
                    </li>
                    <li>
                      <a href="#!" className="text-white">Link 4</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
            © 2021 Copyright librairie-Njietcheu. All rights reserved.
          </div>
        </footer>
    );
};

export default Footer;