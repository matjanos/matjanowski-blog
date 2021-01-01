import { graphql } from "gatsby";
import React from "react"
import { BiCommentError } from "react-icons/bi"

interface CommentsProps {
    issueNo: number
}

interface CommentsState {
    isLoaded: boolean,
    items: any[],
    error: any
}

interface IComment {
    body: string
    date: Date,
    authorName: string,
    authorUrl: string,
    avatarUrl: string
}

export default class Comments extends React.Component<CommentsProps, CommentsState> {
    issueNo: number;
    apiUrl = 'https://api.github.com/repos/matjanos/matjanowski-blog/';
    githubUrl = 'https://github.com/matjanos/matjanowski-blog/';
    constructor(props) {
        super(props);
        this.issueNo = props.issueNo;
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        this.getComments();
    }

    private getComments() {
        fetch(`${this.apiUrl}issues/${this.issueNo}/comments`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    renderComment(comment: IComment) {
        return <div className="comment">
            <header>
                <a href={comment.authorUrl}>
                    <img src={comment.avatarUrl} className="comment-author-avatar" />
                    <span className="comment-author">{comment.authorName}</span>
                </a>
                <span className="comment-date">{comment.date.toDateString()}</span>
            </header>
            <span className="comment-body">{comment.body}</span>
        </div>
    }

    renderAllComments(items: any[]) {
        return items
            .map(i => {
                return {
                    body: i.body,
                    date: new Date(i.created_at),
                    authorName: i.user.login,
                    authorUrl: i.user.html_url,
                    avatarUrl: i.user.avatar_url,
                };
            })
            .map(c => this.renderComment(c));
    }

    renderNewCommentLink() {
        return <div className="link-wrapper">
            <a className="add-comment-lnk" target="_blank" rel="noopener noreferrer" href={`${this.githubUrl}issues/${this.issueNo}`}>Add a comment with GitHub</a>
        </div>
    }

    renderLoading() {
        return <div>
            Loading...
        </div>
    }

    renderCommentsDisabled() {
        return <div>Comments are disabled for this post.</div>;
    }

    renderError(error: any) {
        return <span>Error on getting comments: {error}</span>
    }

    render() {
        if (!this.issueNo) {
            return this.renderCommentsDisabled();
        }
        if (!this.state.isLoaded) {
            return this.renderLoading();
        }
        if (this.state.error) {
            return this.renderError(this.state.error)
        }
        if (this.state.items)
            if (!this.state.items.length) {
                return <div className="empty-state">
                    <div className="empty-state-icon"> <BiCommentError /></div>
                    {this.renderNewCommentLink()}
                </div >
            }
            else {
                return <div className="comments-wrapper">{this.renderAllComments(this.state.items)}
                    {this.renderNewCommentLink()}
                </div>
            }
    }
}

export const query = graphql`
    {
        site{
            siteMetadata{
                commentsSettings{
                    apiTemplate
                    organisationName
                    repoName
                }
            }
        }
    }  
`
