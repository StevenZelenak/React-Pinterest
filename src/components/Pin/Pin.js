import React from 'react';
import './Pin.scss';
import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-3">
        <div className="card">
          <img className="card-img-top" src={pin.imageUrl} alt="pin" />
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
