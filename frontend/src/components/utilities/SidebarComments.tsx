import { Component, FormEvent } from 'react';
import { book } from '../../model/book';
import { comment } from '../../model/comment';
import Utils from '../../utils/Utils';
import '../../scss/custom.css';
import CommentCard from './CommentCard';

export interface stateSidebarComments {
    comments: Array<comment>;
}

export interface propSidebarComments {
    show: Function;
    add: Function;
    delete : Function;
    visible: boolean;
    book: book;
}
class SidebarComments extends Component<propSidebarComments, stateSidebarComments>{

    state = {
        visible: false,
        comments: [] as Array<comment>
    }

    addComment = (event: FormEvent<HTMLFormElement>) => {

        const target = event.currentTarget.elements;
        const content = target.namedItem("contentComment") as HTMLInputElement;
        this.props.add(content.value);

        event.preventDefault();
    }


    render() {

        const comments = this.props.book.comments;

        let addClass = "";
        if (this.props.visible === true)
            addClass = "side-position-right-v";
        else
            addClass = "side-position-right";

        const size = this.props.book.comments === undefined ? 0 : this.props.book.comments.length;

        return (
            <div className={addClass}>
                <div className="row mt-3 mb-4">
                    <h4 className="col-9 ml-2"><b>Commentaires({size})</b></h4>
                    <i className="fas fa-times fa-2x col-2 cursor-pointer text-right" onClick={() => this.props.show()} />
                </div>
                <form className="mb-4" onSubmit={this.addComment}>
                    <div className="row" >
                        <textarea
                            rows={1}
                            name="contentComment"
                            className="form-group col-11 ml-3"
                            placeholder="Rédiger votre commentaire"
                            required={true} />
                    </div>
                    <div className="row">
                        <input type="submit" value="Enregister" className="btn btn-primary btn-sm offset-8 col-3" />
                    </div>
                </form>
                <small className="row-cols-11 ml-2 text-muted">Plus recents <i className="fas fa-caret-down ml-2"></i></small>
                <div className="dropdown-divider"></div>
                <div className="ml-4 mt-4">
                    {Utils.isNotNullObject(comments) &&
                        comments.map((comment: comment) => (
                            <div className="n-inline border border-light" key={comment.id}>
                                <CommentCard comment={comment} delete={this.props.delete}/>
                            </div>
                        ))
                    }

                    {Utils.isNotNullObject(comments) && <small>Pas de commentaires pour le moment.</small>}
                </div>

            </div>


        );
    }
}

export default SidebarComments;