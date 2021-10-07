import React from "react";
import { Modal } from "react-bootstrap";

export interface InscriptionProps {
  show: boolean;
}

export interface InscriptionState {
  show: boolean;
}

class Inscription extends React.Component<InscriptionProps, InscriptionState> {

  state = {
    show: true
  }

  setShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      // <div className="container">
      //   <Menu />
      //   <div className="row">
      //     <div className="col-md">
      //       <h4 className="mb-3">Inscription</h4>
      //       <form className="needs-validation" novalidate>
      //         <div className="row">
      //           <div className="col-md-6 mb-3">
      //             <label for="firstName">Prénom</label>
      //             <input type="text" className="form-control" id="firstName" placeholder="Votre prénom" value="" required name="prenom" />
      //             <div className="invalid-feedback">
      //               Valid first name is required.
      //             </div>
      //           </div>
      //           <div className="col-md-6 mb-3">
      //             <label for="lastName">Nom</label>
      //             <input type="text" className="form-control" id="lastName" placeholder="Votre nom" value="" required name="nom" />
      //             <div className="invalid-feedback">
      //               Valid last name is required.
      //             </div>
      //           </div>
      //         </div>

      //         <div className="mb-3">
      //           <label for="username">Username</label>
      //           <div className="input-group">
      //             <div className="input-group-prepend">
      //               <span className="input-group-text">@</span>
      //             </div>
      //             <input type="text" className="form-control" id="username" placeholder="Username" required name="username" />
      //             <div className="invalid-feedback" style={{ width: "100%" }}>
      //               Your username is required.
      //             </div>
      //           </div>
      //         </div>

      //         <div className="mb-3">
      //           <label for="email">Email</label>
      //           <input type="email" className="form-control" id="email" placeholder="you@example.com" name="email" />
      //           <div className="invalid-feedback">
      //             Please enter a valid email address for sign in.
      //           </div>
      //         </div>

      //         <div class="mb-3">
      //           <label for="address">Address</label>
      //           <input type="text" class="form-control" id="address" placeholder="1234 Main St" required name="address" />
      //           <div class="invalid-feedback">
      //             Please enter your shipping address.
      //           </div>
      //         </div>

      //       </form>
      //     </div>
      //   </div>
      // </div>
      <Modal
        show={this.state.show}
        onHide={() => this.setShow()}
        dialogClassName="modal-90w"
        aria-labelledby="inscription-modal">
        <Modal.Header closeButton>
          <Modal.Title id="inscription-modal">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Inscription;
