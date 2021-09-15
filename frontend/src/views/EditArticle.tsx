import React, { Component, FormEvent, Fragment, MouseEvent, SyntheticEvent } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Menu from '../components/menu/Menu';
import axios from 'axios';
import { category } from '../model/category';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { article } from '../model/article';
import { AuthContext } from '../providers/Provider';
import { withRouter } from 'react-router';

export interface EditArticleState {
    categories: Array<category>;
    data: any;
    config: any;
}
class EditArticle extends Component<any, EditArticleState>{

    private editorArticle: React.RefObject<HTMLTextAreaElement>;
    static contextType = AuthContext;

    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            data: null,
            config: { filebrowserImageUploadUrl: process.env.REACT_APP_API_URL + "api/upload/ckeditor-image" }
        }

        this.getCategories = this.getCategories.bind(this);
        this.saveArticle = this.saveArticle.bind(this);


        this.editorArticle = React.createRef();
    }

    componentDidMount() {
        this.getCategories();
        //this.createCkEditor();
    }

    createCkEditor = () => {
        ClassicEditor
            .create(this.editorArticle.current as HTMLElement)
            .then(editor => {
                console.log('Editor was initialized', editor);
            })
            .catch(error => {
                console.error(error.stack);
            });
    }

    getCategories() {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/categories")
            .then((res) => {
                this.setState({ categories: res.data });
            })
            .catch((error) => console.log(error));
    }

    saveArticle(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const title = target.namedItem("title") as HTMLInputElement; // typechecks!
        const subtitle = target.namedItem("subtitle") as HTMLInputElement; // typechecks!
        const categorie = target.namedItem("categorie") as HTMLSelectElement; // typechecks!
        const description = this.state.data;

        //validation
        if (description === null || description === undefined ) {
            alert("Vous devez renseigner le contenue de l'article.");
        } else {

            const context = this.context
            const article = {
                id: 0,
                title: title.value,
                subtitle: subtitle === null ? null : subtitle.value,
                category: categorie.value,
                description: description,
                ontop: false,
                user: context.currentUser
            }
            
            axios.post(process.env.REACT_APP_API_URL + "/api/article", article, )
                .then(() => this.props.history.push({
                    pathname : "/profil",
                    state : {isArticle : true}
                }))
                .catch(error => console.log(error))
        }

       
    }

    render() {

        const optionsCateg = this.state.categories.map((category: category) =>
            <option value={category.id} key={category.id}>{category.type_category}</option>
        );

        return (
            <Fragment>
                <Menu />
                <form className="container" onSubmit={this.saveArticle} >
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input className="form-control" type="text" placeholder="Entrer le titre de l'article" name="title" id="title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Sous-Titre</label>
                            <input className="form-control" type="text" placeholder="Entrer le sous-titre de l'article" name="sousTitle" id="sousTitle" />
                        </div>
                        <div className="form-group row mb-1">
                            <label htmlFor="categorie" className="col-sm-2 col-form-label">Catégories</label>
                            <div className="col-sm-10">
                                <select name="categorie" required>
                                    <option value="" selected disabled hidden>choisissez une categorie</option>
                                    {optionsCateg}
                                </select>
                            </div>
                        </div>

                    </div>


                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            //@ts-ignore
                            ckfinder: {
                                uploadUrl : process.env.REACT_APP_API_URL + "/api/upload/ckeditor-image"
                            },

                            // Define the CKFinder configuration (if necessary).
                            options: {
                                resourceType: 'Images'
                            }
                            
                        }}
                        
                        onReady={(editor: ClassicEditor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onBlur={(event: any, editor: ClassicEditor) => {
                            this.setState({ data: editor.getData() })
                        }}

                    />*


                    <div className="mt-1 d-flex justify-content-end">
                        <input type="submit" value="Enregistrer" className="btn btn-primary" />
                    </div>

                </form>
            </Fragment>
        );
    }
}

export default withRouter(EditArticle);