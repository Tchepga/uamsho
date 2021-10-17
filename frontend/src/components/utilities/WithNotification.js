
import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Utils from '../../utils/Utils';


export class WithNotification extends Component {

    componentDidMount() {
        if (Utils.isNotNullObject(this.props.message)) {
            if(this.props.type === Utils.ERROR_MESSAGE){
                NotificationManager.error(this.props.message);
            }

            if(this.props.type === Utils.SUCCESS_MESSAGE){
                NotificationManager.success(this.props.message);
            }
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (Utils.isNotNullObject(this.props.message)) {
            if(this.props.type === Utils.ERROR_MESSAGE){
                NotificationManager.error(this.props.message);
            }

            if(this.props.type === Utils.SUCCESS_MESSAGE){
                NotificationManager.success(this.props.message);
            }
        }

        return true;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (Utils.isNotNullObject(this.props.message)) {
            if (this.props.type === Utils.ERROR_MESSAGE) {
                NotificationManager.error(this.props.message);
            }

            if (this.props.type === Utils.SUCCESS_MESSAGE) {
                NotificationManager.success(this.props.message);
            }

        }
    }
    render() {
        return (
            <div>
                <NotificationContainer />
                {this.props.children}
            </div>
        )
    }
}

WithNotification.propTypes = {
    typeMessage: PropTypes.number,
    message: PropTypes.string
}
