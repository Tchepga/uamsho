import { Component, Fragment } from 'react';
import { comment } from '../../model/comment';
import moment from 'moment';

export interface CommentCardProps {
    comment: comment;
    delete : Function;

}
class CommentCard extends Component<CommentCardProps, any> {
    render() {
        const owner = this.props.comment.owner;
        return (
            <Fragment>
                <div className="row">
                    <span className="col-10 row">
                        <i className="fas fa-user-circle fa-2x col-1 pt-1 text-info" />
                        <div className="col-10 d-flex flex-column">
                            <small className="pl-2">
                                {owner.last_name}
                            </small>
                            <small className="pl-2">
                                {moment(this.props.comment.date_creation, "YYYYMMDD").fromNow()}
                            </small>
                        </div>
                    </span>

                    <i className="col-2 fas fa-braille fa-sm cursor-pointer"></i>
                </div>
                <p className="bg-white mt-2 py-1 pl-1 ml-1 my-0">
                    {this.props.comment.content}
                </p>
                <div className="d-flex flex-row-reverse">
                    <div className="p-2"><i className="far fa-trash-alt text-danger" onClick={() => this.props.delete}></i></div>
                    <div className="p-2"><i className="fas fa-reply text-success"></i></div>
                </div>
            </Fragment>
        );
    }
}

export default CommentCard;

